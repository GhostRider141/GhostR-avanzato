require('dotenv').config();
const fs=require('fs');
const {Client,Collection,Intents,MessageEmbed,MessageActionRow,MessageButton,Modal,TextInputComponent, MessageAttachment}=require('discord.js');
const wait=require('util').promisify(setTimeout);
const config=require('./config.json');
const messaggio=require('./utility/messaggio');
const reactionRlole=require('./utility/reactionRole');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

//set database quick.db
const server=db.table('server')
server.set('server.numero',0)
server.set('server.lastUser','none')
server.set('server.bestSscore',0)
const utente=db.table('user')
utente.set('user.id',0)
utente.set('user.username','none')
utente.set('user.lastSscore',0)
utente.set('user.bestSscore',0)
utente.set('user.correct',0)
utente.set('user.incorrect',0)

const mute=db.table('mute')
mute.set('mute_id','')
mute.set('mute_id_reason','')

//INIZIO
const client=new Client({intents:32767 });
client.commands=new Collection();
client.slashcmds=new Collection();
client.cooldowns=new Collection();
client.crediti=new Collection();


let canaleCounting

const fileComandiUtili=fs.readdirSync(`./commands/utili`).filter(file=>file.endsWith('.js'));
for(const file of fileComandiUtili){
    const comando=require(`./commands/utili/${file}`);
    client.commands.set(comando.name, comando);
};
const fileComandiInfo=fs.readdirSync(`./commands/info`).filter(file=>file.endsWith('.js'));
for(const file of fileComandiInfo){
    const comando=require(`./commands/info/${file}`);
    client.commands.set(comando.name, comando);
};
const fileComandiModerazione=fs.readdirSync(`./commands/moderazione`).filter(file=>file.endsWith('.js'));
for(const file of fileComandiModerazione){
    const comando=require(`./commands/moderazione/${file}`);
    client.commands.set(comando.name, comando);
};

//bot pronto
require('./Handlers/Events')(client);
require('./Handlers/Commands')(client);
client.once('ready',async()=>{
    //client.user.setStatus('invisible')

    //Registro comandi
    client.guilds.cache.forEach((guild)=>{
        client.commands.forEach(comand=>{
            guild.commands.create(comand)
        })
    })

    canaleCounting=client.channels.cache.get(await db.get(`counting_${client.guilds.id}`))||client.channels.cache.find(c=>c.name.startsWith('conteggio'));

    //messaggio(client,config.idCanali.prova,config.testoMessaggio,config.reazioni);
    //reactionRlole(client);

    //compleanno ari
    const data=new Date()
    const mese=data.getMonth()
    const giorno=data.getDate()
    const annoN=2004
    const anno=data.getFullYear()
    if(giorno==14&&mese==0){
        const ari=client.users.cache.get('595314016746995722')
        const embed=new MessageEmbed()
        .setColor('#ff6800')
        .setTitle('🥳 TANTI AUGURI !! 🥳')
        .setDescription(`🥳 Tantissimi auguri al mio creatore **__~~Ariele~~__** ${ari} **+${anno-annoN}** 🥳`)
        ari.send({embeds:[embed]})
    }
})
//require('./utility/network')(client)

//stato del bot
client.on('messageCreate',message=>{
    const canaleStatus=client.channels.cache.get('976493792918122596')
    const author=client.users.cache.get('595314016746995722')
    if(message.author.id!=author) return;
    const embed=new MessageEmbed()
    .setColor('GREY')
    .setTitle('STATO')
    .setAuthor({
        name:client.user.username,
        iconURL:client.user.displayAvatarURL()
    })

    if(message.content==`${config.prefix}status-bot`){
        message.delete()
        embed.setDescription(`**comando:** ${config.prefix}status-bot`)
        embed.addField('Help',`
        \`${config.prefix}Bs on:\` il bot diventa online
        \`${config.prefix}Bs in:\` il bot diventa inattivo
        \`${config.prefix}Bs nd:\` il bot diventa da non disturbare
        \`${config.prefix}Bs off:\` il bot diventa offline
        `)
        author.send({embeds:[embed]})
    }
    if(message.content==`${config.prefix}Bs on`){
        message.delete()
        client.user.setStatus('online')
        embed.addField('Online','🟢')
        author.send({embeds:[embed]})
        canaleStatus.send({embeds:[embed]})
    }
    if(message.content==`${config.prefix}Bs in`){
        message.delete()
        client.user.setStatus('idle')
        embed.addField('Inattivo','🟡')
        author.send({embeds:[embed]})
        canaleStatus.send({embeds:[embed]})
    }
    if(message.content==`${config.prefix}Bs nd`){
        message.delete()
        client.user.setStatus('dnd')
        embed.addField('Non disturbare','🟠')
        author.send({embeds:[embed]})
        canaleStatus.send({embeds:[embed]})
    }
    if(message.content==`${config.prefix}Bs off`){
        message.delete()
        client.user.setStatus('invisible')
        embed.addField('Offline','🔴')
        author.send({embeds:[embed]})
        canaleStatus.send({embeds:[embed]})
    }
})

//TICKET
client.on('interactionCreate',async(interaction)=>{
	//if(!interaction.isButton()) return;

    const canalePannello=interaction.channel
    var canaleTicket;
    const parent=await db.get(`ticket-category_${interaction.guild.id}`);

    //invio messagio nel ticket

    //embed
    //embed welcome
    const embedTicketS=new MessageEmbed()
    .setTitle(`Ticket Supporto`)
    .setDescription('Grazie che ci hai contattato per il supporto!\nDescrivi il problema.\nTi risponderemo il prima possibile.')
    .setColor('YELLOW')
    .setAuthor({
        name:client.user.username,
        iconURL:client.user.displayAvatarURL()
    })
    const embedTicketP=new MessageEmbed()
    .setTitle(`Ticket Partnership`)
    .setDescription('Grazie che ci hai chiesto la partner!\nTi risponderemo il prima possibile.')
    .setColor('YELLOW')
    .setAuthor({
        name:client.user.username,
        iconURL:client.user.displayAvatarURL()
    })
    const embedTicketSS=new MessageEmbed()
    .setTitle(`Ticket Segnalazione`)
    .setDescription('Grazie che ci hai contattato per la segnalazione!\nDescrivi la sagnalazione con chi o cosa e il motivo.\nTi risponderemo il prima possibile.')
    .setColor('YELLOW')
    .setAuthor({
        name:client.user.username,
        iconURL:client.user.displayAvatarURL()
    })
    //claim
    const embedClaim=new MessageEmbed()
    .setTitle('Reclamato')
    //close reason
    const embedCloseReason=new MessageEmbed()
    .setTitle('Chiudi il ticket con il motivo!')
    //controlli
    const embedTicketControls=new MessageEmbed()
    .setTitle(`Controlli ticket`)

    //embed chiusura
    const embedAnnulla=new MessageEmbed()
    .setColor('DARK_GREEN')
    .setDescription('Chiusura annullata!')

    const embedTicketClose=new MessageEmbed()
    .setColor('ORANGE')

    const embedTicketDelete=new MessageEmbed()
    .setColor('RED')
    .setDescription('Il canale verrà eliminato a breve!')

    //embed log
    const embedTicketLog=new MessageEmbed()
    .setColor('DARK_AQUA')
    .setDescription('Hai loggato il ticket!')

    const embedLogger=new MessageEmbed()
    .setColor('DARKER_GREY')
    .setTitle('TICKET CHIUSO')
    .setAuthor({
        name:client.user.username,
        iconURL:client.user.displayAvatarURL()
    })
    .setDescription('Log del ticket')
    .addField('ID canale: ',`${interaction.channelId}`)
    .addField('Nome canale:',` ${interaction.channel.name}`)
    .addField('Creazione:',`\`${interaction.channel.createdAt}\``)

    //bottoni
    //chiusura
    const ticketControls=new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('close')
            .setEmoji('🔒')
            .setLabel(' Chiudi')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('close-reason')
            .setEmoji('🔒')
            .setLabel(' Chiudi con il motivo')
            .setStyle('DANGER')
    )

    const ticketClaim=new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('claim')
            .setEmoji('🔒')
            .setLabel(' Reclama il tiket')
            .setStyle('SUCCESS'),
    )

    const close=new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('closeYES')
            .setLabel('Chiudi')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('closeNO')
            .setLabel('Annulla')
            .setStyle('SECONDARY')
    )

    //controlli
    const controls=new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('log')
            .setEmoji('🗒️')
            .setLabel(' Log del ticket')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('canc')
            .setEmoji('🗑️')
            .setLabel(' Cancella il tiket')
            .setStyle('DANGER')
    )

    //modals
	const modal = new Modal()
        .setCustomId('ModalTicket')
        .setTitle('Chiusura ticket')
    const closeReason = new TextInputComponent()
        .setCustomId('motivoT')
        .setLabel('Chiudi ticket con motivo.')
        .setStyle('PARAGRAPH')
        .setPlaceholder('Non specificato')
        .setRequired(true)
    const modalRow = new MessageActionRow().addComponents(closeReason);
    modal.addComponents(modalRow);

    //gestione bottoni
    let utente,user;

    await db.set(`MotivoTicket_${interaction.guild.id}`,'Non specificato')
    if(interaction.customId==='support'){
        await db.set(`OpenTicket_${interaction.guild.id}`,interaction.user.id)
        //interaction.deferUpdate()
        let ticket=interaction.guild.channels.cache.find(c=>c.name==`ticket-${interaction.user.username.toLowerCase()}`)
        if(ticket) {
            canalePannello.send({content:`<@${interaction.user.id}> Hai già un ticket aperto! <#${ticket.id}>`,ephemeral:true})
            setTimeout(()=>canalePannello.bulkDelete(1, true),10000)
            return;
        }
        //crea canale, categoria e permessi
        canaleTicket=await interaction.guild.channels.create(`ticket-${interaction.user.username.toLowerCase()}`);
        canaleTicket.setParent(parent);
        canaleTicket.permissionOverwrites.create(canaleTicket.guild.roles.everyone,{
            VIEW_CHANNEL:false,
            SEND_MESSAGES:false
        });
        utente=await db.get(`OpenTicket_${interaction.guild.id}`)
        await canaleTicket.permissionOverwrites.create(utente,{
            VIEW_CHANNEL:true,
            SEND_MESSAGES:true,
            ADMINISTRATOR:false,
            USE_APPLICATION_COMMANDS:false
        });
        const staff=await db.get(`role-staff_${interaction.guild.id}`)
        canaleTicket.send({content:`Benvenuto <@${utente}>! ${staff}`,embeds:[embedTicketS],components:[ticketControls,ticketClaim]})
        interaction.reply({content:`<@${utente}> hai creato un ticket!\nVai in ${canaleTicket}`,ephemeral:true})
    }
    if(interaction.customId==='partnership'){
        await db.set(`OpenTicket_${interaction.guild.id}`,interaction.user.id)
        //interaction.deferUpdate()
        let ticket=interaction.guild.channels.cache.find(c=>c.name==`ticket-${interaction.user.username.toLowerCase()}`)
        if(ticket) {
            canalePannello.send({content:`<@${interaction.user.id}> Hai già un ticket aperto! <#${ticket.id}>`,ephemeral:true})
            setTimeout(()=>canalePannello.bulkDelete(1, true),10000)
            return;
        }
        //crea canale, categoria e permessi
        canaleTicket=await interaction.guild.channels.create(`ticket-${interaction.user.username.toLowerCase()}`);
        canaleTicket.setParent(parent);
        canaleTicket.permissionOverwrites.create(canaleTicket.guild.roles.everyone,{
            VIEW_CHANNEL:false,
            SEND_MESSAGES:false
        });
        utente=await db.get(`OpenTicket_${interaction.guild.id}`)
        await canaleTicket.permissionOverwrites.create(utente,{
            VIEW_CHANNEL:true,
            SEND_MESSAGES:true,
            ADMINISTRATOR:false,
            USE_APPLICATION_COMMANDS:false
        });
        const staff=await db.get(`role-staff_${interaction.guild.id}`)
        canaleTicket.send({content:`Benvenuto <@${utente}>! ${staff}`,embeds:[embedTicketP],components:[ticketControls,ticketClaim]})
        interaction.reply({content:`<@${utente}> hai creato un ticket!\nVai in ${canaleTicket}`,ephemeral:true})
    }
    if(interaction.customId==='signal'){
        await db.set(`OpenTicket_${interaction.guild.id}`,interaction.user.id)
        //interaction.deferUpdate()
        let ticket=interaction.guild.channels.cache.find(c=>c.name==`ticket-${interaction.user.username.toLowerCase()}`)
        if(ticket) {
            canalePannello.send({content:`<@${interaction.user.id}> Hai già un ticket aperto! <#${ticket.id}>`,ephemeral:true})
            setTimeout(()=>canalePannello.bulkDelete(1, true),8000)
            return;
        }
        //crea canale, categoria e permessi
        canaleTicket=await interaction.guild.channels.create(`ticket-${interaction.user.username.toLowerCase()}`);
        canaleTicket.setParent(parent);
        canaleTicket.permissionOverwrites.create(canaleTicket.guild.roles.everyone,{
            VIEW_CHANNEL:false,
            SEND_MESSAGES:false
        });
        utente=await db.get(`OpenTicket_${interaction.guild.id}`)
        await canaleTicket.permissionOverwrites.create(utente,{
            VIEW_CHANNEL:true,
            SEND_MESSAGES:true,
            ADMINISTRATOR:false,
            USE_APPLICATION_COMMANDS:false
        });
        const staff=await db.get(`role-staff_${interaction.guild.id}`)
        canaleTicket.send({content:`Benvenuto <@${utente}>! ${staff}`,embeds:[embedTicketSS],components:[ticketControls,ticketClaim]})
        interaction.reply({content:`<@${utente}> hai creato un ticket!\nVai in ${canaleTicket}`,ephemeral:true})
    }
    if(interaction.customId==='close'){
        interaction.deferUpdate()
        interaction.channel.send({content:`Sei sicuro di chiuderlo?`,components:[close]})
    }
    if(interaction.customId==='close-reason'){
        //interaction.deferUpdate()
		interaction.showModal(modal)
        db.set(`ticketCanc_${interaction.guild.id}`,interaction.channel.id)
    }
    if(interaction.customId==='ModalTicket'){
        interaction.deferUpdate()
        const motivoT = interaction.fields.getTextInputValue('motivoT')
        await db.set(`CloseTicket_${interaction.guild.id}`,interaction.user.id)
        await db.set(`MotivoTicket_${interaction.guild.id}`,motivoT)
        
        const logger=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.find(c=>c.name.startsWith('log'));
        if(!db.get(`ClaimTicket_${interaction.guild.id}`)) await db.set(`ClaimTicket_${interaction.guild.id}`,'Non reclamato')
        logger.send({embeds:[embedLogger.addFields(
            {
                name:'Aperto da: ',
                value:`<@${await db.get(`OpenTicket_${interaction.guild.id}`)}>`
            },
            {
                name:'Chiuso da: ',
                value:`<@${await db.get(`CloseTicket_${interaction.guild.id}`)}>`
            },
            {
                name:'Motivo: ',
                value:`${await db.get(`MotivoTicket_${interaction.guild.id}`)}`
            },
            {
                name:'Reclamato da: ',
                value:`<@${await db.get(`ClaimTicket_${interaction.guild.id}>`)}`
            }
        )],components:[]})

        client.channels.cache.get(await db.get(`ticketCanc_${interaction.guild.id}`)).delete()
    }
    if(interaction.customId==='claim'){
        interaction.update({components:[ticketControls]})
        claim=await db.set(`ClaimTicket_${interaction.guild.id}`,interaction.user.id)
        utente=await db.get(`OpenTicket_${interaction.guild.id}`)
        const roleStaff=await db.get(`role-staff-staff_${interaction.guild.id}`)
        interaction.channel.permissionOverwrites.set([
            {
                id: interaction.channel.guild.roles.everyone,
                deny:[
                    'VIEW_CHANNEL',
                    'USE_APPLICATION_COMMANDS'
                ]
            },
            {
                id: utente,
                allow:[
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES'
                ]
            },
            {
                id: claim,
                allow:[
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                    'USE_APPLICATION_COMMANDS'
                ]
            },
            {
                id: roleStaff,
                allow:[
                    'VIEW_CHANNEL'
                ],
                deny:[
                    'SEND_MESSAGES'
                ]
            }
        ]);
        interaction.channel.send({embeds:[embedClaim.setDescription(`Ticket reclamato da <@${claim}> !`)],components:[]})
    }
    if(interaction.customId==='closeYES'){
        await db.set(`CloseTicket_${interaction.user.id}`,interaction.member.id)
        utente=await db.get(`OpenTicket_${interaction.guild.id}`)
        interaction.channel.permissionOverwrites.create(utente,{
            VIEW_CHANNEL:false,
            SEND_MESSAGES:false
        });
        interaction.update({content:null,embeds:[embedTicketClose.setDescription(`Ticket CHIUSO da <@${interaction.user.id}>`)],components:[]})
        interaction.channel.send({embeds:[embedTicketControls],components:[controls]})
    }
    if(interaction.customId==='closeNO'){
        interaction.channel.bulkDelete(1, true)
        interaction.update({embeds:[embedAnnulla]})
    }
    if(interaction.customId==='log'){
        interaction.deferUpdate()
        interaction.channel.send({embeds:[embedTicketLog],components:[]})
        interaction.channel.send({embeds:[embedTicketControls],components:[controls]})
        const logger=client.channels.cache.get(await db.get(`log_${interaction.guild.id}`))||client.channels.cache.find(c=>c.name.startsWith('log'));
        if(await db.get(`ClaimTicket_${interaction.guild.id}`)==null) await db.set(`ClaimTicket_${interaction.guild.id}`,'Non reclamato')
        logger.send({embeds:[embedLogger.addFields(
            {
                name:'Aperto da: ',
                value:`<@${await db.get(`OpenTicket_${interaction.guild.id}`)}>`
            },
            {
                name:'Chiuso da: ',
                value:`<@${await db.get(`CloseTicket_${interaction.guild.id}`)}>`
            },
            {
                name:'Motivo: ',
                value:`${await db.get(`MotivoTicket_${interaction.guild.id}`)}`
            },
            {
                name:'Reclamato da: ',
                value:`<@${await db.get(`ClaimTicket_${interaction.guild.id}`)}>`
            }
        )],components:[]})
        await db.set(`MotivoTicket_${interaction.guild.id}`,'')
        interaction.channel.bulkDelete(1, true)
    }
    if(interaction.customId==='canc'){
        interaction.deferUpdate()
        interaction.channel.send({embeds:[embedTicketDelete],components:[]})
        setTimeout(()=>interaction.channel.delete(),10000)
    }
})

//canvas immagini
client.on('messageCreate',async m=>{
    if(m.content==`${config.prefix}canvas`){
    const args=m.content.slice(config.prefix.length).trim().split(/ +/);

    let canvas=createCanvas(1600,600)//creazione canvas | 2 parametri (largezza, altezza)
    let ctx=canvas.getContext('2d')
    let w=canvas.width
    let h=canvas.height

    //sfondo
    ctx.fillStyle='#000'
    ctx.fillRect(0,0,w,h)//posx,posy,larg,alt
    
    //rettangolo
    ctx.fillStyle='#ff6800'
    ctx.fillRect(60,60,w-60-60,h-60-60)//posx,posy,larg,alt

    //crearescritte
    ctx.fillStyle='#000'
    ctx.textBaseline='middle'

    ctx.font='80px glich'
    ctx.fillText(`${args[1]}`,w/3,h/2)//testo,posx,posy

    //mandare il canvas
    let channel=m.channel
    let att=new MessageAttachment(canvas.toBuffer(),'canvas.png')

    let embed=new MessageEmbed()
    .setColor('DARK_GREEN')
    .setImage('attachment://canvas.png')

    channel.send({embeds:[embed], files:[att]})
    }
})

//canale vocale temporaneo
const TempChannels = require("discord-temp-channels");
const { createCanvas, loadImage } = require('canvas');
const network = require('./utility/network');
const tempChannels = new TempChannels(client);

var canale,category;
client.on('voiceStateUpdate',async channel=>{
    canale=await db.get(`newCV_${channel.guild.id}`);
    category=await db.get(`newCV-category_${channel.guild.id}`);

    const options = {
        channelD:canale,
        childCategory: category,
        childAutoDeleteIfEmpty: true,
        childAutoDeleteIfOwnerLeaves: false,
        childMaxUsers: 4,
        childFormat: (member,count) => `#${count} | ${member.user.username}`
    }
    tempChannels.registerChannel(canale, options);
})

//numero membri
client.on('guildMemberAdd',async member => {
    const canale=client.channels.cache.get(await db.get(`membri-tot_${member.guild.id}`));
    const canale2=client.channels.cache.get(await db.get(`membri_${member.guild.id}`));
    const canale3=client.channels.cache.get(await db.get(`bot_${member.guild.id}`));

    if(!canale) return;
    if(!canale2) return;
    if(!canale3) return;

    var tot=member.guild.members.cache.size;
    var bot=member.guild.members.cache.filter(m => m.user.bot).size;
    var membri=tot-bot;

    canale.setName(`totali ${tot}`);
    canale2.setName(`membri ${membri}`);
    canale3.setName(`bot ${bot}`);
});
client.on('guildMemberRemove',async member => {
    const canale=client.channels.cache.get(await db.get(`membri-tot_${member.guild.id}`));
    const canale2=client.channels.cache.get(await db.get(`membri_${member.guild.id}`));
    const canale3=client.channels.cache.get(await db.get(`bot_${member.guild.id}`));

    if(!canale) return;
    if(!canale2) return;
    if(!canale3) return;

    var tot=member.guild.members.cache.size;
    var bot=member.guild.members.cache.filter(m => m.user.bot).size;
    var membri=tot-bot;

    canale.setName(`totali ${tot}`);
    canale2.setName(`membri ${membri}`);
    canale3.setName(`bot ${bot}`);
});

//Benvenuto 
client.on('guildMemberAdd',async member=>{
    if(member.guild.channels.cache.find(c=>c.id)==await db.get(`welcome_${member.guild.id}`)){
        const welcome=client.channels.cache.get(await db.get(`welcome_${member.guild.id}`))||client.channels.cache.find(c=>c.name.startsWith('welcome'))
        if(!welcome) return;
        const welcomeEmbed=new MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle('**Benvenuto!**')
            .setAuthor({
                name:member.user.tag,
                iconURL:member.user.displayAvatarURL()
            })
            .setDescription(`<@${member.id}> è **entrato/a** nel server!`)
            .setFooter({text:`${member.guild.name}`})
        wait(4);
        welcome.send({content:`Welcome <@${member.id}>`,embeds:[welcomeEmbed]})
    }
    if(member.guild.id=='777417270263414805')
    member.guild.channels.cache.get('997403531197812806').send(`Welcome <@${member.id}> !`)

    const ruolo=await db.get(`role-welcome-id_${member.guild.id}`)
    if(!ruolo) return;
    else member.roles.add(ruolo);
});
client.on('guildMemberRemove',async member=>{
    if(member.guild.channels.cache.find(c=>c.id)==await db.get(`welcome_${member.guild.id}`)){
        const welcome=client.channels.cache.get(await db.get(`welcome_${member.guild.id}`))||client.channels.cache.find(c=>c.name.startsWith('welcome'));
        if(!welcome) return;
        const nowelcomeEmbed=new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('**Arrivederci!**')
            .setAuthor({
                name:member.user.tag,
                iconURL:member.user.displayAvatarURL()
            })
            .setDescription(`<@${member.id}> è **uscito/a** dal server!`)
            .setFooter({text:`${member.guild.name}`})
        wait(4);
        welcome.send({embeds:[nowelcomeEmbed]})
    }
});

//comandi slash
client.on('interactionCreate',async interaction=>{
    if(!interaction.isCommand()) return
    const comand = client.commands.get(interaction.commandName);
    if (!comand) {
        interaction.reply({ embeds: [
            new MessageEmbed()
                .setColor('RED')
                .setDescription('📛 C\'è stato un errore durante l\'esecuzione del comando')
        ] }) && client.commands.delete(interaction.commandName);
    }

    //controllo permessi
    if(comand.permissions){
        const permessiAutore=interaction.channel.permissionsFor(interaction.member);
        if(interaction.user.tag==config.botCreator) ;
        else if(!permessiAutore||!permessiAutore.has(comand.permissions)){
            return interaction.reply({content:'Non puoi utilizzare questo comando',ephemeral:true});
        }
    }

    //cooldown
    const {cooldowns}=client;

    if(!cooldowns.has(comand.name)){
        cooldowns.set(comand.name,new Collection());
    }

    const ora=Date.now();
    const timestamps=cooldowns.get(comand.name);
    const tempoCooldown=(comand.cooldown||2)*1000;

    if(timestamps.has(interaction.member.id)){
        const tempoScadenza=timestamps.get(interaction.member.id)+tempoCooldown;

        if(ora<tempoScadenza){
            const tempoRimanente=(tempoScadenza-ora)/1000;
            return interaction.reply(`Aspetta ${tempoRimanente.toFixed(1)} secondi/o prima di ri-utilizzare il comando ${comand.name}.`,true);
        }
    }

    timestamps.set(interaction.member.id,ora);
    setTimeout(()=>timestamps.delete(interaction.member.id),tempoCooldown);

    //parte il comando
    try{
        comand.execute(client,interaction)
    } 
    catch(error){
        console.error(error);
        interaction.reply({content:'Qualcosa non è andato bene',ephemeral:true});
    }
});

//modals
client.on('interactionCreate',async interaction=>{
	if(!interaction.isModalSubmit()) return;
    if(interaction.customId==='embed'){
        const embed=new MessageEmbed()

        const autore=interaction.fields.getTextInputValue('autore')
        const colore=interaction.fields.getTextInputValue('colore')
        const titolo=interaction.fields.getTextInputValue('titolo')
        const desc=interaction.fields.getTextInputValue('descrizione')
        const thumbnail=interaction.fields.getTextInputValue('thumbnail')

        if(autore=='si') embed.setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL()
        })
        if(colore) embed.setColor(`${colore}`);
        if(titolo) embed.setTitle(`${titolo}`);
        if(desc) embed.setDescription(`${desc}`)
        if(thumbnail) embed.setThumbnail(interaction.user.get(thumbnail).displayAvatarURL());

        interaction.reply({content:'✅',ephemeral:true})
        interaction.channel.send({embeds:[embed]})
    }
    if(interaction.customId==='partner'){
        const canale=client.channels.cache.get(await db.get(`partner_${interaction.guild.id}`))
        const canaleComandi=client.channels.cache.get(await db.get(`partnerBot_${interaction.guild.id}`))
        const descrizione = interaction.fields.getTextInputValue('descrizione')
        var userID = interaction.fields.getTextInputValue('userID')
        const membri = interaction.fields.getTextInputValue('membri')

		interaction.reply({content:'Partnership conclusa! ✅'})

        var ping='nessun ping',userID,desc=''
        const here=await db.get(`hereP_${interaction.guild.id}`)
        const everyone=await db.get(`everyoneP_${interaction.guild.id}`)

        const array=descrizione.split(' ')
        
        desc=descrizione.replace('','')        
        for(let i=0;i<descrizione.length;i++){
            desc=desc.replace('\\','')
            desc=desc.replace('||','')
            desc=desc.replace('[','')
            desc=desc.replace(']','')
            desc=desc.replace('@everyone','')
            desc=desc.replace('@here','')
        }

        if(!userID) userID='Non specificato'
        else userID=`<@${userID}>`
        if(membri>=everyone&&everyone!=null) ping=`@everyone`
        else if(membri>=here&&here!=null) ping=`@here`

        const partner=`**__PARTNERSHIP__**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n⌂ **Fatta da:** ${interaction.user}\n⌂ **Con:** ${userID}\n⌂ **Ping:** ${ping}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`

        const embed= new MessageEmbed()
        .setTitle('Partnership')
        .setColor('GREEN')
        .addField('Fatta da:',`${interaction.user}`)
        .addField('Con:',`${userID}`)
        .addField('ping:',`${ping}`)

        canale.send(`${desc}`)
        setTimeout(()=>canale.send(partner),1000)
	}
});

//parole react
client.on('messageCreate',message=>{
    const embed=new MessageEmbed()
    .setColor('GREEN')

    if(message.content.startsWith('Welcome')||message.content.startsWith('welcome')||message.content.startsWith('Benvenuto')||message.content.startsWith('benvenuto')){
        message.react('👋🏻')
        if(message.guild.id==777417270263414805){
            message.react('⚡')
        }else{
            message.react('🔥')
        }
    }
    if(message.content=='PIKA'&&message.guild.id==777417270263414805){
        message.channel.send({embeds:[embed.setDescription(`<@716978510987526144> è l'owner del server e decide tutto lui!`)]})
    }
    if(message.content=='Pika gay'&&message.guild.id==777417270263414805){
        message.channel.send({embeds:[embed.setDescription(`<@716978510987526144> non è gay, ma è fidanzato con <@762648814918041641>!`)]})
    }
})

//conteggio
client.on('messageCreate',async message=>{
    canaleCounting=await db.get(`canale_counting_${message.guild.id}`)
    if(!canaleCounting) return;

    if(message.channel.id==canaleCounting){
        const embedCouter=new MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle('**Conteggio**')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })

        let i,num=0,numero=false
        for(i=0;i<4;i++)
            if(message.content.codePointAt(i)>47&&message.content.codePointAt(i)<58)
                num++
        if(num>0&&num<5) numero=true
        
        if(numero==true&&!message.author.bot){
            if(parseInt(message.content)==await db.get(`counting_${message.guild.id}`)+1&&message.author.id!=await db.get(`counting_autore_${message.guild.id}`)){
                if(parseInt(message.content)==1000){
                    message.react('1️⃣')
                    message.react('0️⃣')
                    message.react('0️⃣')
                    message.react('0️⃣')
                }
                else if(parseInt(message.content)==100) message.react('💯')
                else message.react('✅')

                if(await db.get(`max_counting_${message.guild.id}`)<await db.get(`counting_${message.guild.id}`)+1)
                    await db.set(`max_counting_${message.guild.id}`,await db.get(`counting_${message.guild.id}`)+1)

                await db.add(`counting_${message.guild.id}`,1)
                await db.set(`counting_autore_${message.guild.id}`,message.author.id)
            } else{
                message.react('❌')
                message.channel.send({embeds:[embedCouter
                    .setDescription(`Siamo arrivati al numero: ${await db.get(`counting_${message.guild.id}`)}`)
                    .addField('Hai sbagliato!!','**Si ricomincia...**')
                ]})

                if(await db.get(`max_counting_${message.guild.id}`)<await db.get(`counting_${message.guild.id}`))
                    await db.set(`max_counting_${message.guild.id}`,await db.get(`counting_${message.guild.id}`))
                    
                await db.set(`counting_${message.guild.id}`,0)
                await db.set(`counting_autore_${message.guild.id}`,'')
            }
        }
    }
})

//login bot con token
client.login(process.env.TOKEN);