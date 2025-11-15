const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageDelete,
  async execute(message) {
    if (message.partial || message.author.bot) return;

    const logChannel = message.guild.channels.cache.find(c => c.name === 'message-logs');
    if (!logChannel) return;

    logChannel.send(`🗑️ Message deleted from ${message.author.tag}:\n\`${message.content}\``);
  }
};
