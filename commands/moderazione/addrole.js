const { MessageEmbed } = require('discord.js');

module.exports={
    name:'addrole',
    description:'aggiunge un ruolo da un utente',
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
                .setDescription('❌ Non puoi metterti un ruolo a te stesso')
            ],ephemeral:true});
        }
        
        if(!target.roles.cache.find(r=>r==ruolo)) target.roles.add(ruolo)
        else return interaction.reply({embeds:[embedRole
            .setDescription('❌ Questo utente ha già il ruolo')
        ],ephemeral:true});

        interaction.reply({embeds:[embedRole
            .setDescription(`✅ Hai aggiunto il ruolo ${ruolo} a ${target}`)
        ],ephemeral:true});
    }
}