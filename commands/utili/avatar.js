const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Ottieni l\'avatar di un utente',
    cooldown:5,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da bannare',
            type: 'USER'
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction) {
        const target=interaction.options.getUser('utente')||interaction.member
        const requester=interaction.user

        const avatarEmbed = new MessageEmbed()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL()
            })
            .setTitle(`L'avatar di \`\`\`${target.tag}\`\`\``)
            .setImage(target.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter({
                text: `Richiesto da: ${requester.tag}`,
                iconURL: requester.displayAvatarURL()
            })
            .setColor(target.displayHexColor)

        await interaction.reply({embeds:[avatarEmbed]});
    }
}