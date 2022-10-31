const { MessageEmbed } = require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports=(client)=>{
    client.on('messageCreate',async message=>{
        //network chat gruppi
        const network=await db.get(`NetworkChat_${message.guild.id}`)
        const family=await db.get(`NetworkFamily_${message.guild.id}`)
        if(family){
            if(message.channel.id==network){
                if(message.content){
                    family.forEach(async(guild)=>{
                        const canale=client.channels.cache.get(await db.get(`NetworkChat_${guild}`))
                        const NetworkChatEmbed=new MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setAuthor({
                            name: message.member.user.tag+'  '+'♦'+'  '+message.guild.name,
                            iconURL: message.member.user.avatarURL({dynamic: true})
                        })
                        .setDescription(`${message.content}`)
                        
                        if(canale&&canale.id!=network){
                            canale.send({embeds:[NetworkChatEmbed]})
                        }
                    })
                }
            }
        }else{
            //network chat globale
            const network=await db.get(`NetworkChat_${message.guild.id}`)
            if(message.channel.id==network){
                if(message.content){
                    client.guilds.cache.forEach(async(guild)=>{
                        const canale=client.channels.cache.get(await db.get(`NetworkChat_${guild.id}`))
                        const NetworkChatEmbed=new MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setAuthor({
                            name: message.member.user.tag+'  '+'♦'+'  '+message.guild.name,
                            iconURL: message.member.user.avatarURL({dynamic: true})
                        })
                        .setDescription(`${message.content}`)
                        
                        if(canale&&await db.get(`NetworkChat_${guild.id}`)!=network){
                            canale.send({embeds:[NetworkChatEmbed]})
                        }
                    })
                }
            }
        }
    })
}