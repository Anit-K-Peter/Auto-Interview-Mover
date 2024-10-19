const { EmbedBuilder } = require('discord.js');
const path = require('path');
const config = require(path.resolve(__dirname, '../config'));

module.exports = {
    name: 'check',
    description: 'Check interview setup information',
    async execute(message, args) {
        const checkEmbed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('🔍 Interview Setup Information')
            .addFields(
                { name: 'Interviewers Voice Channel', value: `<#${config.interviewersVoiceChannelId}>`, inline: true },
                { name: 'Waiting Voice Channel', value: `<#${config.waitingVoiceChannelId}>`, inline: true },
                { name: 'Interview Room 1', value: `<#${config.interviewRoomIds[0]}>`, inline: true },
                { name: 'Interview Room 2', value: `<#${config.interviewRoomIds[1]}>`, inline: true },
                { name: 'Log Channel', value: `<#${config.logChannelId}>`, inline: true },
                { name: 'Wait Channel', value: `<#${config.waitChannelId}>`, inline: true },
                { name: 'Interviewer Role 1', value: `<@&${config.interviewerRoleIds[0]}>`, inline: true },
                { name: 'Interviewer Role 2', value: `<@&${config.interviewerRoleIds[1]}>`, inline: true }
            )
            .setTimestamp();

        message.channel.send({ embeds: [checkEmbed] });
    },
};
