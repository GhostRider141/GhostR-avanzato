const {MessageEmbed, Permissions} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'unban-role',
    description:'Sbanna con il ruolo un utente',
    permissions:['BAN_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da Sbannare',
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

        const embedUnBanRole=new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name:'Sbannato nel server',
                iconURL:author.user.displayAvatarURL()
            })
        if(!interaction.options){
            return interaction.channel.send({embeds:[embedUnBanRole
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID]`)
            ],ephemeral:true});
        }
        if(target===author){
            return interaction.channel.send({embeds:[embedUnBanRole
                .setDescription('Non puoi Sbannare nel server, te stesso')
            ],ephemeral:true});
        }
        if(!target){
            return interaction.channel.send({embeds:[embedUnBanRole
                .setDescription('Devi specificare un utente da Sbannare nel server')
            ],ephemeral:true});
        }

        const ruoloW=await db.get(`role-welcome-id_${interaction.guild.id}`)
        if(!ruoloW) return;
        else await target.roles.add(ruoloW);

        const ruolo=interaction.guild.roles.cache.get(await db.get('ban_role_id'))
        if(!ruolo) return;
        else target.roles.remove(ruolo)
        
        embedUnBanRole.setDescription('')
        embedUnBanRole.addField('**Moderatore**:',`<@${author.id}> `)
        embedUnBanRole.addField('**Utente**:',`<@${target.id}>`)
        const moderazione=client.channels.cache.get(await db.get(`mod_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('moderazione'));
        if(!moderazione) return;
        moderazione.send(`✅ <@${author.id}> richiesta effetuata!`)
        const log=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.get(c=>c.name.startsWith('log'));
        if(!log) return;
        log.send({embeds:[embedUnBanRole]});
    }
}