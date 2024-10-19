//
//
//
//                  ITS ABOUT DRIVING A CAR 
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//                   WHY CHECKING INDEX.JS?
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//                        STILL SCROLLING???
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 
// 
// $$\    $$\  $$$$$$\        $$\      $$\  $$$$$$\  $$\    $$\ $$$$$$$$\ $$$$$$$\        $$$$$$$\   $$$$$$\ $$$$$$$$\ 
// $$ |   $$ |$$  __$$\       $$$\    $$$ |$$  __$$\ $$ |   $$ |$$  _____|$$  __$$\       $$  __$$\ $$  __$$\\__$$  __|
// $$ |   $$ |$$ /  \__|      $$$$\  $$$$ |$$ /  $$ |$$ |   $$ |$$ |      $$ |  $$ |      $$ |  $$ |$$ /  $$ |  $$ |   
// \$$\  $$  |$$ |            $$\$$\$$ $$ |$$ |  $$ |\$$\  $$  |$$$$$\    $$$$$$$  |      $$$$$$$\ |$$ |  $$ |  $$ |   
//  \$$\$$  / $$ |            $$ \$$$  $$ |$$ |  $$ | \$$\$$  / $$  __|   $$  __$$<       $$  __$$\ $$ |  $$ |  $$ |   
//   \$$$  /  $$ |  $$\       $$ |\$  /$$ |$$ |  $$ |  \$$$  /  $$ |      $$ |  $$ |      $$ |  $$ |$$ |  $$ |  $$ |   
//    \$  /   \$$$$$$  |      $$ | \_/ $$ | $$$$$$  |   \$  /   $$$$$$$$\ $$ |  $$ |      $$$$$$$  | $$$$$$  |  $$ |   
//     \_/     \______/       \__|     \__| \______/     \_/    \________|\__|  \__|      \_______/  \______/   \__|   
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//                OKEY FINALY
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//          DON'T COPY OR REWRITE ANY CODE
//
//
//
//
//
//
//           CREATED BY SEBASTIAN VARKEY 
//
// # FEEL FREE TO USE ANY PART OF CODE
// ## FOR HELP CONTACT ME ON DISCORD
// ## Contact    [ https://discord.com/users/891002113134563428 ]
// ## Support Server [ https://discord.com/invite/apF2ZBXZVF ]

const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
let config = require('./config');
const { printWatermark } = require('./utils/pw.js'); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();

const loadCommands = (commandsPath) => {
    if (!fs.existsSync(commandsPath)) {
        console.error(`Directory ${commandsPath} does not exist.`);
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.name, command);
    }

    const subFolders = fs.readdirSync(commandsPath).filter(file => fs.statSync(path.join(commandsPath, file)).isDirectory());
    for (const folder of subFolders) {
        loadCommands(path.join(commandsPath, folder));
    }
};

loadCommands(path.join(__dirname, 'Commands'));

client.once('ready', () => {
    console.log(`Connected to the bot ${client.user.tag}!`);

    client.guilds.cache.forEach(guild => {
        console.log(`Joined server: ${guild.name}`);
    });
    
    printWatermark();
});
client.on('guildCreate', guild => {
    const randomChannel = guild.channels.cache.random();
    if (randomChannel) {
        randomChannel.send('Thank you for inviting me to this server!');
    }
});

client.on('messageCreate', message => {
    delete require.cache[require.resolve('./config')];
    config = require('./config');

    const prefix = config.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    const guild = newState.guild;

    // When a user joins the waiting voice channel
    if (newState.channelId === config.waitingVoiceChannelId) {
        const interviewersVoiceChannel = guild.channels.cache.get(config.interviewersVoiceChannelId);
        const waitingMember = newState.member;

        if (interviewersVoiceChannel.members.size === 0) {
            const waitChannel = guild.channels.cache.get(config.waitChannelId);
            if (waitChannel) {
                const userMention = waitingMember.toString();
                waitChannel.send(`${userMention} No interviewers are currently available. Please wait for an interviewer to join the waiting channel.`);
            }
        } else {
            // If an interviewer is already in the interviewer room
            const availableRoom = config.interviewRoomIds.find(roomId =>
                !guild.channels.cache.get(roomId).members.size
            );

            if (availableRoom) {
                // Move the waiting member to the available room
                await waitingMember.voice.setChannel(availableRoom);

                // Move the interviewer to the available room
                const interviewer = interviewersVoiceChannel.members.first();
                if (interviewer) {
                    await interviewer.voice.setChannel(availableRoom);
                }

                const logChannel = guild.channels.cache.get(config.logChannelId);
                const startTime = new Date();

                const interviewEndHandler = async (endState) => {
                    if (endState.channelId !== availableRoom) {
                        const endTime = new Date();
                        const duration = Math.floor((endTime - startTime) / 1000);
                        const durationMinutes = Math.floor(duration / 60);
                        const durationSeconds = duration % 60;

                        logChannel.send(`Interview ended. Duration: ${durationMinutes} minutes and ${durationSeconds} seconds. Interviewer: ${interviewer.user.tag}, Interviewee: ${endState.member.user.tag}`);

                        client.removeListener('voiceStateUpdate', interviewEndHandler);
                    }
                };

                client.on('voiceStateUpdate', interviewEndHandler);
            } else {
                waitingMember.send('All interview rooms are currently occupied. Please wait for an available room.');
            }
        }
    }

    // When an interviewer joins the interviewers voice channel
    if (newState.channelId === config.interviewersVoiceChannelId && oldState.channelId !== config.interviewersVoiceChannelId) {
        const interviewersVoiceChannel = guild.channels.cache.get(config.interviewersVoiceChannelId);

        if (interviewersVoiceChannel.members.size > 0) {
            const waitingVoiceChannel = guild.channels.cache.get(config.waitingVoiceChannelId);
            const waitingMember = waitingVoiceChannel.members.find(member => !member.user.bot);

            if (waitingMember) {
                const availableRoom = config.interviewRoomIds.find(roomId =>
                    !guild.channels.cache.get(roomId).members.size
                );

                if (availableRoom) {
                    // Move the waiting member to the available room
                    await waitingMember.voice.setChannel(availableRoom);

                    // Move the interviewer to the available room
                    const interviewer = interviewersVoiceChannel.members.first();
                    if (interviewer) {
                        await interviewer.voice.setChannel(availableRoom);
                    }

                    // Notify the user in the waiting room
                    waitingMember.send(`An interviewer has arrived. And your interview is starting...`);

                    // Notify the waiting channel
                    const waitChannel = guild.channels.cache.get(config.waitChannelId);
                    if (waitChannel) {
                        waitChannel.send(`${waitingMember.toString()} An interviewer has arrived.And your interview is starting`);
                    }

                    const logChannel = guild.channels.cache.get(config.logChannelId);
                    const startTime = new Date();

                    const interviewEndHandler = async (endState) => {
                        if (endState.channelId !== availableRoom) {
                            const endTime = new Date();
                            const duration = Math.floor((endTime - startTime) / 1000);
                            const durationMinutes = Math.floor(duration / 60);
                            const durationSeconds = duration % 60;

                            logChannel.send(`Interview ended. Duration: ${durationMinutes} minutes and ${durationSeconds} seconds. Interviewer: ${interviewer.user.tag}, Interviewee: ${endState.member.user.tag}`);

                            client.removeListener('voiceStateUpdate', interviewEndHandler);
                        }
                    };

                    client.on('voiceStateUpdate', interviewEndHandler);
                } else {
                    waitingMember.send('All interview rooms are currently occupied. Please wait for an available room.');
                }
            }
        }
    }
});


client.login(config.BOT_TOKEN);
