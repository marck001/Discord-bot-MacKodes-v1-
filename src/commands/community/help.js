const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays all the available commands',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();

      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('----- List of commands -----')
      .setAuthor({name: 'Mac'})
      .setDescription('Some useful commands')
      .addFields(
        {name: 'Python', value:'`/python`'},
        {name: 'Javascript and web', value:'`/javascript`'},
      )
      .addFields(
        {name: 'Resources for English', value: '`/english`'},
        {name:'Dictionary', value: '`/dictionary`'},
        {name:'TTS voice', value: '`/tts-pronunciation`'},
      )
      .setTimestamp()
      .setFooter({ text: 'commands', iconURL: 'https://static.wikia.nocookie.net/projectsekai/images/f/f6/Hatsune_Miku_-_25-ji%2C_Nightcord_de._April_Fools_Chibi.png/revision/latest?cb=20230922025244' });
  
      interaction.editReply({embeds: [embed]});
    },
  };
  