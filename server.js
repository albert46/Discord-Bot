const Discord = require('discord.js');
const reezutils = require('reezutils');
const reezdb = require('reezdb');
const fs = require('fs');

const client = new Discord.Client({
  ws: {
    intents: Discord.Intents.ALL
  }
});

client.canary = {
  mode: false
}

client.db = (client.canary.mode) ? new reezdb.database('principal') : new reezdb.database('canary');

client.dirname = __dirname;

let cfgs = fs.readdirSync(`${__dirname}/_configs`).filter(file => file.endsWith('.js'));

for (const config of cfgs) {
  client[config.substring(0, config.length - 3)] = require(`${__dirname}/_configs/${config}`);
}

client.handler.colecciones.forEach(coleccion => {
  client[coleccion] = new Discord.Collection();
});

let cmds = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));

for (const cmd of cmds) {
  let command = require(`${__dirname}/commands/${cmd}`);
  client.commands.set(command.config.name, command);
  let log = `Comando cargado: ${command.config.name}`;
  if (Array.isArray(command.config.alias)) {
    command.config.alias.forEach(alia => {
      client.alias.set(alia, command);
    });
    log += `, aliases: ${command.config.alias.join(', ')}`;
  } else {
    log += ', aliases: ninguno';
  }
}