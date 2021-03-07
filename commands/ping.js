  
const Discord = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",

  description: "Returns latency and API ping",
  timeout: 10000,
  run: async (bot, message, args) => {
    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setDescription(
          `🏓 Pong!\nLa Latencia es ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nLa API Latencia es ${Math.round(bot.ws.ping)}ms`
        )
        .setColor("RANDOM");
      msg.edit(_);
      msg.edit("\u200B");
    });
  },
}
module.exports.config = {
  name: "ping",
  desc: "Muestra la latencia del bot",
  aliases: ["ping"]
}