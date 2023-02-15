const {MessageEmbed} = require("discord.js");
const fs=require('fs');

module.exports={
    name:'credito',
    description:'Crediti di un utente',
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente per sapere il suo commercio',
            type: 'USER',
            required: true
        },
        {
            name: 'crea',
            description: 'Crea il commercio di un utente',
            type: 'BOOLEAN'
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const target=interaction.options.getUser('utente')
        const crea=interaction.options.getBoolean('crea');
        let credito
        let flag=-1

        const embedCommercio=new MessageEmbed()
        .setColor('GREEN')

        fs.readFile('./commands/commercio/creditoCommercio.txt','utf8',(err,dati)=>{
            if(err) throw err;

            dati=dati.split(',')
            let i,riga

            if(crea&&crea==true){
                fs.appendFile('./commands/commercio/creditoCommercio.txt',
                    `,credito_${interaction.guild.id}_${target}:0`, (err)=>{
                       if(err) throw err;
                })
            }
            
            for(i=0;i<dati.length;i++){
                riga=dati[i].split(':')
                if(riga[0]==`credito_${interaction.guild.id}_${target}`){
                    credito=riga[1]
                    flag=true
                    break
                }
                else{
                    flag=false
                }
            }

            if(flag==true)
                embedCommercio.setDescription(`**Credito di ${target}: ${credito} §**`)
            else if(flag==false)
                embedCommercio.setDescription(`⛔ credito non trovato!\nCredito di ${target} creato ✅`)
            else
                embedCommercio.setDescription(`⛔ Errore ❌!`)
    
            interaction.reply({embeds:[embedCommercio]});
        })
    }
} 