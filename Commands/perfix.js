const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "../config.js");

module.exports = {
    name: "prefix",
    description: "Changes the bot's command prefix.",
    execute(message, args) {
        if (!args[0]) {
            return message.reply("Please provide a new prefix.");
        }

        const newPrefix = args[0];

        // Read the current config
        let config = require(configPath);

        // Update the PREFIX in the config
        config.PREFIX = newPrefix;

        // Write the updated config back to the file
        fs.writeFile(
            configPath,
            `module.exports = ${JSON.stringify(config, null, 4)}`,
            (err) => {
                if (err) {
                    console.error(err);
                    return message.reply(
                        "There was an error updating the prefix.",
                    );
                }

                message.reply(`Prefix successfully changed to ${newPrefix}`);
            },
        );
    },
};
