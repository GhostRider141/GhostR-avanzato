const{MessageEmbed}=require('discord.js');

module.exports={
    name:'roles',
    description:'Elenco di ruoli del server',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const roles=interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(r=>`@${r.name}    UTENTI: ${r.members.size}`)
        let q=roles.length

        if(q>72){
            let c=72
            let i=0;
            let m
            for(m=0;m<q/72;m++){
                let role=[]
                for(i;i<c;i++){
                    if(i!=0)
                        role.push('\n')
                    role.push(roles[i])
                    if(i!=roles.length-1)
                        role.push('\n')
                }
                i=c;
                let cc=q-c
                c=c+cc;
                await interaction.reply(`**LISTA DEI RUOLI**\`\`\`${role.join('')}\`\`\``)
            }
        }else{
            let role=[]
            for(let i=0;i<q;i++){
                if(i!=0)
                    role.push('\n')
                role.push(roles[i])
                if(i!=roles.length-1)
                    role.push('\n')
            }
            await interaction.reply(`**RUOLI**\`\`\`${role.join('')}\`\`\``)
        }
        
    }
}