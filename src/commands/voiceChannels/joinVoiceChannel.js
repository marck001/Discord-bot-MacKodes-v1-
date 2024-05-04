const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  name: 'join-vc',
  description: 'Joins the voice channel where you are in',

  callback: async (client, interaction) => {

    const myChannel = interaction.member.voice.channel;

    if (myChannel) {
      const connection = joinVoiceChannel({
        channelId: myChannel.id,
        guildId: myChannel.guild.id,
        adapterCreator: myChannel.guild.voiceAdapterCreator,
      });

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
      });

      interaction.reply({
        content: `Successfully joined the voice channel **${myChannel.name}** - ready to play audio!`,
        ephemeral: true,
      });

    } else {
      interaction.reply({
        content: 'You must be in a Voice Channel!',
        ephemeral: true,
      });
    }
  }
};
