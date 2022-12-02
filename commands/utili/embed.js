const{MessageEmbed}=require('discord.js');

module.exports={
    name:'embed',
    description:'Crea un messagio embed',
    cooldown:10,
    options:[
        {
            name: 'colore',
            description: 'colore embed',
            type: 'STRING',
            choices:[
                {
                    name:'AQUA',
                    value:'AQUA'
                },
                {
                    name:'BLUE',
                    value:'BLUE'
                },
                {
                    name:'GOLD',
                    value:'GOLD'
                },
                {
                    name:'GREEN',
                    value:'GREEN'
                },
                {
                    name:'GREY',
                    value:'GREY'
                },
                {
                    name:'NAVY',
                    value:'NAVY'
                },
                {
                    name:'ORANGE',
                    value:'ORANGE'
                },
                {
                    name:'PURPLE',
                    value:'PURPLE'
                },
                {
                    name:'RED',
                    value:'RED'
                },
                {
                    name:'WHITE',
                    value:'WHITE'
                },
                {
                    name:'YELLOW',
                    value:'YELLOW'
                },
                {
                    name:'FUCHSIA',
                    value:'FUCHSIA'
                },
                {
                    name:'DARK_AQUA',
                    value:'DARK_AQUA'
                },
                {
                    name:'DARK_BLUE',
                    value:'DARK_BLUE'
                },
                {
                    name:'DARK_BUT_NOT_BLACK',
                    value:'DARK_BUT_NOT_BLACK'
                },
                {
                    name:'DARK_GOLD',
                    value:'DARK_GOLD'
                },
                {
                    name:'DARK_GREEN',
                    value:'DARK_GREEN'
                },
                {
                    name:'DARK_GREY',
                    value:'DARK_GREY'
                },
                {
                    name:'DARK_NAVY',
                    value:'DARK_NAVY'
                },
                {
                    name:'DARK_ORANGE',
                    value:'DARK_ORANGE'
                },
                {
                    name:'DARK_PURPLE',
                    value:'DARK_PURPLE'
                },
                {
                    name:'DARK_RED',
                    value:'DARK_RED'
                },
                {
                    name:'RANDOM',
                    value:'RANDOM'
                },
                {
                    name:'DEFAULT',
                    value:'DEFAULT'
                },
            ]
        },
        {
            name: 'titolo',
            description: 'titolo embed',
            type: 'STRING',
        },
        {
            name: 'descrizione',
            description: 'descrizione embed',
            type: 'STRING',
        },
        {
            name: 'thumbnail',
            description: 'thumbnail embed',
            type: 'USER',
        },
        {
            name: 'imagine',
            description: 'imagine embed',
            type: 'STRING',
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){

        const colore=interaction.options.getString('colore')
        const titolo=interaction.options.getString('titolo')
        const descrizione=interaction.options.getString('descrizione')
        const thumbnail=interaction.options.getUser('thumbnail')
        const imagine=interaction.options.getString('imagine')

        const embed=new MessageEmbed()
        .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL()
        })
        .setFooter({
            text: `Richiesto da: ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL()
        })

        if(colore) embed.setColor(`${colore}`);
        if(titolo) embed.setTitle(`${titolo}`);
        if(descrizione) embed.setDescription(`${descrizione}`);
        if(thumbnail) embed.setThumbnail(thumbnail.displayAvatarURL());
        if(imagine) embed.setImage(`${imagine}`);else embed.setImage(interaction.user.displayAvatarURL());
        
        await interaction.reply({embeds:[embed]});
    }
}