const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");
const mate = require('mathjs');
const {QuickDB} = require('quick.db');
const db=new QuickDB()

module.exports = {
    name: 'calculator',
    description: 'Usa la calcolatrice',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction) {
        const author = interaction.member;
        const guild = interaction.guild;
        const Author = guild.members.cache.get(author.id);

        let tot,totale=0;
        await db.set('calc.default',`\`\`\`0                \`\`\``)
        await db.set('calc.calcolo',[])

        const embed = new MessageEmbed()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription(`\`\`\`1+4+1=141            \`\`\``)
            .setFooter({
                text: `Richiesto da: ${Author.user.tag}`,
                iconURL: Author.user.displayAvatarURL()
            })
            .setColor('YELLOW')

        let array = ['C', 'Xª', '√X', '/', '7', '8', '9', 'X', '4', '5', '6','-', '1', '2', '3', '+', '%', '0', ',', '=']        

        let array0 = array.slice(0, 4);
        let array1 = array.slice(4, 8);
        let array2 = array.slice(8, 12);
        let array3 = array.slice(12, 16);
        let array4 = array.slice(16, array.length)

        let line0 = new MessageActionRow()
        let line1 = new MessageActionRow()
        let line2 = new MessageActionRow()
        let line3 = new MessageActionRow()
        let line4 = new MessageActionRow()

        for (i = 0; i < array0.length; i++) {
            let button = new MessageButton()
                    .setCustomId(`${i}`)
                    .setLabel(`${array0[i]}`)
            if (i == 0) {
                button.setStyle('DANGER')
            } else button.setStyle('PRIMARY')

            line0.addComponents(button)
        }

        for (i = 0; i < array1.length; i++) {
            let button = new MessageButton()
                    .setCustomId(`${i + 4}`)
                    .setLabel(`${array1[i]}`)
            
            if (i == 3) {
                button.setStyle('PRIMARY')
            } else button.setStyle('SECONDARY')
                            
            line1.addComponents(button)
        }

        for (i = 0; i < array2.length; i++) {
            let button = new MessageButton()
                    .setCustomId(`${i + 8}`)
                    .setLabel(`${array2[i]}`)
                    
            if (i == 3) {
                button.setStyle('PRIMARY')
            } else button.setStyle('SECONDARY')
                    
            line2.addComponents(button)
        }

        for (i = 0; i < array3.length; i++) {
            let button = new MessageButton()
                    .setCustomId(`${i + 12}`)
                    .setLabel(`${array3[i]}`)

            if (i == 3) {
                button.setStyle('PRIMARY')
            } else button.setStyle('SECONDARY')
            
            line3.addComponents(button)
        }

        for (i = 0; i < array4.length; i++) {
            let button = new MessageButton()
                    .setCustomId(`${i + 16}`)
                    .setLabel(`${array4[i]}`)

            if (i == 1) { 
                button.setStyle('SECONDARY')
            } else if (i == 3) {
                button.setStyle('SUCCESS')
            } else button.setStyle('PRIMARY')

            line4.addComponents(button)
        }

        await interaction.reply({ embeds: [embed], components: [line0, line1, line2, line3, line4] })
        
        const collector=interaction.channel.createMessageComponentCollector();

        collector.on('collect',async i => {
            if (i.customId === '0'){
                await db.set('calc.calcolo',[])
                i.update({ embeds: [embed.setDescription(await db.get('calc.default'))] })
            }
            if (i.customId === '1'){
                await db.push('calc.calcolo','^')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '2'){
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                tot=mate.evaluate(s)
                totale=mate.sqrt(tot)
                await db.push('calc.calcolo',' -> ')
                await db.push('calc.calcolo','√')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s+tot+'='+totale}\`\`\``)] })
                await db.set('calc.calcolo',[])
                totale=0;
            }
            if (i.customId === '3'){
                await db.push('calc.calcolo','/')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '4'){
                await db.push('calc.calcolo','7')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '5'){
                await db.push('calc.calcolo','8')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '6'){
                db.push('calc.calcolo','9')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '7'){
                await db.push('calc.calcolo','*')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '8'){
                await db.push('calc.calcolo','4')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '9'){
                await db.push('calc.calcolo','5')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '10'){
                await db.push('calc.calcolo','6')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '11'){
                await db.push('calc.calcolo','-')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '12'){
                await db.push('calc.calcolo','1')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '13'){
                await db.push('calc.calcolo','2')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '14'){
                await db.push('calc.calcolo','3')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '15'){
                await db.push('calc.calcolo','+')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '16'){
                await db.push('calc.calcolo','%')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '17'){
                await db.push('calc.calcolo','0')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '18'){
                await db.push('calc.calcolo','.')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s}\`\`\``)] })
            }
            if (i.customId === '19'){
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                totale=totale+mate.evaluate(s)
                await db.push('calc.calcolo','=')
                s=`${await db.get('calc.calcolo')}`
                for(let i=0;i<s.length;i++) s=s.replace(',','')
                i.update({ embeds: [embed.setDescription(`\`\`\`${s+totale}\`\`\``)] })
                await db.set('calc.calcolo',[])
                totale=0;
            }
        });
    }
}
