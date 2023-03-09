const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'timeout',
    description:'Mette in pausa un utente',
    permissions:['MODERATE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da timeouttare',
            type: 'USER',
            required: true
        },
        {
            name: 'tempo',
            description: 'Specifica il tempo',
            type: 'INTEGER',
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
        const tempo=interaction.options.getInteger('tempo')
        const motivo=interaction.options.getString('motivo')

        const embedTimeout=new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name:'Pausa (timeout)',
                iconURL:author.user.displayAvatarURL()
            })
        const embed=new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name:'Pausa (timeout)',
                iconURL:author.user.displayAvatarURL()
            })
        if(!interaction.options){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID] [tempo in minuti] (motivo)`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription('❌ Non puoi mettere in pausa te stesso')
            ],ephemeral:true});
        }
        if(target.permissions.has('ADMINISTRATOR')){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription('❌ Non puoi mettere in pausa un amministratore')
            ],ephemeral:true});
        }
        if(!target){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription('Devi specificare un utente da Mutare')
            ],ephemeral:true});
        }
        if(tempo.length===0){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription('Devi specificare il tempo della pausa')
            ],ephemeral:true});
        }

        target.timeout(tempo*60*1000,motivo)

        target.send({embeds:[embed
            .setDescription('Sei stato timeouttato (messo in pausa) !')
            .addField('**Moderatore**:',`<@${author.id}> `)
            .addField('**Tempo**:',`${tempo} minuti/o`)
            .addField('**Motivo**:',`${motivo}`)
        ]});

        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedTimeout
            .setDescription('')
            .addField('**Moderatore**:',`<@${author.id}> `)
            .addField('**Utente**:',`<@${target.id}>`)
            .addField('**Tempo**:',`${tempo} minuti/o`)
            .addField('**Motivo**:',`${motivo}`)]});
    }
}