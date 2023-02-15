const{MessageEmbed, Modal,MessageActionRow,TextInputComponent}=require('discord.js');

module.exports={
    name:'embed',
    description:'Crea un messagio embed',
    cooldown:10,
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
        const modal=new Modal()
            .setCustomId('embed')
            .setTitle('Embed')
        
        const autore=new TextInputComponent()
            .setCustomId('autore')
            .setLabel('Autore:')
            .setStyle('SHORT')
            .setPlaceholder('si/no')
            .setRequired(true)
        const colore=new TextInputComponent()
            .setCustomId('colore')
            .setLabel('Colore:')
            .setStyle('SHORT')
            .setPlaceholder(`Default,White,Aqua,Green, ... ,Navy,DarkGreen, ...`.toUpperCase())
        const titolo=new TextInputComponent()
            .setCustomId('titolo')
            .setLabel('Titolo:')
            .setStyle('SHORT')
            .setPlaceholder('titolo')
        const descrizione=new TextInputComponent()
            .setCustomId('descrizione')
            .setLabel('Descrizione server:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Descrizione')
        const thumbnail=new TextInputComponent()
            .setCustomId('thumbnail')
            .setLabel('Thumbnail:')
            .setStyle('SHORT')
            .setPlaceholder('ID utente')
        
        const row=new MessageActionRow().addComponents(autore);
        const row2=new MessageActionRow().addComponents(colore);
        const row3=new MessageActionRow().addComponents(titolo);
        const row4=new MessageActionRow().addComponents(descrizione);
        const row5=new MessageActionRow().addComponents(thumbnail);
        modal.addComponents(row,row2,row3,row4,row5);
        await interaction.showModal(modal);
    }
}