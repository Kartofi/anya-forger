const { QueryType } = require('discord-player');
const {  MessageEmbed } = require("discord.js");

module.exports = {
    data: { 
    name: "play",
    description: "Plays a song!"
    ,
    options: [
        {
            name: "music",
            type: 3,
            description: "The name or the url of a sound you want to play.",
            required: true
        }
    ]}
,
async run (interaction) {
    const name = interaction.options.getString('music')
       if (!name) return interaction.reply({ content: `Write the name of the music you want to search. ❌`, ephemeral: true }).catch(e => { })
       const res = await player.search(name, {
        requestedBy: interaction.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return interaction.reply(`No results found ${interaction.author}... try again ? ❌`);
    let queue
    if (player.getQueue(interaction.guild.id)) {
        queue = player.getQueue(interaction.guild.id)
        }else {
            queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel
            });
        }
   

    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        await player.deleteQueue(interaction.guild.id);
        return interaction.channel.send(`I can't join the voice channel ${interaction.author}... try again ? ❌`);
    }

    await interaction.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();




}
}