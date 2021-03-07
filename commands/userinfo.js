const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  
    let texto = args.join(" ");
  
    if (!texto) {
      let usuario = message.author;
      const embed = new Discord.MessageEmbed()
      .setThumbnail(usuario.avatarURL)
      .setAuthor(usuario.username + "#" + usuario.discriminator, usuario.avatarURL)
      .addField("Jugando:", usuario.presence.game != null ? usuario.presence.game.name : "Nada")
      .addField("id:", usuario.id, true)
      .addField("Estado:", usuario.presence.status, true)
      .addField("Creado el:", usuario.createdAt.toDateString(), true)
      .addField("Se unio al server el:", message.member.joinedAt.toDateString())
      .setColor(0x66b3ff);
      message.channel.send(embed);
      
    } else if(texto) {
      let iduser = isNaN(texto);
      if (iduser) return message.channel.send("No es una ID.");
      let usuario = client.users.get(texto);
      if (!usuario) return message.channel.send("No se ha encontrado el usuario");
      if (!message.guild.members.get(texto)) {
        const embed = new Discord.RichEmbed()
          .setThumbnail(usuario.avatarURL)
          .setAuthor(usuario.username + "#" + usuario.discriminator, usuario.avatarURL)
          .addField("Jugando:", usuario.presence.game != null ? usuario.presence.game.name : "Nada")
          .addField("id:", usuario.id, true)
          .addField("Estado:", usuario.presence.status, true)
          .addField("Creado el:", usuario.createdAt.toDateString(), true)
          .addField("Roles:", "`@everyone`")
          .setColor(0x66b3ff);
          message.channel.send(embed);
          return;
      }
      if(message.guild.members.get(texto)) {
        const embed = new Discord.RichEmbed()
          .setThumbnail(usuario.avatarURL)
          .setAuthor(usuario.username + "#" + usuario.discriminator, usuario.avatarURL)
          .addField("Jugando:", usuario.presence.game != null ? usuario.presence.game.name : "Nada")
          .addField("id:", usuario.id, true)
          .addField("Estado:", usuario.presence.status, true)
          .addField("Creado el:", usuario.createdAt.toDateString(), true)
          .addField("Roles:", message.guild.members.get(texto).roles.map(roles => `\`${roles.name}\``).join(", "))
          .setColor(config.color);
        message.channel.send(embed);
      }
    }
}
module.exports.config = {
  name: "userinfo",
  aliases: ["user"]
}