const {MessageEmbed} = require("discord.js");
const { Client, Message } = require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'ban',
    description:'Banna un utente dal server',
    permissions:['BAN_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da bannare',
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

        const embedBan=new MessageEmbed()
            .setColor('RED')
            .setAuthor({
                name:'Ban',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedBan
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('Non puoi bannare te stesso')
            ],ephemeral:true});
        }

        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('Non puoi bannare un amministratore')
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('Devi specificare un utente da Bannare')
            ],ephemeral:true});
        }

        if(motivo.length===0){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('Devi specificare un motivo per Ban')
            ],ephemeral:true});
        }

        if(!interaction.guild.members.cache.get(target.id).bannable){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('Non puoi bannare questo utente')
            ],ephemeral:true});
        }
        
        target.ban({reason:motivo})

        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedBan
            .addField('Moderatore:',`<@${author.id}> `)
            .addField('Utente:',`<@${target.id}>  ( ${target.id} )`)
            .addField('Motivo:',`${motivo}`)]});
    }
}