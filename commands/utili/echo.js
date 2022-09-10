const { Client, Message } = require('discord.js');

module.exports={
    name:'echo',
    description:'ecoo,ecoo...',
    options:[
        {
            name: 'stringa',
            description: 'Scrivi ciò che vuoi!',
            type: 'STRING',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const stringa=interaction.options.getString('stringa')
        if(!stringa.length){
            return interaction.reply('Devi scrivere qualcosa',true);
        }
        interaction.reply({content:stringa});
    }
}