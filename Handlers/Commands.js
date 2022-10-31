const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { readdirSync } = require('fs');

module.exports = async (client) => {
    const table = new Ascii('Slash Commands Loaded!')

    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`)
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '🔰 Con successo')
            } else {
                table.addRow(file, '🔶 Errore', 'Mancato un nome')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });

    console.log(table.toString());

    client.on('ready', async () => {
        const Guild = client.guilds.cache.get('806573168340500480');

        //Guild.commands.set(CommandsArray)
    })
}