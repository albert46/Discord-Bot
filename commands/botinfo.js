const Discord = require("discord.js")
const config = require("../config.json")
const moment = require("moment");
    require("moment-duration-format");
exports.run = async (client, message, args) => {
  
    const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");

    const embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle("Estadísticas del bot")
      .addField("Dueño", "```css\n[Dracule Mihawk™ ]#4449```")
      .addField("Versión", "```css\nv0.1.0```")
      .addField("Memoria", "```css\n"+(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)+" MB```")
      .addField("Uptime", "```css\n"+actividad+"```")
      .addField("Servidores", "```css\n"+client.guilds.cache.size+"```", true)
      .addField("Usuarios", "```css\n"+client.users.cache.size+"```", true);
      message.channel.send(embed);
  }
module.exports.config = {
  name: "botinfo",
  desc: "Muestra las estadísticas del bot",
  aliases: ["stats"]
}