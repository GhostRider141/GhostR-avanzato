const messaggio=require('./messaggio');
const config=require('../config.json');
const {MessageEmbed}=require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports=(client)=>{
    //verifica
    client.guilds.cache.forEach((server)=>{
        //dati
        let idCanale=db.get(`verifica_${server.id}`)
        if(!idCanale) return
        const listaEmoji={
            '🔵':'verifica'
        };
        const canale=client.channels.cache.find(c=>c.id===idCanale)||client.channels.cache.find(c=>c.name=='verifica')
        if(!canale) return;

        //lista reazioni e messaggio
        const listaReazioni=[];
        const embed=new MessageEmbed()
        .setColor('DARK_BLUE')
        .setAuthor({
            name:client.user.username,
            iconURL:client.user.displayAvatarURL()
        })
        .setTitle('Verifica')
        .setDescription('Aggiungi la reazione per essere un utente verificato')
        for(const emoji in listaEmoji){
            const emojiFinale=emoji.includes('<')?client.emojis.cache.find(e=>e.name===emoji.split(':')[1]):emoji;
            listaReazioni.push(emojiFinale);
            embed.addField(`${emojiFinale}`,`${listaEmoji[emoji]}`);
        }
        //invio messaggio
        //messaggio(client,idCanale,embed,listaReazioni);
        //canale.send({content:'Verifica',embeds:[embed]})
        client.on('messageCreate',message=>{        
            if(message.content.startsWith('Verifica')&&message.channel.id==idCanale){
                for(let i=0;i<listaEmoji.size;i++){
                    message.edit({embeds:[embed]})
                    message.react(listaEmoji)
                }
            }
        })

        const gestisciReazioni=(reaction,user,aggiungi)=>{
            const reactionEmoji=reaction._emoji;
            const {guild}=reaction.message;
            const emoji=reactionEmoji.id===null?reactionEmoji.name:`<${reactionEmoji.name}:${reactionEmoji.id}>`;
            const nomeruolo=listaEmoji[emoji];
            if(!nomeruolo) return;
            const member=guild.members.cache.find(m=>m.id===user.id);
            const roleVerified=db.get(`role-verified_${server.id}`)
            const roleNoVerified=db.get(`role-NOverified_${server.id}`)
            if(!roleVerified&&!roleNoVerified) {
                canale.send(`Non hai configurato il ruolo "verifica" o "non verificato"\nGuarda su \`${prefix}botinfo\` nell'elenco dei ruoli in setup manuale`)
                setTimeout(()=>canale.bulkDelete(1, true),12000)
            }else {
                if(aggiungi){
                    member.roles.remove(roleNoVerified);
                    member.roles.add(roleVerified);
                }
                else{
                    member.roles.remove(roleVerified);
                    member.roles.add(roleNoVerified);
                }
            }
        }
        //eventi
        client.on('messageReactionAdd',(reaction,user)=>{
            if(reaction.message.channel.id===idCanale&&!user.bot){
                gestisciReazioni(reaction,user,true);
            }
        })

        client.on('messageReactionRemove',(reaction,user)=>{
            if(reaction.message.channel.id===idCanale&&!user.bot){
                gestisciReazioni(reaction,user,false);
            }
        })
    })

    //maggiorenni
    client.guilds.cache.forEach((server)=>{
        //dati
        let idCanale=db.get(`eta_${server.id}`)
        if(!idCanale) return
        const listaEmoji={
            '🔞':'maggiorenni'
        };
        const canale=server.channels.cache.find(c=>c.id===idCanale)

        //lista reazioni e messaggio
        const listaReazioni=[];
        const embed=new MessageEmbed()
        .setColor('NOT_QUITE_BLACK')
        .setAuthor({
            name:client.user.username,
            iconURL:client.user.displayAvatarURL()
        })
        .setTitle('Maggiorenni')
        .setDescription('Aggiungi la reazione se sei maggiorenni!')
        for(const emoji in listaEmoji){
            const emojiFinale=emoji.includes('<')?client.emojis.cache.find(e=>e.name===emoji.split(':')[1]):emoji;
            listaReazioni.push(emojiFinale);
            embed.addField(`${emojiFinale}`,`${listaEmoji[emoji]}`);
        }
        //invio messaggio
        //messaggio(client,idCanale,embed,listaReazioni);
        //canale.send({content:'Verifica',embeds:[embed]})
        client.on('messageCreate',message=>{        
            if(message.content.startsWith('Verifica')&&message.channel.id==idCanale){
                for(let i=0;i<listaEmoji.size;i++){
                    message.edit({embeds:[embed]})
                    message.react(listaEmoji)
                }
            }
        })

        const gestisciReazioni=(reaction,user,aggiungi)=>{
            const {guild}=reaction.message;
            const member=guild.members.cache.find(m=>m.id===user.id);
            const minorenne=db.get(`minorenne_${server.id}`)
            const maggiorenne=db.get(`maggiorenne_${server.id}`)
            if(!minorenne&&!maggiorenne) {
                canale.send(`Non hai configurato il ruolo "maggiorenne" o "minorenne"\nGuarda su \`${prefix}botinfo\` nell'elenco dei ruoli in setup manuale`)
                setTimeout(()=>canale.bulkDelete(1, true),12000)
            }else {
                if(aggiungi){
                    member.roles.remove(minorenne);
                    member.roles.add(maggiorenne);
                }
                else{
                    member.roles.remove(maggiorenne);
                    member.roles.add(minorenne);
                }
            }
        }
        //eventi
        client.on('messageReactionAdd',(reaction,user)=>{
            if(reaction.message.channel.id===idCanale&&!user.bot){
                gestisciReazioni(reaction,user,true);
            }
        })

        client.on('messageReactionRemove',(reaction,user)=>{
            if(reaction.message.channel.id===idCanale&&!user.bot){
                gestisciReazioni(reaction,user,false);
            }
        })
    })
}