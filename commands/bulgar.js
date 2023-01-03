

const { MessageAttachment, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: { 
    name: "bulgar",
    description: "Play one shot of bulgar"
    ,
    options: []}
,
async run (interaction) {
   
    let minus = new MessageButton()
    .setCustomId('start')
    .setLabel('Spin')
    .setStyle('PRIMARY')
    .setDisabled(false)
    const row = new MessageActionRow().addComponents(minus);
    const meme_em = new MessageEmbed()
	.setColor('RANDOM')
	.setTitle("Bulgur")
  .setDescription(`Press the button to start the game.`)
await interaction.reply({embeds: [meme_em], components:[row]})
}
}