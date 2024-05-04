const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');
  
  module.exports = {
    
    name: 'send-message',
    description: 'Send messages to available channels',
    options: [
      {
        name: 'text',
        description: 'The message to send',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'channel',
        description :'Mention Channel',
        required: true,
        type: ApplicationCommandOptionType.String,

      }
      
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
  
    callback: async (client, interaction) => {
      //regex
      const RegexID = interaction.options.getString('channel');
      const regex = /<#(\d+)>/;
      const match = RegexID.match(regex);
      const ID = match[1]
      const channel =  await client.channels.cache.get(ID);
      const message = interaction.options.getString('text');

      if(!channel){
        interaction.reply({
          content: `That channel doesn't exist!`,
          ephemeral: true,
        });
      }else{
        channel.send({ content: message });
        interaction.reply({
        content: `Message sent to ${channel.name}!`,
        ephemeral: true,
      });
      }
    
      
      
    },
  };
  