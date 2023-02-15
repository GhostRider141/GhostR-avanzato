const config=require('../../config.json');
const{MessageEmbed,MessageActionRow,MessageButton, User}=require('discord.js');
const { Client, Message } = require('discord.js');
const wait=require('util').promisify(setTimeout);
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'ticket',
    description:'Crea un pannello per creare un ticket',
    cooldown:10,
    options:[
        {
            name: 'pannelli',
            description: 'help del ticket',
            type: 'STRING',
            required:true,
            choices:[
                {
                    name:'support',
                    value:'support'
                },
                {
                    name:'partnership',
                    value:'partnership'
                },
                {
                    name:'signal',
                    value:'signal'
                },
            ]
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        if(interaction.channel.id != await db.get(`ticket_${interaction.guild.id}`)) return interaction.reply('Canale sbagliato',true)
        const help=interaction.options.getString('pannelli')

        //invio messagio nel ticket
        if(help=='support'){
            const embedTicketNew=new MessageEmbed()
                .setTitle('Ticket per il SUPPORTO')
                .setDescription(`Clicca questo bottone per risolvere il tuo problema !`)
                .setColor('YELLOW')
                .setFooter({
                    text:`Creato da ${client.user.username}.ticket.it`,
                    iconURL:interaction.guild.iconURL()
                })
            const tiketNew=new MessageActionRow()
                .addComponents(
                new MessageButton()
                .setCustomId('support')
                .setEmoji('📩')
                .setLabel(' Supporto')
                .setStyle('SECONDARY')
            )
            await interaction.reply({embeds:[embedTicketNew],components:[tiketNew]});
        }else if(help=='partnership'){
            const embedTicketNew=new MessageEmbed()
                .setTitle('Ticket per una PARTNERSHIP')
                .setDescription(`Clicca questo bottone per fare una Partnership con noi !`)
                .setColor('GREEN')
                .setFooter({
                    text:`Ticket creato da ${client.user.username}.ticket.it`,
                    iconURL:interaction.guild.iconURL()
                })
            const tiketNew=new MessageActionRow()
                .addComponents(
                new MessageButton()
                    .setCustomId('partnership')
                    .setEmoji('📩')
                    .setLabel(' Partnership')
                    .setStyle('SUCCESS')
            )
            await interaction.reply({embeds:[embedTicketNew],components:[tiketNew]});
        }else if(help=='signal'){
            const embedTicketNew=new MessageEmbed()
                .setTitle('Ticket per una SEGNALAZIONE')
                .setDescription(`Clicca questo bottone per fare una Segnalazione !`)
                .setColor('RED')
                .setFooter({
                    text:`Ticket creato da ${client.user.username}.ticket.it`,
                    iconURL:interaction.guild.iconURL()
                })
            const tiketNew=new MessageActionRow()
                .addComponents(
                new MessageButton()
                    .setCustomId('signal')
                    .setEmoji('📩')
                    .setLabel(' Segnalazione')
                    .setStyle('DANGER')
            )
            await interaction.reply({embeds:[embedTicketNew],components:[tiketNew]});
        }else{
            const embed=new MessageEmbed()
            .setColor('GREYPLE')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })
            .setDescription(this.description)
            .addField('Utilizzo comando',`${this.name} (nome pannello del ticket: support/partnership/signal)`)

            interaction.reply({embeds:[embed],ephemeral:true})
            return;
        }
    }
}