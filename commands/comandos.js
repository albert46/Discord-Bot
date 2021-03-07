const Discord = require("discord.js")
const config = require("../config.json")
exports.run = async (client, message, args) => {
  
  const embed = new Discord.MessageEmbed()
      .setTitle("Comandos de "+client.user.username)
      .setColor(config.color)
      .setThumbnail(client.user.displayAvatarURL())
      .addField("BOT", "`ayuda, comandos, botinfo, ping`")
      .addField("Información", "`serverinfo, userinfo`")
      .addField("Moderación", "`ban, kick, purge, mute, unmute`")
      .addField("Útiles", "`avatar`")
      message.channel.send(embed);
}
module.exports.config = {
  name: "comandos",
  desc: "Muestra los comandos del bot",
  aliases: ["commands"]
}