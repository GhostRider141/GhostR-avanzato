const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'unmute',
    description:'Smuta un utente dal server',
    permissions:['MUTE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da Smutare',
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

        const embedUnmute=new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({
                name:'Smutato',
                iconURL:author.user.displayAvatarURL()
            })
        if(!interaction.options){
            return interaction.channel.send({embeds:[embedUnmute
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedUnmute
                .setDescription('❌ Non puoi bannare te stesso')
            ],ephemeral:true});
        }
        if(!target){
            return interaction.channel.send({embeds:[embedUnmute
                .setDescription('Devi specificare un utente da Smutare')
            ],ephemeral:true});
        }

        var ruolo=interaction.guild.roles.cache.find(r=>r.name==='Muted')
        target.roles.remove(ruolo)
        await db.delete('mute')
        
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedUnmute
            .addField('**Moderatore**:',`<@${author.id}> `)
            .addField('**Utente**:',`<@${target.id}>`)]});
    }
}