const {MessageEmbed,MessageActionRow,MessageButton,MessageSelectMenu}=require('discord.js');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'voto',
    description:'Voto al bot\n**comando buggato**',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embedButton=new MessageEmbed()
                .setColor('YELLOW')
                .setTitle('**Voto**')
                .setDescription('Vota le mie abilità')
                .setAuthor({
                    name:client.user.username,
                    iconURL:client.user.displayAvatarURL()
                })
                .setThumbnail(client.user.displayAvatarURL())
        const bottoni=new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('si')
                    .setLabel('SI')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('no')
                    .setLabel('No')
                    .setStyle('DANGER'),
                new MessageButton()
                    .setCustomId('ghost')
                    .setEmoji('🔥')
                    .setLabel(' Voti')
                    .setStyle('SECONDARY')
            )
        await interaction.reply({embeds:[embedButton],components:[bottoni]});

        const menu=new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('menu')
                    .setPlaceholder('Seleziona un voto...')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label:'1️⃣',
                            value:'1'
                        },
                        {
                            label:'2️⃣',
                            value:'2'
                        },
                        {
                            label:'3️⃣',
                            value:'3'
                        },
                        {
                            label:'4️⃣',
                            value:'4'
                        },
                        {
                            label:'5️⃣',
                            value:'5'
                        },
                        {
                            label:'6️⃣',
                            value:'6'
                        },
                        {
                            label:'7️⃣',
                            value:'7'
                        },
                        {
                            label:'8️⃣',
                            value:'8'
                        },
                        {
                            label:'9️⃣',
                            value:'9'
                        },
                        {
                            label:'🔟',
                            value:'10'
                        },
                    ])
            );

        //const filter=i=>i.user.id==='595314016746995722';
        //const filter=i=>i.member.roles.cache.has('boss');//ruolo 

        const collector=interaction.channel.createMessageComponentCollector({time:14000});

        collector.on('collect',async i=>{
            if(i.customId==='ghost'){
                embedButton.setDescription('Lista\n**ri-fai il comanto per ri-valutarlo**')
                embedButton.addField('🔥 I voti sono:',`
                **1**: ${await db.get('voto1')}\n
                **2**: ${await db.get('voto2')}\n
                **3**: ${await db.get('voto3')}\n
                **4**: ${await db.get('voto4')}\n
                **5**: ${await db.get('voto5')}\n
                **6**: ${await db.get('voto6')}\n
                **7**: ${await db.get('voto7')}\n
                **8**: ${await db.get('voto8')}\n
                **9**: ${await db.get('voto9')}\n
                **10**: ${await db.get('voto10')}
                `)
                await i.update({embeds:[embedButton],components:[]});
            }
            if(i.customId==='no'){
                await i.update({embeds:[embedButton.setDescription('Mi dispiace che non vuoi valutarmi. 🙁\n**ri-fai il comanto per ri-valutarlo**')],components:[]});
            }
            if(i.customId==='si'){
                await i.update({embeds:[embedButton.setDescription('Grazie che mi voti! 😀\nDammi un voto da 1 a 10! 🗳️\n**ri-fai il comanto per ri-valutarlo**')],components:[menu]});
                client.on('interactionCreate',async i=>{
                    if(!i.isSelectMenu()) return;
                    if(i.customId==='menu'){
                        if(i.values[0]==='1'){
                            await db.add('voto1',1)
                            i.reply('Hai votato: 1');
                        }
                        if(i.values[0]==='2'){
                            await db.add('voto2',1)
                            i.reply('Hai votato: 2');
                        }
                        if(i.values[0]==='3'){
                            await db.add('voto3',1)
                            i.reply('Hai votato: 3');
                        }
                        if(i.values[0]==='4'){
                            await db.add('voto4',1)
                            i.reply('Hai votato: 4');
                        }
                        if(i.values[0]==='5'){
                            await db.add('voto5',1)
                            i.reply('Hai votato: 5');
                        }
                        if(i.values[0]==='6'){
                            await db.add('voto6',1)
                            i.reply('Hai votato: 6');
                        }
                        if(i.values[0]==='7'){
                            await db.add('voto7',1)
                            i.reply('Hai votato: 7');
                        }
                        if(i.values[0]==='8'){
                            await db.add('voto8',1)
                            i.reply('Hai votato: 8');
                        }
                        if(i.values[0]==='9'){
                            await db.add('voto9',1)
                            i.reply('Hai votato: 9');
                        }
                        if(i.values[0]==='10'){
                            await db.add('voto10',1)
                            i.reply('Hai votato: 10');
                        }
                    }
                })
            }
        });
    }
}