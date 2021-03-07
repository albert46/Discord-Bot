const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;

client.on("Listo acccion", () => {
  console.log("redy");
  setInterval(function() {
    let statuses = [`[w]w. | ${client.guilds.cache.size} guilds`];
    let status = Math.floor(Math.random() * statuses.length);
    let dstatus = statuses[status];
    client.user.setPresence({
      activity: {
        name: `${dstatus}`,
        type: "WATCHING"
      },
      status: "idle"
 });
  }, 5000);  //// WATCHING, STREAMING, MOBILE, LISTENING
});

const fs = require("fs");
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("[LOGS] No se han encontrado comandos")
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      client.aliases.set(alias, pull.config.name)
    });
  });
});

client.on("message", message => {
  if(message.author.bot || message.channel.type === "dm") return;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1);
  let com = cmd.slice(prefix.length)
  if(!message.content.startsWith(prefix)) return;

  let commandFile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
  if(commandFile) commandFile.run(client, message, args)

});

client.login(config.token);