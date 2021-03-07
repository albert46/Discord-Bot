const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "!mute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("No tienes permiso para usar este comando.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("No tengo suficientes permisos")

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("mencione a un usuario para mutear");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No hay razón."

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Mihawk-Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Mihawk-Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                TALK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hola, has sido muteado en ${message.guild.name} con la razón: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} fue muteado correctamente.`)
})

//send an embed to the modlogs channel
let embed = new RichEmbed()
    .setColor('#fffff')
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "#📥log")
sChannel.send(embed)
    }
}