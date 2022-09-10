const {MessageEmbed}=require('discord.js')

module.exports={
    name:'invito',
    description:'Invito del bot',
    cooldown:20,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embed=new MessageEmbed()
        .setColor('DARK_BLUE')
        .setTitle('Invito')
        .setAuthor({
            name:client.user.tag,
            iconURL:client.user.displayAvatarURL()
        })
        .setDescription('Questo è l\'invito del bot')
        .addField(client.user.username,'https://discord.com/api/oauth2/authorize?client_id=982014056783286312&permissions=8&scope=bot%20applications.commands')
        .setThumbnail(client.user.displayAvatarURL())
        .setImage(client.user.displayAvatarURL())
        .setURL('https://discord.com/api/oauth2/authorize?client_id=982014056783286312&permissions=8&scope=bot%20applications.commands')
        .setTimestamp()
        .setFooter({
            text:`Creato da ${client.user.username}.bot.it`,
            iconURL:client.user.displayAvatarURL()
        })

        interaction.reply({embeds:[embed],ephemeral:true})
    }
}