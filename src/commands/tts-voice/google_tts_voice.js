"use strict";
const { ApplicationCommandOptionType } = require('discord.js');
const { createAudioResource, createAudioPlayer, StreamType, NoSubscriberBehavior, getVoiceConnection } = require('@discordjs/voice');
const googleTTS = require('../../modules/google-tts/google-api.js');

// currently not being used (deprecated)

module.exports = {
    name: 'google-tts-pronunciation',
    description: 'Plays an audio of the given words',
    deleted: true,
    options: [
        {
            name: 'word',
            description: 'write the word to pronounce',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        if (!interaction.guild) {
            return interaction.reply({
                content: 'This command can only be used with guild context.',
                ephemeral: true
            });
        }
        const word = interaction.options.getString('word');

        try {
            const myVoiceChannel = interaction.member.voice.channel;

            if (!myVoiceChannel) {
                return interaction.editReply({
                    content: 'You need to be in a voice channel to use this command.',
                    ephemeral: true
                });
            }
            const connection = getVoiceConnection(myVoiceChannel.guild.id);

            const stream = await googleTTS.getVoice(word, {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
                splitPunct: ',.?',
            });
            

            console.log(stream)
  
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play,
                },
            });

            const resource = createAudioResource(stream,
                {
                    inputType: StreamType.Arbitrary,
                    inlineVolume: true
                });
            

            connection.subscribe(player);
            player.play(resource);
           
            console.log("playing audio...");

            await interaction.editReply({
                content: 'Playing audio...',
            });

        } catch (err) {
            console.error('Audio Error:', err);
            return interaction.editReply({
                content: 'An error occurred while processing the request',
                ephemeral: true,
            });

        }
    }
}