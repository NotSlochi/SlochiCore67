const { Events } = require('discord.js');
const voiceTimes = new Map();

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    const userId = newState.id;
    const member = newState.member;
    const logChannel = newState.guild.channels.cache.find(c => c.name === 'vc-logs');

    if (!logChannel) return;

    // Joined VC
    if (!oldState.channelId && newState.channelId) {
      voiceTimes.set(userId, Date.now());
      logChannel.send(`🔊 ${member.user.tag} joined **${newState.channel.name}**`);
    }

    // Left VC
    if (oldState.channelId && !newState.channelId) {
      const joinTime = voiceTimes.get(userId);
      if (!joinTime) return;

      const durationMs = Date.now() - joinTime;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.floor((durationMs % 3600000) / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);

      logChannel.send(`👋 ${member.user.tag} left VC after ${hours}h ${minutes}m ${seconds}s`);
      voiceTimes.delete(userId);
    }
  }
};
