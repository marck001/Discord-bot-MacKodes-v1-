const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,  EmbedBuilder
  } = require('discord.js');


  module.exports = {
    
    name: 'post',
    description: 'Posts an embed message in the news channel',
    options: [
      {
        name: 'title',
        description: 'The title for the event',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'hour',
        description: 'The hour of the session start',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'context',
        description: 'Some context about the event',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'content',
        description: 'The content for the session',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'author',
        description: `Write session author's name`,
        required: false,
        type: ApplicationCommandOptionType.String,
      },
      
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
  
    callback: async (client, interaction) => {

      const channel = await client.channels.cache.get(process.env.NEWS_ID);
      const title = interaction.options.getString('title');
      const hour = interaction.options.getString('hour');
      const content = interaction.options.getString('content');
      const context = interaction.options.getString('context');
      const author =  interaction.options.getString('author');

      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Title: ${title}`)
      .setDescription(`**Session description**: \n ${context}`)
      .addFields(
        {name: 'Hour:', value: hour, inline:true},
      )
      .addFields(
        {name: 'Session Content', value: content},
      )
      .addFields({ name: 'Note: ', value: 'Confirm your attendance below', inline: true })
      .setAuthor({name: author})
      .setTimestamp()
      .setFooter({ text: 'Posts', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNc1xa6WIHBesr3OHp16RhD1Hu0VKsfkLaqogMKK-wA&s' });
  
      channel.send({embeds: [embed]});

      interaction.reply({
        content: 'Message sent!',
        ephemeral: true,
      });

    },
  };
  