const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Replies with the bot ping',

  callback: async (client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
    .setTitle('Pong!')
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .addFields(
    { name: 'Client:', value: `${ping}ms`, inline: false },
		{ name: 'Websocket:', value: `${client.ws.ping}ms`, inline: false},
    )

    interaction.editReply({embeds: [embed]});
  },
};
