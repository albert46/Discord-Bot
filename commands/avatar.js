const Discord = require("discord.js")
const config = require("../config.json")
exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author;
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Avatar de ${user.username}`)
    .setImage(user.displayAvatarURL);
    message.channel.send(embed);
}
module.exports.config = {
  name: "avatar",
  desc: "Muestra el avatar de un usuario",
  aliases: ["avatar"]
}