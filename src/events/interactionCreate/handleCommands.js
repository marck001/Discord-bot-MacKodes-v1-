const { devs } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const { Collection } = require('discord.js');


module.exports = async (client, interaction) => {

  if (!interaction.isChatInputCommand()) return;
  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;
    console.log(commandObject.name);

    if (!commandObject.name) {
			return interaction.reply({content:`There is no command with name \`${commandObject.name}\`!`,ephemeral:true});
		}

    if (!client.cooldowns) {
      client.cooldowns = new Collection();
    }
    const { cooldowns } = client;

    if (!cooldowns.has(interaction.commandName)) {
      cooldowns.set(interaction.commandName, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(interaction.commandName);
    const defaultCooldownDuration = 5;
    const cooldownAmount = (commandObject.cooldown ?? defaultCooldownDuration) * 1_000;


    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        return interaction.reply({ content: `Please wait, you are on a cooldown for \`${commandObject.name}\`. You can use it again in ${defaultCooldownDuration}s <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }

    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers or mods are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions, sorry.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }
    /* handleCooldown(client, interaction, client.cooldowns, commandObject);*/

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
    interaction.reply({
      content: "Someone tell Mac, there's a problem with my system.",
    });
  }
};
