const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

// currently not being used because getting a forbidden access

module.exports = {
    name: 'japanese-dictionary',
    description: 'Retrieves the definition from english vocabulary',
    options: [
        {
            name: 'word',
            description: 'write the word to look up',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    deleted: true,
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const word = interaction.options.getString('word');

        try {
            let response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${word}`);
            console.log('Received response:', response);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            let data = await response.json();
            console.log('Result:', data);
            let result = data.data[0];
            console.log('Result:', result);

            let embedInfo = await result.senses.map((item, index) => {

                let definition = item.english_definitions[0] || 'No definition found';
                
                return {
                    name: item.parts_of_speech.toUpperCase(),
                    value: `\`\`\` Definition: ${definition} \`\`\``,

                }
            });
            const embed = new EmbedBuilder()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setTitle(`Definition of **"${result.japanese[0].word}"** \n
                Romaji Reading: ${result.japanese[0].reading}`)
                .addFields(embedInfo)
                .setTimestamp()
                .setFooter({ text: 'Japanese Dictionary', iconURL: 'https://static.wikia.nocookie.net/projectsekai/images/f/f6/Hatsune_Miku_-_25-ji%2C_Nightcord_de._April_Fools_Chibi.png/revision/latest?cb=20230922025244' });

            interaction.editReply({ embeds: [embed] });

        } catch (err) {
            console.log(err)
            interaction.editReply({
                content: 'An error occurred while fetching data',
                ephemeral: true,
            });
        }
    },

}