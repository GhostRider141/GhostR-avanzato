const {Permissions,MessageEmbed}=require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'members',
    description:'Conteggio dei membri del server',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        var tot=interaction.guild.members.cache.size;
        var bot=interaction.guild.members.cache.filter(m => m.user.bot).size;
        var membri=tot-bot;

        const embed=new MessageEmbed()
            .setColor('RED')
            .addField('๐dati membri๐',`
            ๐ฟ|Membri Totali: ${tot}
            ๐ฅ|Utenti: ${membri}
            ๐ค|Bot: ${bot}
            `)
        interaction.reply({embeds:[embed]})
        
        const canale=client.channels.cache.get(db.get(`membri-tot_${interaction.guild.id}`));
        const canale2=client.channels.cache.get(db.get(`membri_${interaction.guild.id}`));
        const canale3=client.channels.cache.get(db.get(`bot_${interaction.guild.id}`));

        canale.setName(`๐ฟ|membri-totali: ${tot}`);
        canale2.setName(`๐ฅ|membri: ${membri}`);
        canale3.setName(`๐ค|bot: ${bot}`);
    }
}