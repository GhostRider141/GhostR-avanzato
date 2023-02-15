const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'kick',
    description:'Kikka un utente dal server',
    permissions:['KICK_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da kikkare',
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
        const target=interaction.options.getUser('utente')
        const motivo=interaction.options.getString('motivo')

        const embedKick=new MessageEmbed()
            .setColor('RED')
            .setAuthor({
                name:'Kick',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedKick
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }

        if(target===author){
            return interaction.channel.send({embeds:[embedKick
                .setDescription('❌ Non puoi kickare te stesso')
            ],ephemeral:true});
        }
        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedKick
                .setDescription('❌ Non puoi kickare un amministratore')
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedKick
                .setDescription('Devi specificare un utente da kickare')
            ],ephemeral:true});
        }

        if(motivo.length===0){
            return interaction.channel.send({embeds:[embedKick
                .setDescription('Devi specificare un motivo per il kick')
            ],ephemeral:true});
        }

        if(!interaction.guild.members.cache.get(target.id).kickable){
            return interaction.channel.send({embeds:[embedKick
                .setDescription('❌ Non puoi kickare questo utente')
            ],ephemeral:true});
        }
        
        target.kick(motivo)

        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedKick
            .addField('Moderatore:',`<@${author.id}>`)
            .addField('Utente:',`<@${target.id}>`)
            .addField('Motivo:',`${motivo}`)]});
    }
}