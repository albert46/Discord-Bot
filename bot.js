const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log("Listo Para funcionar!");
      client.user.setPresence({
        status: "online",
        game: {
            name: "Also" ,
            url: "https://www.twitch.tv/",
            type: "STREAMING"
        }
    });

});


let prefix = config.prefix;


client.on("message", (message) => {
          const args = message.content.slice(prefix.length).trim().split(/ +/g);        
          const command = args.shift().toLowerCase();
         if(!message.content.startsWith(prefix)) return;
        
    if (command === "ping") {        
        let ping = Math.floor(message.client.ping);
        message.channel.send(":ping_pong: Pong!, "+ ping + "ms");
    } else 
  
  if (command === 'embed') {
            const embed = new Discord.RichEmbed()
            .setTitle('Embed test')
            .setColor("0x3399ff")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription('Titulo de ejemplo de valor')
            .addField('valor', 'plata')
            .addField('valor', 'oro', true)
            .addField('valor', 'Demons', true)
            .addField('valor', 'platino', true)
            .setImage('https://resize.rbl.ms/simage/https%3A%2F%2Fassets.rbl.ms%2F5469110%2F980x.jpg/2000%2C2000/tM1wmp2yDYi8sinb/img.jpg')
            .setThumbnail(message.author.displayAvatarURL)

            message.channel.send({ embed });
  }
  
  else if(command === "ayuda") {


const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Ping', 'Compueba la latencia del BOT con la API de discord', true)
    .addField('Avatar', 'Muestra el avatar de un usuario', true)
    .addField('Server', 'Muestra información de un servidor', true)
    .addField('Ban', 'Banear a un usuario del servidor incluye razon.', true)
    .addField('Kick', 'Expulsar a un usuario del servidor incluye razon.', true)
    .addField('Invitacion', '[Link de invitacion](https://discord.gg/KBdCuRU)', true)
    .setFooter("Version 1.0", client.user.avatarURL)
    .setColor(0x66b3ff)
    
message.channel.send(embed);  

} else if(command === "avatar") {
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  const embed = new Discord.RichEmbed()
  .setDescription(`Avatar de ${user}`)
  .setImage(user.displayAvatarURL)
  message.channel.send(embed)  
  
} else if(command === "botinfo") {


  
} else  if(command === "serverinfo") {
           const embed = new Discord.RichEmbed()
          
           .setThumbnail(message.guild.iconURL)           
           .setAuthor(message.guild.name, message.guild.iconURL)
           .addField('ID', message.guild.id, true)
           .addField('Region', message.guild.region, true)  
           .addField('Owner', message.guild.owner.user.tag, true)
           .addField('> Miembros', "Bots: "+message.guild.members.filter(x => x.user.bot).size+"\nMiembros: "+message.guild.members.filter(x => !x.user.bot).size+"\nTotal: "+message.guild.memberCount, true)
           .addField('ServerRoles', message.guild.roles.size, true)
           .setColor('404040')
           
           
           message.channel.send({embed});
        } else if(command === "kick") {
  let user = message.mentions.users.first();
let razon = args.slice(1).join(' ');

var perms = message.member.hasPermission("KICK_MEMBERS");

if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);

if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
     
message.guild.member(user).kick(razon);
message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);

  } else 
if(command === "ban") {

if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send("No tengo permisos")
}
  
if(!message.member.hasPermission("BAN_MEMBERS")){
    return message.channel.send("Perdon, pero no tienes permisos")
}

let persona = message.mentions.members.first()
if(!persona) {
    return message.channel.send('Debe mencionar a alguien para banear')
}else if(persona.highestRole.comparePositionTo(message.member.highestRole) > 0){
    return message.channel.send("Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo")
} 


var razon = args.slice(1).join(' ') 
if(!razon) {
  razon = `Razon no especificada` 
}
  
razon = razon+`, Baneado por ${message.author.tag}`
    
persona.ban(razon).catch(e => message.reply("Ocurrio un **error** desconocido"))
message.channel.send(`Listo, banee a **${persona.user.tag}**`)
   } else 
  
  if(command == "send") {
let texto = args.slice(1).join(" ")
let user = message.mentions.users.first() || client.users.get(parseInt(args[0]));
if(!user || !texto) return message.channel.send("Debes de mencionar y añadir un mensaje")
user.send(texto)

  
} else {
        const embed = new Discord.RichEmbed()
        .setImage('https://media1.tenor.com/images/4053349e84da2c52c649f6adf71f38f2/tenor.gif?itemid=11924336')
        .setDescription("Comando Desconocido")
    return message.channel.send(embed)
} 

});

client.login(config.token);
