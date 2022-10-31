const { Client } = require("discord.js");
const { prefix } = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`${client.user.tag} è online!`);
        // ———————————————[Status]———————————————
        client.user.setActivity(`/help in ${client.guilds.cache.size} ${client.guilds.cache.size>1?'Servers':'Server'}`,{type:'LISTENING' })
    }
}