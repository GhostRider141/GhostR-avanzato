const { MessageEmbed } = require('discord.js');
const dayjs=require('dayjs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports = {
    name: 'familynet-remove',
    description: 'rimuovi la famiglia network!',
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

        const FamilyNetId=await db.get(`NetworkFamily_${interaction.guild.id}`)
        if(FamilyNetId){
            interaction.reply({embeds:[embedNetwork.setDescription(`❗Famiglia network (id server: ${interaction.guild.id}): Cancellata!`)]})
            db.delete(`NetworkFamily_${interaction.guild.id}`)
        }else{
            interaction.reply({embeds:[embedNetwork.setDescription(`❌ Non puoi eliminare il gruppo network: non l'hai creato tu!`)]})
        }
	},
};