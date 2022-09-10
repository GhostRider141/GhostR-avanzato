const { Client, Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports={
    name:'partnership',
    description:'Creazione Partnership',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction){
		const modal = new Modal()
			.setCustomId('partner')
			.setTitle('PartnerShip')
        const descrizione=new TextInputComponent()
            .setCustomId('descrizione')
            .setLabel('Descrizione server:')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Descrizione')
            .setRequired(true)
        const userID=new TextInputComponent()
            .setCustomId('userID')
            .setLabel('ID utente:')
            .setStyle('SHORT')
            .setPlaceholder('ID utente')
        const memberi=new TextInputComponent()
            .setCustomId('membri')
            .setLabel('numero membri del server:')
            .setStyle('SHORT')
            .setPlaceholder('numero membri')
            .setRequired(true)

        const row=new MessageActionRow().addComponents(descrizione);
        const row2=new MessageActionRow().addComponents(userID);
        const row3=new MessageActionRow().addComponents(memberi);
        modal.addComponents(row, row2, row3);
		await interaction.showModal(modal);
    }
}