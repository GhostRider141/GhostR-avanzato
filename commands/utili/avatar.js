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
            .setFooter({
                text: `Richiesto da: ${requester.tag}`,
                iconURL: requester.displayAvatarURL()
            })

            if(!target){
                interaction.reply({ embeds: [avatarEmbed
                    .setTitle(`L'avatar di \`\`\`${target.username}\`\`\``)
                    .setImage(interaction.guild.members.cache.get(target.id).displayAvatarURL({ dynamic: true, size: 256 }))
                    .setColor(target.displayHexColor)
                ]})
            }else{
                const targett = interaction.guild.members.cache.get(target.id)
                interaction.reply({ embeds: [avatarEmbed
                    .setTitle(`L'avatar di \`\`\`${targett.user.tag}\`\`\``)
                    .setImage(targett.displayAvatarURL({ dynamic: true, size: 256 }))
                    .setColor(targett.displayHexColor)
                ]})
            }
    }
}