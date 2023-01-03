const { Client, Intents, MessageEmbed } = require("discord.js");
global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
const { Player } = require("discord-player");
const fs = require("fs")
// Create a new Player (you don't need any API Key)
global.player = new Player(client);

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

let commands_register = []

let commands = []

let commands_files = fs.readdirSync("./commands")
for (i of commands_files) {
    const data = require("./commands/" + i)
    commands.push(data)
    commands_register.push(data.data)
}

let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);


const rest = new REST({ version: "9" }).setToken(data.token);

(async () => {
  try {
    console.log("Started refreshing application [/] commands.");

    await rest.put(
      Routes.applicationCommands("713310663061143562"),
      { body: commands_register },
    );

    console.log("Successfully reloaded application [/] commands.");
  } catch (error) {
    console.error(error);
  }
})();



// add the trackStart event so when a song will be played this message will be sent



    client.on('voiceStateUpdate', (oldState, newState) => {
        // check if someone connects or disconnects
       
     
        if (oldState.channel === null || typeof oldState.channel == 'undefined') return;
        if (newState.id !== client.user.id) return;
        let embed = new MessageEmbed()
        .setTitle("Someone disconnected me.")
        .setColor("RED")
       if    (player.getQueue(oldState.guild.id)) {
        player.getQueue(oldState.guild.id).metadata.send({ embeds:  [embed]}).catch(e => { })
       }
     
        return player.deleteQueue(oldState.guild.id);;
        
    })

    function abbreviateNumber(value) {
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "k", "m", "b","t"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }

client.once("ready", () => {
    console.log("I'm ready !");
});
client.on('interactionCreate', (interaction) => {
   if (interaction.type == "MESSAGE_COMPONENT") {
    let command = require("./buttons/" + interaction.customId)
    if (command) {
        command.run(interaction)
    }
   }else {
    let command = require("./commands/" + interaction.commandName)
    if (command) {
        command.run(interaction)
    }
   }
  
})

player.on('trackStart', (queue, track) => {
    if(queue){
    
        if(queue.metadata){
            let embed = new MessageEmbed()
            .setTitle( "Started Playing " + track.title + " in " + queue.connection.channel.name)
            .setColor("GREEN")
            .setImage(track.thumbnail)
            .setDescription(abbreviateNumber(track.views) + " views  Duration: " + track.duration)
    queue.metadata.send({ embeds:  [embed]}).catch(e => { })
        }}
});

player.on('trackAdd', (queue, track) => {
    if(queue){
        if(queue.metadata){
    queue.metadata.send({ content: `**${track.title}** added to playlist. ✅` }).catch(e => { })
        }}
});


player.on('channelEmpty', (queue) => {
    if (queue.connection) {
        queue.metadata.send({ content: 'I left the audio channel because there is no one on my audio channel. ❌' }).catch(e => { })
        queue.connection.disconnect();
        player.deleteQueue(queue.guild.id);
    }
});
player.on('queueEnd', (queue) => {
  
        if(queue){
        setTimeout(() => {
            if(queue.connection) queue.connection.disconnect();
        }, 1000);
    }
        if(queue.metadata){
    queue.metadata.send({ content: 'All play queue finished, I think you can listen to some more music. ✅' }).catch(e => { })
        }
});

player.on("error",  (queue, error) => {
    if(queue){
        if(queue.metadata){
            queue.metadata.send({ content: 'Im having trouble trying to connect to the voice channel. ❌ | `'+error+"`" }).catch(e => { })
        }}
})
client.login(data.token);