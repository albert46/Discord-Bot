const Discord = require("discord.js")
const config = require("../config.json")
exports.run = async (client, message, args) => {
  
  let user = message.mentions.members.first();
  let razon = args.slice(1).join(" ");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No tienes permisos para usar este comando.");
  if(!user) return message.channel.send("Debes mencionar a alguien.")
  
  if(!razon) return message.channel.send("Escriba una razón, `w.kick @username [razón]`");
  if(!message.guild.member(user).kickable) return message.channel.send("No puedo expulsar al usuario mencionado.");

    message.guild.member(user).kick(razon)
    .then(message.channel.send("El usuario fue expulsado por **"+message.author.username+"**, con la razón: **"+razon+"**"))
}
module.exports.config = {
  name: "kick",
  aliases: ["kick"]
}