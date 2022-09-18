const{MessageEmbed}=require('discord.js');
const ms=require('ms');
const config=require('../../config.json');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports={
    name:'botinfo',
    description:'Informazioni sul bot',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        //canali
        const log=await db.get(`log_${interaction.guild.id}`)
        const welcome=await db.get(`welcome_${interaction.guild.id}`)
        const mod=await db.get(`mod_${interaction.guild.id}`)
        const counting=await db.get(`counting_${interaction.guild.id}`)
        const verifica=await db.get(`verifica_${interaction.guild.id}`)
        const newCV=await db.get(`newCV_${interaction.guild.id}`)
        const categoryNewCV=await db.get(`newCV-category_${interaction.guild.id}`)
        const ticket=await db.get(`ticket_${interaction.guild.id}`)
        const ticketCategory=await db.get(`ticket-category_${interaction.guild.id}`)
        const eta=await db.get(`eta_${interaction.guild.id}`)

        //ruoli
        const roleWelcome=await db.get(`role-welcome_${interaction.guild.id}`)
        const roleVerified=await db.get(`role-verified_${interaction.guild.id}`)
        const roleNoVerified=await db.get(`role-NOverified_${interaction.guild.id}`)
        const roleStaff=await db.get(`role-staff-staff_${interaction.guild.id}`)
        const Staff=await db.get(`role-staff_${interaction.guild.id}`)
        const maggiorenne=await db.get(`maggiorenne_${interaction.guild.id}`)
        const minorenne=await db.get(`minorenne_${interaction.guild.id}`)

        const embedBot=new MessageEmbed()
            .setColor('GOLD')
            .setAuthor({
                name:client.user.username,
                iconURL:client.user.displayAvatarURL()
            })
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Informazioni del bot',`
                **ID del bot:** ${client.user.id}
                **tag del Bot:** ${client.user.tag}
                **🆘Comando aiuto**: /help
                **📦Server**: ${client.guilds.cache.size}
                **🔲Canali**: ${client.channels.cache.size}
                **⌚Tempo**: ${ms(client.uptime,{long:true})}
            `)
            .addField('\u200b',`**SETUP MANUALE**`)
            .addField('Facoltativi',`prima di fare il setup completo
                **Canali da creare/avere**: 
                categorie: canali vocali, ticket, bannati
                testuali: log, benvenuto, moderazione, conteggio, verifica, ticket, canale per l\'età
                canale vocale per creare delle vocal temporanee
                **Ruoli da creare/avere**: ruoli da mettere agli utenti che entrano nel server, verifica, non verificato, ruolo per tutto lo staff, ruoli dello staff, minorenne, maggiorenne
            `)
            .addField('Canali:',`
                📁log: <#${log}>
                👋🏻welcome: <#${welcome}>
                moderazione: <#${mod}>
                🔢contare: <#${counting}>
                🔵verifica: <#${verifica}>
                crea canali vocali temporanei: <#${newCV}> categoria: <#${categoryNewCV}>
                🔖ticket: <#${ticket}> categoria: <#${ticketCategory}>
                🔞età: <#${eta}>
            `)
            .addField('Ruoli:',`
                ruoli che dà il bot quando qualcuno entra nel server: ${roleWelcome}
                verificato: <@&${roleVerified}>
                NON verificato: <@&${roleNoVerified}>
                Ruolo generale dello staff: <@&${roleStaff}>
                Staff: ${Staff}
                minorenne: <@&${minorenne}>
                maggiorenne: <@&${maggiorenne}>
            `)
        
        await interaction.reply({embeds:[embedBot]});
    }
}