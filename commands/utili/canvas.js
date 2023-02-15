const {MessageEmbed,MessageAttachment} = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    name: 'canvas',
    description: 'Canvas',
    cooldown:5,
    options:[
        {
            name: 'testo',
            description: 'Inserisci del testo',
            type: 'STRING',
            required:true
        },
        {
            name: 'sfondo',
            description: 'colore sfondo',
            type: 'STRING',
            choices:[
                {
                    name:'AQUA',
                    value:'AQUA'
                },
                {
                    name:'BLUE',
                    value:'BLUE'
                },
                {
                    name:'GOLD',
                    value:'GOLD'
                },
                {
                    name:'GREEN',
                    value:'GREEN'
                },
                {
                    name:'GREY',
                    value:'GREY'
                },
                {
                    name:'NAVY',
                    value:'NAVY'
                },
                {
                    name:'ORANGE',
                    value:'ORANGE'
                },
                {
                    name:'PURPLE',
                    value:'PURPLE'
                },
                {
                    name:'RED',
                    value:'RED'
                },
                {
                    name:'WHITE',
                    value:'WHITE'
                },
                {
                    name:'YELLOW',
                    value:'YELLOW'
                },
                {
                    name:'FUCHSIA',
                    value:'FUCHSIA'
                },
                {
                    name:'DARK_AQUA',
                    value:'DARK_AQUA'
                },
                {
                    name:'DARK_BLUE',
                    value:'DARK_BLUE'
                },
                {
                    name:'DARK_BUT_NOT_BLACK',
                    value:'DARK_BUT_NOT_BLACK'
                },
                {
                    name:'DARK_GOLD',
                    value:'DARK_GOLD'
                },
                {
                    name:'DARK_GREEN',
                    value:'DARK_GREEN'
                },
                {
                    name:'DARK_GREY',
                    value:'DARK_GREY'
                },
                {
                    name:'DARK_NAVY',
                    value:'DARK_NAVY'
                },
                {
                    name:'DARK_ORANGE',
                    value:'DARK_ORANGE'
                },
                {
                    name:'DARK_PURPLE',
                    value:'DARK_PURPLE'
                },
                {
                    name:'DARK_RED',
                    value:'DARK_RED'
                },
                {
                    name:'RANDOM',
                    value:'RANDOM'
                },
                {
                    name:'DEFAULT',
                    value:'DEFAULT'
                },
            ]
        },
        {
            name: 'colore',
            description: 'colore',
            type: 'STRING',
            choices:[
                {
                    name:'AQUA',
                    value:'AQUA'
                },
                {
                    name:'BLUE',
                    value:'BLUE'
                },
                {
                    name:'GOLD',
                    value:'GOLD'
                },
                {
                    name:'GREEN',
                    value:'GREEN'
                },
                {
                    name:'GREY',
                    value:'GREY'
                },
                {
                    name:'NAVY',
                    value:'NAVY'
                },
                {
                    name:'ORANGE',
                    value:'ORANGE'
                },
                {
                    name:'PURPLE',
                    value:'PURPLE'
                },
                {
                    name:'RED',
                    value:'RED'
                },
                {
                    name:'WHITE',
                    value:'WHITE'
                },
                {
                    name:'YELLOW',
                    value:'YELLOW'
                },
                {
                    name:'FUCHSIA',
                    value:'FUCHSIA'
                },
                {
                    name:'DARK_AQUA',
                    value:'DARK_AQUA'
                },
                {
                    name:'DARK_BLUE',
                    value:'DARK_BLUE'
                },
                {
                    name:'DARK_BUT_NOT_BLACK',
                    value:'DARK_BUT_NOT_BLACK'
                },
                {
                    name:'DARK_GOLD',
                    value:'DARK_GOLD'
                },
                {
                    name:'DARK_GREEN',
                    value:'DARK_GREEN'
                },
                {
                    name:'DARK_GREY',
                    value:'DARK_GREY'
                },
                {
                    name:'DARK_NAVY',
                    value:'DARK_NAVY'
                },
                {
                    name:'DARK_ORANGE',
                    value:'DARK_ORANGE'
                },
                {
                    name:'DARK_PURPLE',
                    value:'DARK_PURPLE'
                },
                {
                    name:'DARK_RED',
                    value:'DARK_RED'
                },
                {
                    name:'RANDOM',
                    value:'RANDOM'
                },
                {
                    name:'DEFAULT',
                    value:'DEFAULT'
                },
            ]
        },
        {
            name: 'embed',
            description: 'Inserisci del testo',
            type: 'BOOLEAN',
            choices:[
                {
                    name: 'si',
                    value:true
                },
                {
                    name: 'no',
                    value:false
                },
            ]
        },
        {
            name: 'g-font',
            description: 'Inserisci la grandezza in numero da 40 a 200',
            type: 'STRING',
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client,interaction) {
        const _embed=interaction.options.getBoolean('embed')
        const testo=interaction.options.getString('testo')
        const sfondo=interaction.options.getString('sfondo')
        const colore=interaction.options.getString('colore')
        const fontS=interaction.options.getString('g-font')
        

        let canvas=createCanvas(1600,600)//creazione canvas | 2 parametri (largezza, altezza)
        let ctx=canvas.getContext('2d')
        let w=canvas.width
        let h=canvas.height

        //sfondo
        ctx.fillStyle='#000'
        ctx.fillRect(0,0,w,h)//posx,posy,larg,alt
        
        //rettangolo
        if(sfondo){
            ctx.fillStyle=sfondo
        }else{
            ctx.fillStyle='#ff6800'
        }
        ctx.fillRect(60,60,w-60-60,h-60-60)//posx,posy,larg,alt

        //crearescritte
        if(colore){
            ctx.fillStyle=colore
        }else{
            ctx.fillStyle='#000'
        }
        ctx.textAlign="center"

        if(fontS){
            ctx.font=`${fontS}px fire`//fire glich
        }else{
            ctx.font=`80px fire`//fire glich
        }
        
        if(testo) ctx.fillText(`${testo}`,w/2,h/2)//testo,posx,posy

        //mandare il canvas
        if(_embed==true){
            let att=new MessageAttachment(canvas.toBuffer(),'canvas.png')

            let embed=new MessageEmbed()
            .setColor('DARK_GREEN')
            .setImage('attachment://canvas.png')

            interaction.reply({embeds:[embed], files:[att]})
        }else{
            let att=new MessageAttachment(canvas.toBuffer(),'canvas.png')

            interaction.reply({content:'✅',ephemeral:true})
            interaction.channel.send({files:[att]})
        }
    }
}