/* const aggiungiReazioni=(message,reazioni)=>{
    if(reazioni.length>0){
        message.react(reazioni[0]);
        reazioni.shift();

        if(reazioni.length>0){
            setTimeout(()=>aggiungiReazioni(message,reazioni),400);
        }
    }
}
const {MessageEmbed}=require('discord.js')

module.exports=async (client, idCanale, embed, reazioni=[]) => {
    const canale = await client.channels.cache.get(idCanale);

    canale.messages.fetch().then(messages => {
        if (messages.size === 0) {
            canale.send({embeds:[embed]}).then(message=>{
                aggiungiReazioni(message,reazioni); 
            });
        } else {
            for(const message of messages){
                message[1].edit({embeds:[embed]})
                //message[1].reactions.removeAll()
                aggiungiReazioni(message[1],reazioni);
            }
        }
    });
} */