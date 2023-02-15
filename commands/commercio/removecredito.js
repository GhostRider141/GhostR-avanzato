const {MessageEmbed} = require("discord.js");
const fs=require('fs');
const { number } = require("mathjs");

module.exports={
    name:'revovecredito',
    description:'Toglie crediti ad un utente',
    permissions:['ADMINISTRATOR'],
    cooldown:10,
    options:[
        {
            name: 'utente',
            description: 'Specifica l\'utente per sapere le warn',
            type: 'USER',
            required: true
        },
        {
            name: 'credito',
            description: 'Specifica il credito',
            type: 'NUMBER',
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const author=interaction.member.id;
        const target=interaction.options.getUser('utente')
        const credito=interaction.options.getNumber('credito')
        let flag=-1

        const embedCommercio=new MessageEmbed()
        .setColor('GREEN')

        fs.readFile('./commands/commercio/creditoCommercio.txt','utf8',(err,dati)=>{
            if(err) throw err;

            dati=dati.split(',')
            let i,riga,crt
            for(i=0;i<dati.length;i++){
                riga=dati[i].split(':')
                if(riga[0]==`credito_${interaction.guild.id}_${target}`){
                    crt=riga[1]
                    flag=true
                    dati[i]=`credito_${interaction.guild.id}_${target}:${number(crt)-credito}`
                    fs.writeFile('./commands/commercio/creditoCommercio.txt',`${dati}`,(err)=>{
                        if(err) throw err;
                    })
                    break
                }
                else flag=false
            }

            if(flag==true)
                embedCommercio.setDescription(`**✅ Hai tolto a ${target}: ${crt} §**`)
            else if(flag==false)
                embedCommercio.setDescription(`⛔ credito non trovato!`)
            else
                embedCommercio.setDescription(`⛔ Errore ❌!`)
    
        interaction.reply({embeds:[embedCommercio],ephemeral:true});
        })
    }
}