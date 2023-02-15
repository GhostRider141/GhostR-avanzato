const {MessageEmbed, Permissions} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'mute',
    description:'Muta un utente',
    permissions:['MUTE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da mutare',
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

        const embedMute=new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name:'Mutato',
                iconURL:author.user.displayAvatarURL()
            })
        if(!interaction.options){
            return interaction.channel.send({embeds:[embedMute
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedMute
                .setDescription('❌ Non puoi mutare te stesso')
            ],ephemeral:true});
        }
        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedMute
                .setDescription('❌ Non puoi mutare un amministratore')
            ],ephemeral:true});
        }
        if(!target){
            return interaction.channel.send({embeds:[embedMute
                .setDescription('Devi specificare un utente da Mutare')
            ],ephemeral:true});
        }
        if(motivo.length===0){
            return interaction.channel.send({embeds:[embedMute
                .setDescription('Devi specificare un motivo per Mutare')
            ],ephemeral:true});
        }

        var ruolo=interaction.guild.roles.cache.find(r=>r.name==='Muted')
        if(!ruolo){
            ruolo= await interaction.guild.roles.create({
                name:'Muted',
                color: 'DARKER_GREY',
                reason: 'Ruolo per mutare',
            })
            interaction.channel.send({embeds:[embedMute.setDescription(`**Il ruolo <@&${ruolo.id}> è stato creato**\nPer far funzionare il ruolo correttamente andare:\nsulle impostozioni del server-->ruoli e spostare il ruolo <@&${ruolo.id}> in alto`)]})
            ruolo.setPermissions([Permissions.FLAGS.VIEW_CHANNEL])
        }
        ruolo=interaction.guild.roles.cache.find(r=>r.name==='Muted')

        interaction.guild.channels.cache.forEach((canale) => {
            canale.permissionOverwrites.edit(ruolo,{
                SEND_MESSAGES:false,
                SPEAK:false
            })              
        })
        
        if(target.roles.cache.has(ruolo)){
            return interaction.channel.send({embeds:[embedMute
                .setDescription('Questo utente è già mutato')
            ],ephemeral:true});
        }

        target.roles.add(ruolo)
        await db.set('mute_id',target.user.id)
        await db.set('mute_id_reason',motivo)
        
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedMute
            .setDescription('')
            .addField('**Moderatore**:',`<@${author.id}> `)
            .addField('**Utente**:',`<@${target.id}>`)
            .addField('**Motivo**:',`${motivo}`)]});
    }
}