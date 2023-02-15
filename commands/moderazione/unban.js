const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'unban',
    description:'Sbanna un utente dal server',
    permissions:['BAN_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'id',
            description: 'Specifica l\'ID del utente da Sbannare',
            type: 'INTEGER',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member;
        const target=interaction.options.getInteger('id')

        const embedUnban=new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({
                name:'Sban',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedUnban
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('❌ Non puoi sbannare te stesso')
            ],ephemeral:true});
        }

        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('❌ Non puoi sbannare un amministratore')
            ],ephemeral:true});
        }

        if(!interaction.guild.members.cache.get(target.id).bannable){
            return interaction.channel.send({embeds:[embedBan
                .setDescription('❌ Non puoi sbannare questo utente')
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedUnban
                .setDescription('Devi specificare un utente da Sbannare con l\'id')
            ],ephemeral:true});
        }
        
        interaction.guild.members.unban(target)
        
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedUnban
            .addField('**Moderatore**:',`<@${author.id}> `)
            .addField('**Utente**:',`(${target})`)]});
        
    }
}