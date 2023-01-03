const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");

module.exports = {
    data: { 
    name: "skip",
    description: "Skips the current music."
    ,
    options: []}
,
async run (interaction) {
    if (!player.getQueue(interaction.guild.id)) return interaction.reply({ content: "There is no queue in this server."});
    interaction.reply({embeds: [new MessageEmbed().setTitle("Skipped!").setColor("GREEN")]})

    player.getQueue(interaction.guild.id).skip();



}
}