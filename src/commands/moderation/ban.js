const {
  ApplicationCommandOptionType,
  PermissionFlagsBits, EmbedBuilder
} = require('discord.js');

module.exports = {
  deleted: false,
  name: 'ban',
  description: 'Bans a member!!!',
  devOnly: true,
  options: [
    {
      name: 'target',
      description: 'The user to ban',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'The main reason of the ban',
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {

    const userId = interaction.options.get('target').value;
    const reason = interaction.options.getString('reason') || 'no given reason';
    const channel = await client.channels.cache.get(process.env.BOT_COMMANDS_ID);
    await interaction.deferReply();

    const user = await interaction.guild.members.fetch(userId);

    console.log(user);
    if (!user.bannable)
      return interaction.reply(` I cannot ban that member`);

    if (!user) {
      await interaction.editReply({ content: "That user doesn't exist in this server.", ephemeral: true });
      return;
    }

    if (user.id === interaction.author.id)
      return message.reply({ content: `You cannot ban yourself!`,ephemeral: true  })


    const userRolePos = user.roles.highest.position;
    const requestUserRolePos = interaction.member.roles.highest.position;
    const botRolePos = interaction.guild.members.me.roles.highest.position;

    if (userRolePos >= requestUserRolePos) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role than you."
      );
      return;
    }

    if (userRolePos >= botRolePos) {
      await interaction.editReply(
        "I can't ban that user because they have the same/higher role than me."
      );
      return;
    }

    try {
      await user.ban({ reason })
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setImage(user.avatarURL)
        .setDescription(`User **${user.username}** was banned for ${reason} 🔨`)
        .setTimestamp()

      channel.send({ embeds: [embed] });
    } catch (err) {

      console.log(`There was an error: ${err}`);
      return interaction.editReply({
        content: `Someone tell Mac, there's a problem with my system.`,
        ephemeral: true,
      });

    }

  },
};
