const {  ApplicationCommandOptionType,EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'dictionary',
    description: 'Retrieves the definition and examples of one word',
    options : [
        {
            name :'word',
            description : 'write the word to look up',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    cooldown: 5,
  
    callback: async (client, interaction) => {
      await interaction.deferReply();

      const word = interaction.options.getString('word');

      const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      if(response.statusText == 'Not Found'){

        return interaction.editReply({
            content: `The word **${word}** does not exist`,
            ephemeral : true,
        })
      }

      const data = await response.json();
      const result = data[0];

    let embedInfo =  await result.meanings.map((data,index)=>{

        let definition = data.definitions[0].definition || 'No definition found';
        let example = data.definitions[0].example || 'No example found';
        let synonyms = data.definitions[0].synonyms[0] || 'No synonyms found';
        let antonyms = data.definitions[0].antonyms[0] || 'No antonyms found';

        return {
            name : data.partOfSpeech.toUpperCase(), 
            value : `\`\`\` Definition: ${definition} \n\n Example: ${example}  \n\n Synonyms: ${synonyms}  \n\n Antonyms: ${antonyms} \`\`\``,}
        });
      
      const embed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setTitle(`Definition of **"${result.word}"** \nPhonetics: *${result.phonetic || 'Not found'}*`)
      .addFields(embedInfo)  
      .setTimestamp()
      .setFooter({ text: 'English Dictionary', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNc1xa6WIHBesr3OHp16RhD1Hu0VKsfkLaqogMKK-wA&s' });
  
      interaction.editReply({embeds: [embed]});
    },
  
}