const { MessageEmbed } = require('discord.js');
const dayjs=require('dayjs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports = {
    name: 'network-remove',
    description: 'rimuovi la network chat!',
    permissions:['MANAGE_GUILD'],
    cooldown:5,
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
			
        const NetworkChatId=client.channels.cache.get(await db.get(`NetworkChat_${interaction.guild.id}`))
		interaction.reply({embeds:[embedNetwork.setDescription(`❗Network chat in ${NetworkChatId}: Cancellata!`)]})
        db.delete(`NetworkChat_${interaction.guild.id}`)
	},
};