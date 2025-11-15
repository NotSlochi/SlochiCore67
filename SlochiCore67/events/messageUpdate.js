const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    if (oldMessage.partial || newMessage.partial || oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const logChannel = newMessage.guild.channels.cache.find(c => c.name === 'message-logs');
    if (!logChannel) return;

    logChannel.send(`✏️ Message edited by ${oldMessage.author.tag}:\n**Before:** \`${oldMessage.content}\`\n**After:** \`${newMessage.content}\``);
  }
};
