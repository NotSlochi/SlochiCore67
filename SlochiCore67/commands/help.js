const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all commands'),

  async execute(interaction) {
    await interaction.reply({
      content: `📜 **Command List**
- \`/purge\`: Delete messages (all or by user)
- \`/userinfo\`: View user info
- \`/help\`: Show this list`,
      ephemeral: true
    });
  }
};
