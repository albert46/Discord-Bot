  const Discord = require("discord.js")
const config = require("../config.json")
exports.run = async (client, message, args) => {
  
         const embed = new Discord.MessageEmbed()
        .setTitle(client.user.username, 'https://cdn.discordapp.com/emojis/716772474729136168.gif?v=1')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription("Soy Mihawk, un bot con temática anime.\n> Mi prefijo es ``w.``\n> Para ver mis comandos, ejecuta `w.comandos`",)
        .addField("> >  **·**Servidor de Soporte**·**", "[**·**Servidor de Soporte**·**](https://discord.gg/JmJuVtM)")
        .addField("> >  **·**Invitame**·**", "[**·**Invitame**·**](https://discord.com/oauth2/authorize?client_id="+client.user.id+"&permissions=8&scope=bot)")
        .setColor(config.color)
  .setFooter("Mihawk Ayuda.", 'https://cdn.discordapp.com/emojis/716772474729136168.gif?v=1');
    message.channel.send(embed); 
}

module.exports.config = {
  name: "ayuda",
  desc: "Muestra los links y comandos principales del bot",
  aliases: ["help"]
}