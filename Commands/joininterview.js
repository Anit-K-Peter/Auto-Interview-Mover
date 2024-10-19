//           CREATED BY SEBASTIAN VARKEY 
//
// # FEEL FREE TO USE ANY PART OF CODE
// ## FOR HELP CONTACT ME ON DISCORD
// ## Contact    [ https://discord.com/users/891002113134563428 ]
// ## Support Server [ https://discord.com/invite/apF2ZBXZVF ]
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'joininterview',
    description: 'Joins the interviewers voice channel',
    async execute(message) {
        if (message.member.voice.channel) {
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            await message.reply('Joined the voice channel!');
        } else {
            await message.reply('You need to join a voice channel first!');
        }
    },
};
