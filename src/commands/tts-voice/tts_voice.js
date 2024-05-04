"use strict";

const { ApplicationCommandOptionType } = require('discord.js');
const { createAudioResource, createAudioPlayer, StreamType, NoSubscriberBehavior, getVoiceConnection, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const discordTTS = require("discord-tts");


module.exports = {
    name: 'tts-pronunciation',
    description: 'Plays an audio of the given words',
    deleted: false,
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

            if (connection) {
                if (word.length < 200) {

                    const stream = discordTTS.getVoiceStream(word, { lang: 'en', slow: true });

                    console.log(stream)

                    const player = createAudioPlayer({
                        behaviors: {
                            noSubscriber: NoSubscriberBehavior.Pause,
                        },
                    });

                    const resource = createAudioResource(stream,
                        {
                            inputType: StreamType.Arbitrary,
                            inlineVolume: true
                        });

                    connection.subscribe(player);
                    player.play(resource);
                    /* console.log(resource);*/
                    console.log("playing audio...");

                    await interaction.editReply({
                        content: 'Playing audio...',
                    });
                } else {
                    await interaction.editReply({
                        content: 'The text must not exceed 200 characters',
                        ephemeral: true
                    });
                }
            } else {
                await interaction.editReply({
                    content: 'You must be in a voice channel',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Audio Error:', err);
            return interaction.editReply({
                ephemeral: true,
                content: `Someone tell Mac, there's a problem with my system`,
            });

        }

    }
}