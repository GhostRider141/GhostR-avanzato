const {MessageEmbed,Client} = require("discord.js");
const config=require('../../config.json');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'config',
    description:'Configura il bot manualmente',
    permissions:'ADMINISTRATOR',
    cooldown:5,
    options:[
        {
            name: 'help',
            description: 'aiuto per la configurazione',
            type: 'SUB_COMMAND',
        },
        {
            name: 'partner',
            description: 'congigura il canale delle partner',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'partner-bot',
            description: 'congigura il canale del comando delle partner',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'log',
            description: 'congigura il canale dei log',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'moderazione',
            description: 'congigura il canale di moderazione',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'verifica',
            description: 'congigura il canale per la verifica',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'counter',
            description: 'numero dei membri del server',
            type: 'SUB_COMMAND_GROUP',
            options:[
                {
                    name: 'membri_tot',
                    description: 'Canale dei membri totali',
                    type: 'SUB_COMMAND',
                    options:[
                        {
                            name: 'canale',
                            description: 'Specifica il canale',
                            type: 'CHANNEL',
                        },
                    ],
                },
                {
                    name: 'membri',
                    description: 'Canale degli utenti',
                    type: 'SUB_COMMAND',
                    options:[
                        {
                            name: 'canale',
                            description: 'Specifica il canale',
                            type: 'CHANNEL',
                        },
                    ],
                },
                {
                    name: 'bot',
                    description: 'Canale dei bot',
                    type: 'SUB_COMMAND',
                    options:[
                        {
                            name: 'canale',
                            description: 'Specifica il canale',
                            type: 'CHANNEL',
                        },
                    ],
                },
            ],
        },
        {
            name: 'benvenuto',
            description: 'congigura il canale di entrata e/o uscita dal server',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'canale_temp',
            description: 'congigura il canale per creare i canali temporanei',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'counting',
            description: 'congigura il canale per il conteggio (gioco)',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'ticket',
            description: 'congigura il canale dei ticket',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'eta',
            description: 'congigura il canale per essere maggiorenni',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'members-membri',
            description: 'congigura il canale dei membri',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'members-utenti',
            description: 'congigura il canale degli utenti',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'members-bot',
            description: 'congigura il canale dei bot',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'canale',
                    description: 'Specifica il canale',
                    type: 'CHANNEL',
                },
            ],
        },
        
        {
            name: 'canale_temp-category',
            description: 'configura la categoria dei canali temporanei',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'categoria',
                    description: 'Specifica l\'ID della categoria',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'ticket-category',
            description: 'configura la categoria dei ticket',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'categoria',
                    description: 'Specifica l\'ID della categoria',
                    type: 'CHANNEL',
                },
            ],
        },
        {
            name: 'role-benvenuto',
            description: 'configura il ruolo che da a chi è appena entrato nel server',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'Specifica il ruolo',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-verified',
            description: 'configura il ruolo di verifica',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'Specifica il ruolo',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-no-verified',
            description: 'configura il ruolo non verificato',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'Specifica il ruolo',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-staff-generico',
            description: 'configura il ruolo dello staff generico',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'ruoli dello staff',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-staff',
            description: 'configura i ruoli dello staff',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'ruoli dello staff',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-minorenne',
            description: 'configura il ruolo minorenne',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'Specifica il ruolo',
                    type: 'ROLE',
                },
            ],
        },
        {
            name: 'role-maggiorenne',
            description: 'configura il ruolo maggiorenne',
            type: 'SUB_COMMAND',
            options:[
                {
                    name: 'ruolo',
                    description: 'Specifica il ruolo',
                    type: 'ROLE',
                },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const embedConfig=new MessageEmbed()
            .setColor('GREYPLE')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })
            .setTitle('Configurazione bot')
            .setThumbnail(interaction.guild.iconURL())
            
        if(interaction.options.getSubcommand()==='help'){
            embedConfig.setDescription(this.description)
            embedConfig.addFields(
                {
                    name:`Utilizzo comandi`,
                    value:`\`${this.name} (comando)\`: resetta la configurazione\n\`${this.name} (comando) [opzioni] (valore)\`: configura il campo`
                },
                {
                    name:`\u200b`,
                    value:`**setting**`
                },
                {
                    name:`\`${this.name} partner (menziona il canale)\``,
                    value:`per configurare il canale per la partnership`
                },
                {
                    name:`\`${this.name} partner-bot (menziona il canale)\``,
                    value:`per configurare il canale per il comando partnership`
                },
                {
                    name:`\u200b`,
                    value:`**Canali**`
                },
                {
                    name:`\`${this.name} log (menziona il canale)\``,
                    value:`per configurare il canale dei log`
                },
                {
                    name:`\`${this.name} mod (menziona il canale/none)\``,
                    value:`per configurare il canale per i comandi di moderazione`
                },
                {
                    name:`\`${this.name} counter (none/membriTOT/membri/bot) (menziona il canale)\``,
                    value:`per configurare i canali dei counter dei membri`
                },
                {
                    name:`\`${this.name} verifica (menziona il canale/none)\``,
                    value:`per configurare il canale di verifica`
                },
                {
                    name:`\`${this.name} benvenuto (menziona il canale/none)\``,
                    value:`per configurare il canale benvenuto`
                },
                {
                    name:`\`${this.name} canale_temp (id del canale vocale/none)\``,
                    value:`per configurare il canale per creare canali temporanei`
                },
                {
                    name:`\`${this.name} counting (menziona il canale/none)\``,
                    value:`per configurare il canale di conteggio (gioco)`
                },
                {
                    name:`\`${this.name} ticket (id del canale/none)\``,
                    value:`per configurare il canale dei pannelli per i ticket`
                },
                {
                    name:`\`${this.name} eta (id del canale/none)\``,
                    value:`per configurare il canale dell\'età`
                },
                {
                    name:`\`${this.name} members-(membri/utenti/bot) (id canale)\``,
                    value:`per configurare i canali dei dati dei membri del server`
                },
                {
                    name:`\u200b`,
                    value:`**Categorie**`
                },
                {
                    name:`\`${this.name} newCV-category (id della categoria/none)\``,
                    value:`per configurare la categoria del canale dei canali temporanei`
                },
                {
                    name:`\`${this.name} ticket-category (id della categoria/none)\``,
                    value:`per configurare la categoria dei ticket`
                },
                {
                    name:`\u200b`,
                    value:`**Ruoli**`
                },
                {
                    name:`\`${this.name} role-benvenuto (menziona il ruolo/none)\``,
                    value:`per configurare il ruolo per chi entra nel server`
                },
                {
                    name:`\`${this.name} role-verified (menziona il ruolo)\``,
                    value:`per configurare il ruolo di verifica`
                },
                {
                    name:`\`${this.name} role-no-verified (menziona il ruolo)\``,
                    value:`per configurare il ruolo di non verificato`
                },
                {
                    name:`\`${this.name} role-staff (menziona i ruoli)\``,
                    value:`per configurare i ruoli dello staff (massimo 8)`
                },
                {
                    name:`\`${this.name} role-generico (menziona il ruolo)\``,
                    value:`per configurare il ruolo generale dello staff`
                },
                {
                    name:`\`${this.name} role-minorenne (menziona il ruolo)\``,
                    value:`per configurare il ruolo minorenne`
                },
                {
                    name:`\`${this.name} role-maggiorenne (menziona il ruolo)\``,
                    value:`per configurare il ruolo maggiorenne`
                },
            )
            interaction.reply({embeds:[embedConfig],components:[]})
        }

        //canali
        let partner=await db.get(`partner_${interaction.guild.id}`)
        let partnerBot=await db.get(`partnerBot_${interaction.guild.id}`)
        let log=await db.get(`log_${interaction.guild.id}`)
        let welcome=await db.get(`welcome_${interaction.guild.id}`)
        let memmbriTOT=await db.get(`membri-tot_${interaction.guild.id}`)
        let memmbri=await db.get(`membri_${interaction.guild.id}`)
        let bot=await db.get(`bot_${interaction.guild.id}`)
        let mod=await db.get(`mod_${interaction.guild.id}`)
        let counting=await db.get(`canale_counting_${interaction.guild.id}`)
        let verifica=await db.get(`verifica_${interaction.guild.id}`)
        let newCV=await db.get(`newCV_${interaction.guild.id}`)
        let categoryNewCV=await db.get(`newCV-category_${interaction.guild.id}`)
        let words=await db.get(`blacklist_words_${interaction.guild.id}`)
        let ticket=await db.get(`ticket_${interaction.guild.id}`)
        let ticketCategory=await db.get(`ticket-channel_${interaction.guild.id}`)
        let eta=await db.get(`eta_${interaction.guild.id}`)
        if(interaction.options.getSubcommand()==='partner-bot') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`partnerBot_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale per i comandi partner impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                
                partnerBot=await db.set(`partnerBot_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale  per i comandi  partner: <#${partnerBot}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='partner') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`partner_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale partner impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                
                partner=await db.set(`partner_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale delle partner: <#${partner}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='log') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`log_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale dei log impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                log=await db.set(`log_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei log: <#${log}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='moderazione') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`mod_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale di moderazione impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                mod=await db.set(`mod_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale di moderazione: <#${mod}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='verifica') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`verifica_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale di verifica impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                verifica=await db.set(`verifica_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale di verifica: <#${verifica}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='counter') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`membri-tot_${interaction.guild.id}`)
                await db.delete(`membri_${interaction.guild.id}`)
                await db.delete(`bot_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via i canali dei counter impostati')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else if(interaction.options.getSubcommand()==='membri-tot') {
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                memmbriTOT=await db.set(`membri-tot_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei membri totali: <#${memmbriTOT}>`)],components:[],ephemeral:true})
            } else if(interaction.options.getSubcommand()==='membri') {
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                memmbri=await db.set(`membri_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei membri: <#${memmbri}>`)],components:[],ephemeral:true})
            } else if(interaction.options.getSubcommand()==='bot') {
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                bot=await db.set(`bot_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei bot: <#${bot}>`)],components:[],ephemeral:true})
            }
            if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi setterlo a **none** o **membriTOT / membri / bot** e **menzionare il canale**')],components:[],ephemeral:true})
        }
        if(interaction.options.getSubcommand()==='benvenuto') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`welcome_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale benvenuto impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                welcome=await db.set(`welcome_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale benvenuto: <#${welcome}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='canale_temp') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`newCV_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale temporaneo impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var newchannel=interaction.options.getChannel('canale')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                newCV=await db.set(`newCV_${interaction.guild.id}`,newchannel.id)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale temporaneo: <#${newCV}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='canale_temp-category') {
            var newcategory=interaction.options.getChannel('categoria')
            if(!newcategory){
                await db.delete(`newCV-category_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato la categoria di newCV impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var newcategory=interaction.options.getChannel('categoria')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare la categoria devi **menzionare la categoria** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare la categoria devi **menzionare la categoria**')],components:[],ephemeral:true})

                categoryNewCV=await db.set(`newCV-category_${interaction.guild.id}`,newcategory.id)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato la categoria di newCV: <#${categoryNewCV}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='counting') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`canale_counting_${interaction.guild.id}`)
                db.set(`max_counting_${interaction.guild.id}`,0)
                embedConfig.setDescription('Ho tirato via il canale del counting impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                counting=await db.set(`canale_counting_${interaction.guild.id}`,newchannel)
                db.set(`max_counting_${interaction.guild.id}`,0)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale di counting: <#${counting}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='ticket') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`ticket_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale dei pannelli ticket impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                ticket=await db.set(`ticket_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale pannello per i ticket: <#${ticket}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='ticket-category') {
            var newcategory=interaction.options.getChannel('categoria')
            if(!newcategory){
                await db.delete(`ticket-category_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via la categoria dei ticket impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var newcategory=interaction.options.getChannel('categoria')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare la categoria devi **menzionare la categoria** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare la categoria devi **menzionare la categoria**')],components:[],ephemeral:true})
                
                ticketCategory=await db.set(`ticket-category_${interaction.guild.id}`,newcategory.id)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato la categoria dei ticket: <#${ticketCategory}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='eta') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`eta_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale dell\'età')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                eta=await db.set(`eta_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dell\'età: <#${eta}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='members-membri') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`membri-tot_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale dei membri totali impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                ticket=await db.set(`membri-tot_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei membri totali: <#${ticket}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='members-utenti') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`membri_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale degli utenti')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                eta=await db.set(`membri_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale degli utenti: <#${eta}>`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='members-bot') {
            var channelSet=interaction.options.getChannel('canale')
            if(!channelSet){
                await db.delete(`bot_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il canale dei bot')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var channelSet=interaction.options.getChannel('canale')
                var newchannel=channelSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il canale devi **menzionare il canale** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il canale devi **menzionare il canale**')],components:[],ephemeral:true})

                eta=await db.set(`bot_${interaction.guild.id}`,newchannel)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il canale dei bot: <#${eta}>`)],components:[],ephemeral:true});
            }
        }

        //ruoli
        let roleWelcome=await db.get(`role-welcome_${interaction.guild.id}`)
        let roleVerified=await db.get(`role-verified_${interaction.guild.id}`)
        let roleNoVerified=await db.get(`role-NOverified_${interaction.guild.id}`)
        let Staff=await db.get(`role-staff_${interaction.guild.id}`)
        let roleStaff=await db.get(`role-staff-staff_${interaction.guild.id}`)
        let maggiorenne=await db.get(`maggiorenne_${interaction.guild.id}`)
        let minorenne=await db.get(`minorenne_${interaction.guild.id}`)
        if(interaction.options.getSubcommand()==='role-benvenuto') {
            var roleSet=interaction.options.getRole('ruolo')
            if(!roleSet){
                await db.delete(`role-welcome_${interaction.guild.id}`)
                await db.delete(`role-welcome-id_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il ruolo impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            } else{
                var roleSet=interaction.options.getRole('ruolo')
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il ruolo devi **menzionare il ruolo** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                let rolesID=[await db.get(`role-welcome-id_${interaction.guild.id}`)]
                
                rolesID.push(`${roleSet.id}`)

                await db.set(`role-welcome-id_${interaction.guild.id}`,rolesID)


                let roles=[await db.get(`role-welcome_${interaction.guild.id}`)]
                
                roles.push(`${roleSet}`)

                await db.set(`role-welcome_${interaction.guild.id}`,roles)

                roleWelcome=await db.get(`role-welcome_${interaction.guild.id}`)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo da dare a chi entra nel server: ${roleWelcome}`)],components:[],ephemeral:true});
            }
        }
        if(interaction.options.getSubcommand()==='role-verified') {
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                var newrole=roleSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                roleVerified=await db.set(`role-verified_${interaction.guild.id}`,newrole)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo di verifica: <@&${roleVerified}>`)],components:[],ephemeral:true});
            }else{
                await db.delete(`role-verified_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il ruolo di verifica impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
        if(interaction.options.getSubcommand()==='role-no-verified') {
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                var newrole=roleSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                roleNoVerified=await db.set(`role-NOverified_${interaction.guild.id}`,newrole)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo non verificato: <@&${roleNoVerified}>`)],components:[],ephemeral:true});
            }else{
                await db.delete(`role-NOverified_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via il ruolo di no verificato impostato')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
        if(interaction.options.getSubcommand()==='role-staff-generico'){
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare i ruoli devi **menzionare il ruolo**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                roleStaff=await db.set(`role-staff-staff_${interaction.guild.id}`,roleSet.id)

                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo generale dello staff: <@&${roleStaff}>`)],components:[],ephemeral:true});
            }else{
                await db.delete(`role-staff-staff_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via i ruoli impostati')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
        if(interaction.options.getSubcommand()==='role-staff'){
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare i ruoli devi **menzionare i ruoli** o setterlo a **none**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare i ruoli devi **menzionare i ruoli**')],components:[],ephemeral:true})

                let roles=[await db.get(`role-staff_${interaction.guild.id}`)]
                
                roles.push(`${roleSet}`)

                await db.set(`role-staff_${interaction.guild.id}`,roles)

                Staff=[await db.get(`role-staff_${interaction.guild.id}`)]

                interaction.reply({embeds:[embedConfig.setDescription(`Hai aggiunto <@&${roleSet.id}> \nRuoli: ${Staff}`)],components:[],ephemeral:true});
            }else{
                await db.delete(`role-staff_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via i ruoli impostati')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
        if(interaction.options.getSubcommand()==='role-minorenne') {
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                var newrole=roleSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                minorenne=await db.set(`minorenne_${interaction.guild.id}`,newrole)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo minorenne: <@&${minorenne}>`)],components:[],ephemeral:true});
            }else{
                await db.delete(`minorenne_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via i ruoli dell\'età impostati')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
        if(interaction.options.getSubcommand()==='role-maggiorenne') {
            var roleSet=interaction.options.getRole('ruolo')
            if(roleSet){
                var newrole=roleSet.id;
                if(!interaction.options) interaction.reply({embeds:[embedConfig.setDescription('Se vuoi cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})
                //else if(!interaction.options===interaction.mentions.channels) interaction.reply({embeds:[embedConfig.setDescription('Per cambiare il ruolo devi **menzionare il ruolo**')],components:[],ephemeral:true})

                maggiorenne=await db.set(`maggiorenne_${interaction.guild.id}`,newrole)
                interaction.reply({embeds:[embedConfig.setDescription(`Hai settato il ruolo maggiorenne: <@&${maggiorenne}>`)],components:[],ephemeral:true});
            }else{
                await db.delete(`maggiorenne_${interaction.guild.id}`)
                embedConfig.setDescription('Ho tirato via i ruoli dell\'età impostati')
                interaction.reply({embeds:[embedConfig],components:[],ephemeral:true})
            }
        }
    }
}