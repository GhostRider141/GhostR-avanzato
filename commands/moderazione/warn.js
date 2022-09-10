const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'warn',
    description:'warna/avvisa un utente',
    permissions:['MODERATE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da warnare',
            type: 'USER',
            required: true
        },
        {
            name: 'motivo',
            description: 'Specifica il motivo',
            type: 'STRING',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member;
        const target=interaction.options.getMember('utente')
        const motivo=interaction.options.getString('motivo')

        const embedWarn=new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor({
                name:'Warn',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }

        if(target===author){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Non puoi warnare te stesso')
            ],ephemeral:true});
        }
        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Non puoi warnare un amministratore')
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Devi specificare un utente da warnare')
            ],ephemeral:true});
        }

        if(motivo.length===0){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Devi specificare un motivo per il warn')
            ],ephemeral:true});
        }

        await db.set(`warn_${interaction.guild.id}.user_${target.id}.motivo`,motivo)
        await db.add(`warn_${interaction.guild.id}.user_${target.id}.numero`,1)
        
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedWarn
            .addField('Moderatore:',`<@${author.id}>`)
            .addField('Utente:',`<@${target.id}>`)
            .addField('Motivo:',`${motivo}`)]});
    }
}