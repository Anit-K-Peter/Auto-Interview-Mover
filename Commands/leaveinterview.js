//           CREATED BY SEBASTIAN VARKEY 
//
// # FEEL FREE TO USE ANY PART OF CODE
// ## FOR HELP CONTACT ME ON DISCORD
// ## Contact    [ https://discord.com/users/891002113134563428 ]
// ## Support Server [ https://discord.com/invite/apF2ZBXZVF ]
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leaveinterview',
    description: 'Leaves the voice channel',
    async execute(message) {
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
            connection.destroy();
            await message.reply('Left the voice channel!');
        } else {
            await message.reply('I am not in a voice channel!');
        }
    },
};
