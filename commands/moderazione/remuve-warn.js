const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'remuve-warn',
    description:'rimuove gli warn/avvisi di un utente',
    permissions:['MODERATE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente per togliergli TUTTE le warn',
            type: 'USER',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member;
        const target=interaction.options.getUser('utente')

        const embedWarn=new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor({
                name:'Warn',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID]`)
            ],ephemeral:true});
        }

        if(target===author){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('❌ Non puoi warnare te stesso')
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Devi specificare un utente da warnare')
            ],ephemeral:true});
        }

        await db.set(`warn_${interaction.guild.id}.user_${target.id}.numero`,0)
        
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedWarn
            .setDescription('**Hai eliminato tutte le warn**')
            .addField('Moderatore:',`<@${author.id}>`)
            .addField('Utente:',`<@${target.id}>`)]});
    }
}