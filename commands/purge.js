const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  
  if(!message.guild.me.permissionsIn(message.channel).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Perdón, pero no tengo permisos.");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Perdón, pero no tienes permisos.");

    if(!args) return message.channel.send("Escriba la cantidad de mensajes a eliminar.");
    let cantidadm = parseInt(args[0]);
    if(!cantidadm) return message.reply("Introduce un número, por favor.");

    if (cantidadm > 100) {
      message.channel.send("El máximo de mensajes que puedo borrar es 100, por lo tanto lo estableceré automáticamente ahí.");
      cantidadm = 100;
    }

    message.channel.send(message.author+" está borrando "+cantidadm+" mensajes");

    message.channel.fetchMessages({ limit: cantidadm }).then(mensajes => {
      var msgs = mensajes.filter(m => !m.pinned && !m.system);
      message.channel.bulkDelete(msgs).catch(e => {
          switch (e.message) {
            case "You can only bulk delete messages that are under 14 days old.": {
              message.channel.send("Solo puedo borrar mensajes con menos de 2 semanas de antigüedad.");
            }
            default: {
              console.log("Ocurrió un error desconocido en el comando para borrar mensajes \n" +e);
              message.channel.send("Err, no pude borrar los mensajes :exclamation:");
            }
          }
        });
    });
}
module.exports.config = {
  name: "purge",
  aliases: ["prune", "clear"]
}