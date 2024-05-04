const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,EmbedBuilder,
  } = require('discord.js');
const ms = require('ms');
/*const prettyMs = require('pretty-ms');*/

  module.exports = {
    deleted: false,
    name: 'timeout',
    description: 'Timeout people',
    devOnly: true,
    // testOnly: Boolean,
    options: [
      {
        name: 'target',
        description: 'The user to timeout',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
      {
        name: 'duration',
        description: 'Timeout duration (10m, 1h, 1 day).',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'reason',
        description: 'The main reason of the timeout',
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

  
    callback: async (client, interaction) => {
    
      const userId = interaction.options.get('target').value;
      const reason = interaction.options.getString('reason') || 'no given reason';
      const channel =  await client.channels.cache.get(process.env.BOT_COMMANDS_ID);
      const duration = interaction.options.get('duration').value;

      await interaction.deferReply();
  
      const user = await interaction.guild.members.fetch(userId);


      if (!user) {
        await interaction.editReply({content:"That user doesn't exist in this server.", ephemeral:true});
        return;
      }
      
      const userRolePos = user.roles.highest.position;
      const requestUserRolePos = interaction.member.roles.highest.position;
      const botRolePos = interaction.guild.members.me.roles.highest.position;


      if (userRolePos >= requestUserRolePos) {
        await interaction.editReply(
          {content:"You can't time out that user because they have the same/higher role than you.",ephemeral:true}
        );
        return;
      }
  
      if (userRolePos >= botRolePos) {
        await interaction.editReply(
          {content:"I can't time out that user because they have the same/higher role than me.",ephemeral:true}
        );
        return;
      }

      const msDuration = ms(duration);
      console.log(msDuration)
      if (isNaN(msDuration)) {
        await interaction.editReply({content:'Please provide a valid timeout duration.', ephemeral:SVGComponentTransferFunctionElement});
        return;
      }

      if (msDuration < 5000 || msDuration > 6.0475e10) {
        await interaction.editReply({content:'Timeout duration cannot be less than 5 seconds or more than 25 days.',ephemeral:true});
        return;
      }

      try{
        const { default: prettyMs } = await import('pretty-ms');
  
        await user.timeout(msDuration,reason);
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setImage(user.displayAvatarURL())
        .setDescription(`User **${user}** was timed out for ${reason} 🔨. \n**Timeout duration:** ${prettyMs(msDuration, { verbose: true })}`)
        .setTimestamp();
        console.log(user.displayAvatarURL())

        channel.send({embeds: [embed]});

        await interaction.editReply({content:`${user} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`,ephemeral: true});
      }catch(err){
  
        console.log(`There was an error: ${err}`);
        return interaction.editReply({
          content: `Someone tell Mac, there's a problem with my system.`,
          ephemeral: true,
      });
      
      }
  
    },
  };
  