const{MessageEmbed, MessageActionRow,MessageButton}=require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'counting',
    description:'Gioco del conteggio',
    cooldown:5,
    options:[
        {
            name: 'comandi',
            description: 'help del gioco',
            type: 'STRING',
            require:true,
            choices:[
                {
                    name:'start',
                    value:'start'
                },
                {
                    name:'stop',
                    value:'stop'
                },
                {
                    name:'help',
                    value:'help'
                },
            ]
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        canaleCounting=await db.get(`counting_${interaction.guild.id}`)
        if(!canaleCounting) return interaction.reply({content:'non hai settato il canale!',ephemeral:true})
        if(interaction.channel.id==canaleCounting){
            const embedCouter=new MessageEmbed()
                .setColor('DARK_GREEN')
                .setTitle('**Conteggio**')
                .setAuthor({
                    name:client.user.username,
                    iconURL:client.user.displayAvatarURL()
                })
            
            const count=interaction.options.getString('comandi')
            if(count=='start'){
                interaction.reply({embeds:[embedCouter
                    .setDescription('Ognuno deve dire il numero corretto che segue!')
                    .addField('! INIZIO !','Iniziamo a contare!\nVediamo dove arriviamo!')
                ]})
            }
            if(count=='stop'){
                interaction.reply({embeds:[embedCouter
                    .setDescription('')
                    .addField('! FINE !',`**Vincitore:**\n<@${await db.get('counting_autore')}>`)
                ]})
            }else if(count=='help'){
                interaction.reply({embeds:[embedCouter
                    .addField('Info / Regole del gioco',`
                    • il primo numero da scrivere è: 1
                    • ogni utente deve scrivere il numero successivo
                    • lo stesso utente non può scrivere più di un numero e non può andare avanti da solo
                    `)
                ]})
            }else{
                interaction.reply({embeds:[embedCouter
                    .addField('Gioco Conteggio',`
                    per settare il canale per il conteggio fai: \`/config counting (menzione un canale)\`
                    per avere le regole del gioco fai: \`/counting help\`
                    per il messaggio di inizio del gioco fai: \`/counting start\`
                    per il messaggio di fine del gioco con il vincitore fai: \`/counting stop\`
                    `)
                ]})
            }
        }else interaction.reply({content:`canale sbagliato, vai in: <#${canaleCounting}>`,ephemeral:true})
    }
}