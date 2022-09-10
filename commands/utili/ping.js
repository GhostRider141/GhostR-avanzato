const {MessageActionRow,MessageButton}=require('discord.js');
const config=require('../../config.json');
const { Client, Message } = require('discord.js');

module.exports={
    name:'ping',
    description:'Pong!',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        await interaction.reply({content:`> Pong! 🏓\n> \n> **Client:**\n> \`${client.ws.ping}ms\`\n> **API messaggio:**\n> \`${interaction.createdTimestamp-interaction.createdTimestamp}ms\``})
    }
}