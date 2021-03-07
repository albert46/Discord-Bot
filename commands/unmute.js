const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "!unmute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("No tienes suficientes permisos para ejecutar este comando");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("No tengo suficientes permisos para usar estos ")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("mencione a un usuario para mutear!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No hay razón"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Mihawk-Muted")
if(!muterole) return message.channel.send("Ese usuario no está muteado")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hola, has sido desmuteado en ${message.guild.name}. Razón del mute: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} fue desmuteado correctamente.`)
})

//send an embed to the modlogs channel
let embed = new RichEmbed()
.setColor('#fffff')
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "#📥log")
sChannel.send(embed)

    }
}
