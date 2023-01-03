const { MessageAttachment, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: {
    options: []}
,

async run (interaction) {
   

   
 
    const meme_em = new MessageEmbed()
	.setColor('GREEN')
   
	.setTitle("Done")
 
  if (!player.getQueue(interaction.guild.id)) return interaction.reply({ embeds: [meme_em.setTitle("No Music playing here!")]});
  await interaction.reply({ embeds: [meme_em.setTitle("Stopped!")]})
player.getQueue(interaction.guild.id).stop()

}
}