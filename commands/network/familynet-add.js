const { MessageEmbed } = require('discord.js');
const dayjs=require('dayjs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports = {
    name: 'familynet-add',
    description: 'aggiungi una famiglia network!',
    permissions:['MANAGE_GUILD'],
    cooldown:5,
    options:[
        {
            name: 'server',
            description: 'Specifica server ID',
            type: 'STRING',
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

        var FamilyNet=await db.get(`NetworkFamily_${interaction.guild.id}`)
        var FId=interaction.options.getString('server')

        if(FamilyNet){
            var FN=await db.get(`NetworkFamily_${interaction.guild.id}`)
            FN.push(`${FId}`)
            await db.set(`NetworkFamily_${interaction.guild.id}`,FN)
        }else{
            await db.set(`NetworkFamily_${interaction.guild.id}`,[FId])
        }

        FamilyNet=[await db.get(`NetworkFamily_${interaction.guild.id}`)]

		interaction.reply({embeds:[embedNetwork.setDescription(`
        ✅ Nuova famiglia network (id server: ${interaction.guild.id}): Creata!
        Hai aggiunto: ${FId}
        Alri server: ${FamilyNet}
        `)]})
	},
};