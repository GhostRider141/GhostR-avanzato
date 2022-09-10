const {MessageEmbed, Permissions} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'ban-role',
    description:'Banna con il ruolo un utente',
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

        const embedBanRole=new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name:'Bannato nel server',
                iconURL:author.user.displayAvatarURL()
            })
        if(!interaction.options){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [motivo]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription('Non puoi bannare nel server, te stesso')
            ],ephemeral:true});
        }
        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription('Non puoi bannare nel server un amministratore')
            ],ephemeral:true});
        }
        if(!target){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription('Devi specificare un utente da bannare nel server')
            ],ephemeral:true});
        }
        if(motivo.length===0){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription('Devi specificare un motivo per bannare nel server')
            ],ephemeral:true});
        }

        var ruolo=interaction.guild.roles.cache.find(r=>r.name==='Banned')
        if(!ruolo){
            ruolo= await interaction.guild.roles.create({
                name:'Banned',
                color: 'DARKER_GREY',
                reason: 'Ruolo per bannare',
            })
            interaction.channel.send({embeds:[embedBanRole.setDescription(`**Il ruolo <@&${ruolo.id}> è stato creato**\nPer far funzionare il ruolo correttamente andare:\nsulle impostozioni del server-->ruoli e spostare il ruolo <@&${ruolo.id}> in alto`)]})
            ruolo.setPermissions([Permissions.FLAGS.SEND_MESSAGES])
        }
        ruolo=interaction.guild.roles.cache.find(r=>r.name==='Banned')

        interaction.guild.channels.cache.forEach((canale) => {
            canale.permissionOverwrites.edit(ruolo,{
                VIEW_CHANNEL:false,
                SEND_MESSAGES:false,
                SPEAK:false
            })              
        })
        const BanCategory=client.channels.cache.get(await db.get(`BanCategory_${interaction.guild.id}`))
        if(!BanCategory) return;
        BanCategory.permissionOverwrites.edit(ruolo,{
            VIEW_CHANNEL:true,
            SEND_MESSAGES:true
        }) 
        
        if(target.roles.cache.has(ruolo)){
            return interaction.channel.send({embeds:[embedBanRole
                .setDescription('Questo utente è già bannato nel server')
            ],ephemeral:true});
        }

        const roles = target.roles.cache.map(r=>r)
        await roles.forEach(r=>{
            if(r.id==='806573168340500480') return;
            else target.roles.remove(r)
        })
        target.roles.add(ruolo)
        await db.set('ban_role_id',ruolo.id)
        
        embedBanRole.setDescription('')
        embedBanRole.addField('**Moderatore**:',`<@${author.id}> `)
        embedBanRole.addField('**Utente**:',`<@${target.id}>`)
        embedBanRole.addField('**Motivo**:',`${motivo}`)
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`);
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedBanRole]});
    }
}