const{MessageEmbed, MessageActionRow,MessageButton}=require('discord.js');
const fs=require('fs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'help',
    description:'Informazioni dei comandi del bot',
    cooldown:5,
    options:[
        {
            name: 'comandi',
            description: 'help dei comandi',
            type: 'STRING',
            require:true,
            choices:[
                {
                    name:'util',
                    value:'util'
                },
                {
                    name:'info',
                    value:'info'
                },
                {
                    name:'mod',
                    value:'mod'
                },
                {
                    name:'members',
                    value:'members'
                },
            ]
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embedhelp=new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('**HELP**')

        const help=interaction.options.getString('comandi')
        if(help=='util'){
            let file;
            const fileComandiUtili=fs.readdirSync(`./commands/utili`).filter(file=>file.endsWith('.js'));
            fileComandiUtili.map((c)=>{
                file=require(`../utili/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Comandi utili:**')
        }else if(help=='info'){
            let file;
            const fileComandiUtili=fs.readdirSync(`./commands/info`).filter(file=>file.endsWith('.js'));
            fileComandiUtili.map((c)=>{
                file=require(`../info/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Informazioni:**')
        }else if(help=='mod'){
            let file;
            const fileComandiUtili=fs.readdirSync(`./commands/moderazione`).filter(file=>file.endsWith('.js'));
            fileComandiUtili.map((c)=>{
                file=require(`../moderazione/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Moderazione:**')
        }else if(help=='members'){
            embedhelp.addField('Conteggio membri',`
            per resettare fai: \`${prefix}config members none\`
            per settare il canale per i membri totali fai: \`${prefix}config members membri (id canale)\`
            per settare il canale per i utenti fai: \`${prefix}config members utenti (id canale)\`
            per settare il canale per i bot fai: \`${prefix}config members bot (id canale)\`
            `)
        }else{
            embedhelp.addField('**Lista dei comandi del bot**',`
            \`config help\`: aiuto per configurare il bot [ MANUALE ]
            \`${this.name} util\`: per i comandi utility
            \`${this.name} info\`: per i comandi di informazioni
            \`${this.name} mod\`: per i comandi di moderazione
            `)
        }
        return await interaction.reply({embeds:[embedhelp]})
    }
}
