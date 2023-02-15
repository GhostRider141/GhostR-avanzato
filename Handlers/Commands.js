const Ascii = require('ascii-table');
const { readdirSync } = require('fs');

module.exports = async (client) => {
    const table = new Ascii('Slash Commands Loaded!')
    let commandsTrue=0
    let commandsFalse=0

    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`)
            if (pull.name) {
                commandsTrue++
                client.commands.set(pull.name, pull);
                table.addRow(file, `❇️  Con successo`)
            } else {
                commandsFalse++
                table.addRow(file, `🔶 Errore`, 'Mancato un nome')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    const tableTC = new Ascii('📎Total Commands')
    tableTC.addRow('🗳️  Caricati',commandsTrue)
    tableTC.addRow('💢 Errati',commandsFalse)

    console.log(table.toString());
    console.log(tableTC.toString());
}