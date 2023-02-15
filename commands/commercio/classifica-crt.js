const {MessageEmbed} = require("discord.js");
const fs=require('fs');
const { number } = require("mathjs");

module.exports={
    name:'classifica-crt',
    description:'Classifica crediti utenti',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embedCommercio=new MessageEmbed()
        .setColor('DARK_GREEN')
        .setTitle(`__Classifica Crediti__`)

        fs.readFile('./commands/commercio/creditoCommercio.txt','utf8',(err,dati)=>{
            if(err) throw err;

            let i,l,riga,utente,max=0,classifica=[],pos,c,clc='',num=0
            dati=dati.split(',')

            for(l=0;l<dati.length+num;l++){
                pos=0
                for(i=0;i<dati.length;i++){
                    riga=dati[i].split(':')
                    if(number(riga[1])>number(max)){
                        max=riga[1]
                        pos=i
                    }
                }
                max=0
                
                riga=dati[pos].split(':')
                utente=riga[0].split(`credito_${interaction.guild.id}_`)
                classifica.push(`${utente[1]} : \`${riga[1]}\``)

                dati.splice(pos,1)
                num++
            }

            for(c=0;c<classifica.length;c++){
                clc=clc+`**# ${c+1}° ${classifica[c]}**\n`
            }
            embedCommercio.setDescription(`${clc}`)
    
            interaction.reply({embeds:[embedCommercio]});
        })
    }
} 