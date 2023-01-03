

const { MessageAttachment, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: { 
    name: "controls",
    description: "Display/Configure controls with buttons"
    ,
    options: []}
,
async run (interaction) {
   let cancontrol = true
 
   if (player.getQueue(interaction.guild.id) != undefined) {
    cancontrol = false
     }
    let stop = new MessageButton()
    .setCustomId('stop')
    .setLabel('Stop')
    .setStyle('DANGER')
    .setDisabled(cancontrol)



    const row = new MessageActionRow().addComponents(stop);
    const meme_em = new MessageEmbed()
	.setColor('GREEN')
	.setTitle("Anya Forger")
  .setDescription(`Controls for ` + interaction.guild.name)
await interaction.reply({embeds: [meme_em], components:[row]})
}
}