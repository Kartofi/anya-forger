const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");

module.exports = {
    data: { 
    name: "clear",
    description: "Cleares the queue"
    ,
    options: []}
,
async run (interaction) {
    if (!player.getQueue(interaction.guild.id)) return interaction.reply({ content: "There is no queue in this server."});
   await interaction.reply({embeds: [new MessageEmbed().setTitle("Cleared Queue in this server").setColor("GREEN")]})
    player.deleteQueue(interaction.guild.id);



}
}