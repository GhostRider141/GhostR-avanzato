const dayjs=require('dayjs');
const{MessageEmbed}=require('discord.js');

module.exports={
    name:'server',
    description:'Informazioni del server',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const guild= await interaction.guild;
        const guildOwner=await guild.members.fetch(guild.ownerId);
        const texts=guild.channels.cache.filter(c=>c.type==='GUILD_TEXT').size
        const voices=guild.channels.cache.filter(c=>c.type==='GUILD_VOICE').size
        const category=interaction.guild.channels.cache.filter(c=>c.type==="GUILD_CATEGORY").size
        const tot=interaction.guild.members.cache.size;
        const bot=interaction.guild.members.cache.filter(m=>m.user.bot).size;
        const membri=tot-bot;

        const embedServer=new MessageEmbed()
            .setColor('GOLD')
            .setTitle('Informazioni del server')
            .setAuthor({
                name:guild.name,
                iconURL:guild.iconURL()
            })
            .setThumbnail(guild.iconURL())
            .addField('🆔ID del server: ',`${guild.id}`)
            .addField('👑Proprietario: ',`${guildOwner.user.tag}`)
            .addField('📆Creazione: ',`${dayjs(guild.createdAt).format('DD/MM/YYYY')}`)
            .addField(`👥Utenti: ${tot}`,`-membri: ${membri}\n-bot: ${bot}`)
            .addField(`💬Canali: ${texts+voices}`,`-testuali: ${texts}\n-vocali: ${voices}`)
            .addField('altro',`
            ⛓️Categorie: ${category}
            👁️‍🗨️Ruoli: ${guild.roles.cache.size}
            `)
        
        await interaction.reply({embeds:[embedServer]});
    }
}