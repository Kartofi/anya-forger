const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");


module.exports = {
    data: { 
    name: "queue",
    description: "Dysplays the queue"
    ,
    options: []}
,
async run (interaction) {
    if (!player.getQueue(interaction.guild.id)) return interaction.reply({ content: "There is no queue in this server."});
   let text = ""
 let embed = new MessageEmbed()
 .setTitle("Queue for " + interaction.guild.name)
 .setColor("YELLOW")
for (track of player.getQueue(interaction.guild.id).tracks) {
    text += track.title + "\n"
}
embed.setDescription(text)
interaction.reply({ embeds: [embed]})

}
}