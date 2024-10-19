const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Provides detailed information about a command.',
    execute(message, args) {
        if (args.length === 0) {
            return message.reply('Please provide a command name to get information about.');
        }

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        if (!command) {
            return message.reply(`No command found with name: \`${commandName}\``);
        }

        const embed = new EmbedBuilder()
            .setTitle(`Command Information: ${command.name}`)
            .setColor('#0099ff')
            .addFields(
                { name: 'Name', value: command.name, inline: true },
                { name: 'Description', value: command.description || 'No description available', inline: true },
                { name: 'Aliases', value: command.aliases ? command.aliases.join(', ') : 'No aliases', inline: true }
            )
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        
    },
};
