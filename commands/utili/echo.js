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
        {
            name: 'canale',
            description: 'menziona un canale',
            type: 'CHANNEL'
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const canale=interaction.options.getChannel('canale')
        const stringa=interaction.options.getString('stringa')
        if(!stringa.length){
            return interaction.reply('Devi scrivere qualcosa',true);
        }

        if(canale){
            interaction.reply({content:`Messaggio inviato in ${canale}`})
            canale.send(stringa)
        }else{
            interaction.channel.send(stringa);
        }
    }
}