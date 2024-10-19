const { EmbedBuilder } = require('discord.js');
const os = require('os');
const config = require('../config');
const ecosystem = require('../ecosystem.config')

module.exports = {
    name: 'botinfo',
    description: 'Displays information about the bot.',
    execute(message) {
        const botName = message.client.user.username;
        const botLogo = message.client.user.displayAvatarURL();
        const PREFIX = config.PREFIX;

        const version = ecosystem.version;
        const text = ecosystem.Text;
        
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const usedMemoryMB = (usedMemory / 1024 / 1024).toFixed(2);
        const totalMemoryMB = (totalMemory / 1024 / 1024).toFixed(2);

        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);
        const uptimeSeconds = Math.floor(uptime % 60);
        const formattedUptime = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;

        const totalServers = message.client.guilds.cache.size;
        const totalUsers = message.client.users.cache.size;
        const latency = Math.round(message.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle(botName)
            .setDescription(`The Voice Channel Mover Bot is a Discord bot that simplifies server management by allowing admins to move members between voice channels effortlessly, facilitating better organization and communication within the community.\n\n## **Information**\n<a:smoji_15:1243920434143956992> **Developer**: bigcodereminder\n<a:smoji_15:1243920434143956992> **Node.js**: ${version}\n<a:smoji_15:1243920434143956992> **Uptime**: ${formattedUptime}\n<a:smoji_15:1243920434143956992> **Prefix**:${PREFIX}\n<a:smoji_15:1243920434143956992>**Powered By ${text}**\n\n## **Statistics**\n<a:smoji_15:1243920434143956992> **Servers**: ${totalServers} servers\n<a:smoji_15:1243920434143956992> **Users**: ${totalUsers} users\n<a:smoji_15:1243920434143956992> **Ram Usage**: ${usedMemoryMB} MB / ${totalMemoryMB} MB\n<a:smoji_15:1243920434143956992> **Latency**: ${latency}ms\n## **Links**\n<a:smoji_15:1243920434143956992> **Support Server**: [Link to support server]\n<a:smoji_15:1243920434143956992> **Invite Bot**: [Link to invite the bot]\n<a:smoji_15:1243920434143956992> **Vote**: [Link to vote]`)
            .setColor('#000012')
            .setThumbnail(botLogo);


        try {
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error sending bot information:', error);
            message.reply('Failed to send bot information. Ensure the bot has the necessary permissions.');
        }
    },
};
