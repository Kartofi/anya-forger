const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");

module.exports = {
    data: { 
    name: "loop",
    description: "Enables/Disables loop"
    ,
    options: [{
        name: "type",
        type: 3,
        description: "Chose from off track queue autoplay",
        required: true
    }]}
,
async run (interaction) {
    let types = ['off', 'track', 'queue', 'autoplay']
    const name = interaction.options.getString('type')
    if (!name) return interaction.reply({ content: `Chose from off track queue autoplay`, ephemeral: true }).catch(e => { })
    if (!player.getQueue(interaction.guild.id)) return interaction.reply({ content: "There is no queue in this server."});
    
   if (types.indexOf(name) <= -1) {
    return interaction.reply({content: "Enter valid type"})
   }
    player.getQueue(interaction.guild.id).setRepeatMode(types.indexOf(name))
    interaction.reply({embeds: [new MessageEmbed().setTitle("Loop set to " + name).setColor("GREEN")]})


}
}