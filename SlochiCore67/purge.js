const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Delete messages from this user'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const user = interaction.options.getUser('user');
    const messages = await interaction.channel.messages.fetch({ limit: 100 });
    let filtered = messages;

    if (user) {
      filtered = messages.filter(m => m.author.id === user.id).first(amount);
    } else {
      filtered = messages.first(amount);
    }

    await interaction.channel.bulkDelete(filtered, true);
    await interaction.reply({ content: `🧹 Deleted ${filtered.length} messages.`, ephemeral: true });
  }
};
