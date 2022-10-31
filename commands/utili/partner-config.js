const {MessageEmbed, Client, Modal, MessageActionRow, TextInputComponent } = require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'partner',
    description:'Configurazione Partnership',
    options:[
        {
            name: 'help',
            description: 'aiuto per la configurazione',
            type: 'SUB_COMMAND',
        },
        {
            name: 'partner-here',
            description: 'congigura il ping here per la partership',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'membri',
                    description: 'Specifica il numero dei membri',
                    type: 'INTEGER',
                },
            ],
        },
        {
            name: 'partner-everyone',
            description: 'congigura il ping everyone per la partership',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'membri',
                    description: 'Specifica il numero dei membri',
                    type: 'INTEGER',
                },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embedConfig=new MessageEmbed()
            .setColor('GREYPLE')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })
            .setTitle('Configurazione bot')
            .setThumbnail(interaction.guild.iconURL())

        if(interaction.options.getSubcommand()==='help'){
            embedConfig.setDescription(this.description)
            embedConfig.addFields(
                {
                    name:`Utilizzo comandi`,
                    value:`\`${this.name} (comando)\`: resetta la configurazione\n\`${this.name} (comando) [opzioni] (valore)\`: configura il campo`
                },
                {
                    name:`\u200b`,
                    value:`**setting**`
                },
                {
                    name:`\`${this.name} partner-here (numero membri)\``,
                    value:`per configurare il ping di here per la partnership`
                },
                {
                    name:`\`${this.name} partner-everyone (numero membri)\``,
                    value:`per configurare il ping di everyone per la partnership`
                }
            )
            interaction.reply({embeds:[embedConfig],components:[]})
        }
        //setting
        let herePartner=await db.get(`hereP_${interaction.guild.id}`)
        let everyonePartner=await db.get(`everyoneP_${interaction.guild.id}`)
        if(interaction.options.getSubcommand()==='partner-here') {
            var here=interaction.options.getInteger('membri')
            if(!here){
                await db.delete(`hereP_${interaction.guild.id}`)
                embedConfig.setDescription('Ho resettato il setting del ping here impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var here=interaction.options.getInteger('membri')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi settare il ping here devi mettere il numero dei membri che il server deve avere per esseere pingato')],components:[],ephemeral:true})
                
                herePartner=await db.set(`hereP_${interaction.guild.id}`,here)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ping here: ${herePartner}`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='partner-everyone') {
            var everyone=interaction.options.getInteger('membri')
            if(!everyone){
                await db.delete(`everyoneP_${interaction.guild.id}`)
                embedConfig.setDescription('Ho resettato il setting del ping everyone impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var everyone=interaction.options.getInteger('membri')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi settare il ping everyone devi mettere il numero dei membri che il server deve avere per esseere pingato')],components:[],ephemeral:true})
                
                everyonePartner=await db.set(`everyoneP_${interaction.guild.id}`,everyone)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ping here: ${everyonePartner}`)],components:[],ephemeral:true});
            }
        }
    }
}