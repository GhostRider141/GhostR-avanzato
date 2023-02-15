const { MessageEmbed } = require('discord.js');

module.exports={
    name:'removerole',
    description:'rimuove un ruolo da un utente',
    permissions:['MODERATE_MEMBERS'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente da timeouttare',
            type: 'USER',
            required: true
        },
        {
            name: 'ruolo',
            description: 'Specifica l\'utente da timeouttare',
            type: 'ROLE',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member;
        const target=interaction.guild.members.cache.find(m=>m.id==interaction.options.getUser('utente').id)
        const ruolo=interaction.options.getRole('ruolo')

        const embedRole=new MessageEmbed()
        .setColor('DEFAULT')
        .setTitle('Ruolo')
        
        if(target===author){
            return interaction.channel.send({embeds:[embedTimeout
                .setDescription('❌ Non puoi toglirti un ruolo a te stesso')
            ],ephemeral:true});
        }
        
        if(target.roles.cache.find(r=>r==ruolo)) target.roles.remove(ruolo)
        else return interaction.reply({embeds:[embedRole
            .setDescription('❌ A questo utente manca già  il ruolo')
        ],ephemeral:true});

        interaction.reply({embeds:[embedRole
            .setDescription(`✅ Hai tolto il ruolo ${ruolo} a ${target}`)
        ],ephemeral:true});
    }
}