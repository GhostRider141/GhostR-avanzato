const dayjs=require('dayjs');
const{MessageEmbed}=require('discord.js');

module.exports={
    name:'user',
    description:'Informazioni di un utente (menzione)',
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente',
            type: 'USER'
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
            const member=interaction.options.getUser('utente')||interaction.member
            const embedUser=new MessageEmbed()
                .setColor('GOLD')
                .setTitle('Informazioni utente')
                .setThumbnail(member.user.displayAvatarURL())
                .addField('ID: ',`${member.user.id}`)
                .addField('🔤Username: ',`${member.user.username}#${member.user.discriminator}`)
                .addField('🔡Nickname: ',`${member.nickname}`)
                .addField('🟣Iscrizione a Discord: ',`\`${dayjs(member.user.createdAt).format('DD/MM/YYYY')}\`\n`)
                .addField('📥Ingresso nel Server: ',`\`${dayjs(member.joinedAt).format('DD/MM/YYYY')}\``)
            await interaction.reply({embeds:[embedUser]});
    }
}