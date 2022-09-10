const { Client, Message, MessageEmbed } = require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'delete-channel',
    description:'elimina un canale',
    permissions:'MANAGE_CHANNELS',
    cooldown:10,
    options:[
        {
            name: 'canale',
            description: 'Specifica il canale',
            type: 'CHANNEL',
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member;
        const canale=interaction.options.getChannel('canale')

        const embedDelete=new MessageEmbed()
            .setColor('BLACK')
            .setAuthor({
                name:'delete-channel',
                iconURL:author.user.displayAvatarURL()
            })

        if(!interaction.options){
            interaction.reply({embeds:[embedDelete
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} @Canale / this`)
            ],ephemeral:true});
        }else if(!canale){
            interaction.reply({embeds:[embedDelete
                .setDescription('Questo canale verrà eliminato tra 10 secondi')
            ]});
            setTimeout(()=>interaction.channel.delete(),10000);
        }else{
            canale.send({embeds:[embedDelete
                .setDescription('Il canale verrà eliminato tra 10 secondi')
            ]});
            interaction.reply({embeds:[embedDelete
                .setDescription(`<#${canale.id}> verrà eliminato tra 10 secondi`)
            ],ephemeral:true})
            setTimeout(()=>canale.delete(),10000);
        }
    }
}