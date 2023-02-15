const { MessageEmbed } = require('discord.js');
const dayjs=require('dayjs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports = {
    name: 'network-add',
    description: 'aggiungi una network chat!',
    permissions:['MANAGE_GUILD'],
    cooldown:5,
    options:[
		{
			name: 'canale',
			description: 'Specifica il canale',
			type: 'CHANNEL',
            required:true,
		},
    ],
	/**
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(client,interaction){
        const embedNetwork=new MessageEmbed()
            .setColor('AQUA')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })
            .setTitle('Configurazione bot')

        const NetworkChatId=interaction.options.getChannel('canale').id
        await db.set(`NetworkChat_${interaction.guild.id}`,NetworkChatId)
		interaction.reply({embeds:[embedNetwork.setDescription(`✅ Nuova network chat in <#${NetworkChatId}>: Creata!`)]})
	},
};