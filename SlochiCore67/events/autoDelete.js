const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    const delay = 10000; // 10 seconds
    setTimeout(() => {
      message.delete().catch(() => {});
    }, delay);
  }
};
