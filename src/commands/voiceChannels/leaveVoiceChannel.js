const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  name: 'leave-vc',
  description: 'Leaves the voice channel where you are in',

  callback: async (client, interaction) => {

    const myChannel = interaction.member.voice.channel;
    const connection = getVoiceConnection(myChannel.guild.id);

    if (connection) {
      connection.destroy();

      interaction.reply({
        content: `Successfully left the voice channel **${myChannel.name}**`,
        ephemeral: true,
      });

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        console.log('The connection has entered the disconnected state');
      });

    } else {
      interaction.reply({
        content: 'You must be in a Voice Channel!',
        ephemeral: true,
      });
    }
  },
};
