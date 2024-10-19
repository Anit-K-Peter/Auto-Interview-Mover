# 🛠️ Setup Voice Channels
The purpose of this bot is to swiftly schedule interviews for interested individuals, so we're providing a helpful Installation for Your bot.


## 1, Make Bot
- Create a bot account on Discord. 
    - Go to [https://discord.com/developers/applications](https://discord.com/developers/applications)
    - Click on "New Application"
    - Give the application a name and click on "Create"
    - Navigate to the "Bot" tab
    - Turn on these
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249792439636459520/image.png?ex=66689769&is=666745e9&hm=180f3befadc5c773051307b66102004287a822d65f0903bd593be692ad7ca414&=&format=webp&quality=lossless&width=922&height=356)
    - You can copy the bot token from the "Bot" tab by clickng the reset button.
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249792624055816325/image.png?ex=66689795&is=66674615&hm=5815d4df08db51b1f2ad9c864ff085ff28c1637620a0c15eabe7b9d08f4a1885&=&format=webp&quality=lossless&width=894&height=90)
    - The bot token is a secret that should not be shared with anyone.
    - Make sure to set Installation Authorization
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249793261380567184/image.png?ex=6668982d&is=666746ad&hm=a361bdef26dd3fb0fd6232043ee2de56f32cee45a7d9bf17905f8b587c3d4e15&=&format=webp&quality=lossless&width=494&height=196)

## 2, Make Channel
- Create These Types of channels 
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249788739463544882/image.png?ex=666893f7&is=66674277&hm=f1524c8f7e02a6d0c7e0c3b03c19f7807b2e47cf441b46e6af8b535f930c9812&=&format=webp&quality=lossless&width=189&height=123)
- (optional)
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249788876982321162/image.png?ex=66689418&is=66674298&hm=850e6036ef80c67ed7614b4f3b890102d89c3aae4b4b0b967f498e50300c4230&=&format=webp&quality=lossless&width=188&height=36)

## 3, Get These Channel identification Numbers(ID)
- Open Discord settings and navigate to the "Advanced" area.
- Select the "Developer Mode" option and turn it on. 
![Image Description](https://media.discordapp.net/attachments/891009831606059049/1249790377385394237/image.png?ex=6668957d&is=666743fd&hm=e7e0cd3edab8907c3f8845c1426aacc3080b5fc584773e2cbdccab9fb98b15ac&=&format=webp&quality=lossless&width=557&height=60)
- Right-click on a channel you want to identify and click "Copy ID"

## 4, Edit Config.js 

- Open `config.js` file and replace:
    - `// Add your bot token here` placeholder with your bot token
    - `// Add ID of interviewers voice channel here` placeholder with the ID of your interviewers voice channel
    - `// Add ID of waiting voice channel here` placeholder with the ID of your waiting voice channel
    - `// Add ID of interview room 1 here` placeholder with the ID of your first interview room
    - `// Add ID of interview room 2 here` placeholder with the ID of your second interview room
    - `// Add ID of interview room 3 here` placeholder with the ID of your third interview room
    - `// Add ID of log channel here` placeholder with the ID of your log channel
    - `// Add ID of interviewer role 1 here` placeholder with the ID of your first interviewer role
    - `// Add ID of interviewer role 2 here` placeholder with the ID of your second interviewer role
    - `// Add ID of interviewer role 3 here` placeholder with the ID of your third interviewer role
    - `// Add ID of interviewer role 4 here` placeholder with the ID of your fourth interviewer role
    - `// Add ID of wait channel here` placeholder with the ID of your wait channel.

<p align="center">Example</p>

```javascript
module.exports = {
    "BOT_TOKEN": "MTIxNDA0MDczMzEwMzgxNjc1NA.G3U-wf.x5xblx1qcGV7myJZB6bjiO7WvFtYRPegGiiBeU",
    "PREFIX": "s!",
    "interviewersVoiceChannelId": "12430793984756982216",
    "waitingVoiceChannelId": "12127392282406744094",
    "interviewRoomIds": [
        "12127402539708266206",
        "12127403445890622154",
        "12127403030227572806"
    ],
    "logChannelId": "12326219248892837920",
    "interviewerRoleIds": [
        "12363700712229069885",
        "12363705743503051324",
        "12363706851119434772",
        "12145384821060628018"
    ],
    "waitChannelId": "1220058315145482281"
}
```
## 4.5, Explaination
#### If you're unsure which channel ID to place in the designated placeholders, refer to this information to understand where each ID should be placed.
```javascript
"InterviewerVoiceChannelId"
``` 
- The bot needs to confirm if the interviewer is available, so it's essential to allow interviewers to bot move the interviewer. Channel Example Name: `#Interviewers Vc`
```javascript
"waitingVoiceChannelId"
```
- This refers to the ID of the waiting voice channel or waiting room channel. Channel Example Name: `#Waiting Romm`
```javascript
"InteviewRoomIds"
```
- There are three default rooms. You must add these three because the bot needs to monitor the voice channels for moving to other available voice channels. Channel Example Name: `#Interview Room 1 |#Interview Room 2 |#Interview Room 3`
```javascript
"logChannelId"
```
- The log channel is optional, but if you choose to use it, it provides valuable information such as the duration of the interview and other details in a list format.Channel Example Name: `#interview Logs`
```javascript
"interviewerRoleIds"
```
- There are four default interviewer roles designated for those conducting interviews.Roles Example Name: `@Trainee Interviewer | @Lead interviewer | @Master Interviewer | Prestige Interviewer`
```javascript
"waitingChannelId"
```
- The waiting channel refers to any channel that is not whitelisted or designated for interview chats. Here, the bot can respond to interviewees, indicating whether interviewers are available or if the rooms are occupied. Channel Example Name: `#Non-Whitelist Chat`
## 5, Bot Installation
- Open your terminal or command prompt.
- Navigate to the directory where you saved the bot files.
## 5.5, Installation
- Download & install Node.JS
  - [Download & Install](https://nodejs.org/en/download/package-manager)
- Run command in bot directory.
    ```bash
    npm install
    ```
## 6, Start The Bot
- Run the bot by executing the main script file using Node.js. For example:
    ```bash
    node Index.js
    ```
 
- Click the green button on the top if your using replit.com
- # Default Prefix 
    ```java
    s!
    ```