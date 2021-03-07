const Discord = require("discord.js")
const config = require("../config.json")
exports.run = async (client, message, args) => {
  
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo permisos.");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Perdón, pero no tienes permisos.");

  let persona = message.mentions.members.first();
  if(!persona) return message.channel.send("Debe mencionar a alguien para banear");
  if(persona.highestRole.comparePositionTo(message.member.highestRole) > 0) return message.channel.send("Esta persona está en el mismo o mayor nivel de jerarquía que tú, no puedes banearlo.");
  
  const razon = args.slice(1).join(" ");
  if (!razon) razon = `Razon no especificada`;
  razon = razon + `, Baneado por ${message.author.tag}`;

    persona.ban(razon)
    .catch(e => message.channel.send("Ocurrió un error desconocido."));
    message.channel.send(`Listo, banee a **${persona.user.tag}**`);
}
module.exports.config = {
  name: "ban",
  aliases: ["ban"]
}