const {MessageEmbed} = require("discord.js");
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'warnings',
    description:'informazioni degli warn/avvisi di un utente',
    permissions:['ADMINISTRATOR'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente per sapere le warn',
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
                name:'Warn totali',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [@utente / user ID]`)
            ],ephemeral:true});
        }

        if(!target){
            return interaction.channel.send({embeds:[embedWarn
                .setDescription('Devi specificare un utente per sapere le warn')
            ],ephemeral:true});
        }
        
        interaction.reply({embeds:[embedWarn
            .addField('Utente:',`<@${target.id}>`)
            .addField('Numero:',`${await db.get(`warn_${interaction.guild.id}.user_${target.id}.numero`)}`)
        ],ephemeral:true});
    }
}