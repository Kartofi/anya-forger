const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");

module.exports = {
    data: { 
    name: "stop",
    description: "Stops the music."
    ,
    options: []}
,
async run (interaction) {
    if (!player.getQueue(interaction.guild.id)) return interaction.reply({ content: "There is no queue in this server."});
    await interaction.reply({ content: "Stopped the music."})
player.getQueue(interaction.guild.id).stop()


}
}