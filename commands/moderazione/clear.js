const { MessageEmbed } = require('discord.js');
const wait=require('util').promisify(setTimeout);
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'clear',
    description:'Cancella i messaggi',
    permissions:'MANAGE_MESSAGES',
    cooldown:10,
    options:[
        {
            name: 'numero',
            description: 'Specifica il motivo',
            type: 'INTEGER',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction,args){
        const author=interaction.member;
        const count=interaction.options.getInteger('numero')

        const embedClear=new MessageEmbed()
            .setColor('BLACK')
            .setAuthor({
                name:'clear',
                iconURL:author.user.displayAvatarURL()
            })

        if(!count){
            return interaction.reply({embeds:[embedClear
                .setDescription(`${this.description}`)
                .addField('Utilizzo comando',`${this.name} [numero messaggi]`)
            ],ephemeral:true});
        }
        if(count>100){
            interaction.channel.bulkDelete(100,true);
            interaction.reply({embeds:[embedClear
                .setDescription('Hai eliminato il massimo di messaggi!')
            ],ephemeral:true});
        }
        else{
            interaction.channel.bulkDelete(count, true)
            interaction.reply({embeds:[embedClear
                .setDescription(`Hai eliminato ${count} messaggi`)
            ],ephemeral:true})
        }
    }
}