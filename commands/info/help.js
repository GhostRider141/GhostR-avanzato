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
                {
                    name:'network',
                    value:'network'
                },
                {
                    name:'commercio',
                    value:'commercio'
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
            const fileComandiInfo=fs.readdirSync(`./commands/info`).filter(file=>file.endsWith('.js'));
            fileComandiInfo.map((c)=>{
                file=require(`../info/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Informazioni:**')
        }else if(help=='mod'){
            let file;
            const fileComandiMod=fs.readdirSync(`./commands/moderazione`).filter(file=>file.endsWith('.js'));
            fileComandiMod.map((c)=>{
                file=require(`../moderazione/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Moderazione:**')
        }else if(help=='network'){
            let file;
            const fileComandiMod=fs.readdirSync(`./commands/network`).filter(file=>file.endsWith('.js'));
            fileComandiMod.map((c)=>{
                file=require(`../network/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription('**Network chat:**')
        }else if(help=='commercio'){
            let file;
            const fileComandiMod=fs.readdirSync(`./commands/commercio`).filter(file=>file.endsWith('.js'));
            fileComandiMod.map((c)=>{
                file=require(`../commercio/${c}`)
                embedhelp.addField(`\`${file.name}\` :`,`${file.description}`)
            })
            embedhelp.setDescription(`**Commercio:**
            per creare un nuovo "commercio" fare: \`/credito utente [crea:true]\`
            `)
        }else if(help=='members'){
            embedhelp.addField('Conteggio membri',`
            per resettare fai: \`/config members-(bot,membri,utenti)\`
            per settare il canale per i membri totali fai: \`/config members-membri (id canale)\`
            per settare il canale per i utenti fai: \`/config members-utenti (id canale)\`
            per settare il canale per i bot fai: \`/config members-bot (id canale)\`
            `)
        }else{
            embedhelp.addField('**Lista dei comandi del bot**',`
            \`config help\`: aiuto per configurare il bot [ MANUALE ]
            \`${this.name} util\`: per i comandi utility
            \`${this.name} info\`: per i comandi di informazioni
            \`${this.name} mod\`: per i comandi di moderazione
            \`${this.name} commercio\`: per i comandi del commercio (crediti/punti)
            `)
        }
        return await interaction.reply({embeds:[embedhelp]})
    }
}
