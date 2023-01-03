const { MessageAttachment, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: {
    options: []}
,

async run (interaction) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      function getpoints(first , sec , third) {
        let score = 0;
        if (first == sec && sec == third && first != 1 && first != 6)
        {
            score += sec * 100;
        }
        else if (first == sec && sec == third && first != 1 && first == 6) 
        {
            score -= scoree;
        }
        else
        {
           if (first == 5) {
            score += 50;
           }
           if (sec == 5) {
            score += 50;
           }
           if (third == 5) {
            score += 50;
           }

           if (first == 1) {
            score += 100;
           }
           if (sec == 1) {
            score += 100;
           }
           if (third == 1) {
            score += 100;
           }
        }
       
       
        return score;
      }
    let first = getRandomInt(6);
    let sec = getRandomInt(6);
    let third = getRandomInt(6);

    let minus = new MessageButton()
    .setCustomId('start')
    .setLabel('Spin')
    .setStyle('PRIMARY')
    .setDisabled(false)
    const row = new MessageActionRow().addComponents(minus);
    const meme_em = new MessageEmbed()
	.setColor('RANDOM')
   
	.setTitle(getpoints(first, sec, third) + " $")
  .setDescription(`${first} ${sec} ${third}`)
  .setAuthor("You Won ")
  


   await interaction.update({embeds: [meme_em], components:[row]});
}
}