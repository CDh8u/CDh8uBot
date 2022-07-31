//cdh8u owns this source code
var WebSocketClient = require('websocket').client;
var fs = require('fs')
var vm2lib = require('vm2')
var vm2 = new vm2lib.VM({ allowAsync: false });
var ws = new WebSocketClient();
var vm = '173.208.172.26:6010';
var discord = require('discord.js');
const token = process.env.TOKEN;
const client = new discord.Client({
  intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildMessages],
});
let hash = Math.random();
let banned = ['jjjj'];
let shortcuts = [];
let modchannel;
let chatlog;
const prefix = "cdh8u!";
client.login(token);
client.once("ready", function() {
  client.user.setActivity('DankVM', { type: "LISTENING" });
  console.log("started");
});
client.on("messageCreate", function command(message) {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    let command = message.content.replace(prefix, '');
    if (command == "help") {
      fs.readFile("commands.txt", (err, data) => {
        if (err) return console.error(err);
        message.reply(data.toString());
      });
    }
    if (command == "test") {
      message.reply("test");
    }
    if (command == "github") {
      message.reply("https://github.com/CDh8u/CDh8uBot");
    }
    if (command == "about") {
      message.reply("hosted in replit, source code by ibot");
    }
    if (command == "rockpaperscissors") {
      random = Math.floor(Math.random() * 3) + 1;
      if (random == 1) {
        message.reply("rock");
      } else if (random == 2) {
        message.reply("paper");
      } else {
        message.reply("scissors");
      }
      if (command == "yesmaybeno") {
        random = Math.floor(Math.random() * 3) + 1;
        if (random == 1) {
          message.reply("yes");
        } else if (random == 2) {
          message.reply("maybe");
        } else {
          message.reply("no");
        }
      }
      if (command == "flipcoin") {
        random = Math.floor(Math.random() * 2) + 1;
        if (random == 1) {
          message.reply("heads");
        } else {
          message.reply("tails");
        }
      }
      /*if (command.startsWith("math ")){
          math = command.replace('math ','');
          if (isNaN(eval(math))){
              message.reply("not a number");
          } else if (!(isNaN(eval(math)))){
              message.reply(String(eval(math)));
          }
      }*/
      if (command == "whoami") {
        message.reply(message.author.username);
      }
      if (command.startsWith("say ")) {
        message.reply(command.replace("say ", ""));
      }
      if (command.startsWith("uppercase ")) {
        message.reply(command.replace("uppercase ", "").toUpperCase());
      }
      if (command.startsWith("lowercase ")) {
        message.reply(command.replace("lowercase ", "").toLowerCase());
      }
      if (command == "invite") {
        message.reply("I dont have Discord. Sorry...");
      }
      if (command.startsWith("contact ")) {
        client.users.cache.get("922832070915538984").send(message.author.username + ": " + command.replace('contact ', ''));
      }
      if (command.startsWith("rickroll ")) {
        client.users.cache.get(message.mentions.users.first().id).send(message.author.username + " rickrolled you");
        client.users.cache.get(message.mentions.users.first().id).send("https://images-ext-2.discordapp.net/external/2rQ2r-jB10nU85_9PhMFLpfPTFODKl1y3LW_iI9POsw/https/i.gifer.com/Am7.gif");
      }
      if (command.startsWith("kick ") && message.guild.me.permissions.has("KICK_MEMBERS") && message.member.permissions.has("KICK_MEMBERS")) {
        message.guild.members.kick(message.mentions.users.first());
        message.reply(message.mentions.users.first().username + " was kicked");
      }
      if (command.startsWith("ban ") && message.guild.me.permissions.has("BAN_MEMBERS") && message.member.permissions.has("BAN_MEMBERS")) {
        message.guild.members.ban(message.mentions.users.first())
        message.reply(message.mentions.users.first().username + " was banned");
      }
      if (message.content == "amogus") {
        message.reply("sus");
      }
      if (command == "ping") {
        message.reply(Date.now() - message.createdTimeStamp + "ms");
      }
    }
  }
})

function connect() {
  ws.on('connect', function(f) {
    function send(string) {
      f.sendUTF(encodeCommand(['chat', string]));
    }
    function changeUsername(string) {
      f.sendUTF('6.rename,' + string.length + '.' + string + ';');
    }
    f.on('message', function(message) {
      var cmd = decodeCommand(message.utf8Data);
      changeUsername("CDh8uBot");
      //console.log(cmd);
      var username = cmd[1];
      let command = cmd[2];
      var prefix = "cdh8u!";
      //var args = command.slice(prefix.length).split(' ');

      //now here is the fun part
      //fuck you stupid error
      if (cmd[0] == "chat") {
        console.log(cmd)
        client.channels.cache.get("(replace this with your own id)").send(cmd[1] + ": " + cmd[2]);
        if (username == "CDh8uBot" || banned.includes(username)) {
          return;
        }
        if (command.startsWith(prefix + "echo ")) {
          send(command.replace(prefix + 'echo ', ''));
        }
        if (command.startsWith(prefix + "say ")) {
          send(command.replace(prefix + 'say ', ''));
        }
        if (command.startsWith(prefix + "eval " + hash.toString())) {
          try {
            //send(eval(command.replace(prefix + "eval " + hash.toString(),"")))
            send(vm2.run(command.replace(prefix + "eval " + hash.toString(), "")).toString())
          } catch (e) {
            send(e)
          }

          hash = Math.random();
          client.channels.cache.get("(replace this with your own id)").send("Hash: " + hash.toString());
        }
        if (command == prefix + "test") {
          send("hello world");
        }


        if (command == prefix + "help") {
          send("Welcome to CDh8uBot!");
          send("To get started, say cdh8u!commands.");
        }
        if (command == prefix + "commands") {
          send("This command now operates via GitHub.");
          send("https://raw.githubusercontent.com/CDh8u/CDh8uBot/main/commands.txt");
        }
        if (command == prefix + "hashsending") {
          send("This bot sends the hashes to discord.");
        }
        if (command == prefix + "quotefromcdh8u") {
          send("i love making stuff, espically when they are bad. -alan inter");
        }
        if (command == prefix + "whoami") {
          send(username);
        }

        if (command == prefix + "github") {
          send("https://github.com/CDh8u/CDh8uBot");
        }
        if (command == prefix + "about") {
          send("hosted in replit, thanks to iexist's ibot for the source code");
        }
        if (command.startsWith(prefix + "stop ")) {
          if (command.replace(prefix + "stop ", "") == hash.toString()) {
            send("ok boss im now shutting down");
            process.exit(1)
          } else {
            send("no hash? wow kiddo thats not how it works");
          }
        }
        if (command == prefix + "rockpaperscissors") {
          random = Math.floor(Math.random() * 3) + 1;
          if (random == 1) {
            send("rock");
          } else if (random == 2) {
            send("paper");
          } else {
            send("scissors");
          }
        }

        if (command.startsWith(prefix + "insult ")) {
          send(command.replace(prefix + "insult ", "") + " (user) is so yummy yummy yummy yummy fat fat fat")
        }
        if (command == prefix + "hash") {
          hash = Math.random();
          client.channels.cache.get("(replace this with your own id)").send("Hash: " + hash.toString());
          send("Hash sent, Say cdh8u!hashsending for more info.");
        }
        if (command == prefix + "truth") {
          send("firey100 loves firey underwear");
        }
        if (command == prefix + "whoownsthisstupidbot") {
          send("obviously cdh8u");
        }
        if (command == prefix + "since") {
          send("Has been operating since July 27, 2022.");
        }
        if (command == prefix + "cdh8u") {
          send("CDh8u is an 19 year old russian, Who owns this bot.");
          send("He also works at most projects, which are sometimes HTML5 (get it?)");
          send("You can also contact him! Discord: CDh8u#5106, Email: thedh8uthing10@outlook.com");
        }
        if (command == prefix + "version") {
          send("This bot is running v0.1.0 BETA.");
        }
        if (command == prefix + "favoritedrinks") {
          send("oh collabvm user, i would say my favorite is pepsi!");
        }
        if (command == prefix + "macos") {
          send("MacOS, by Apple might be one of the decent OSes i have seen.");
        }
          if (command == prefix + "windows") {
          send("My favorite OS, Windows, is here today. My most favorite one was Windows XP.");
          }
        if (command == prefix + "linux") {
          send("They are the reason why CollabVM exists.");
          }
        if (command == prefix + "yesorno") {
          random = Math.floor(Math.random() * 2);
          if (random == 1) {
            send("yes");
          } else {
            send("no");
          }
        }
        if (command == prefix + "cdh8uoriexist") {
          random = Math.floor(Math.random() * 2);
          if (random == 1) {
            send("cdh8u");
          } else {
            send("iexist");
          }
        }
        if (command == prefix + "flipcoin") {
          random = Math.floor(Math.random() * 2);
          if (random == 1) {
            send("heads");
          } else {
            send("tails");
          }
        }
        if (command.startsWith(prefix + "uppercase ")) {
          send(command.replace(prefix + "uppercase ", "").toUpperCase());
        }
        if (command.startsWith(prefix + "lowercase ")) {
          send(command.replace(prefix + "lowercase ", "").toLowerCase());
        }
        if (command.startsWith(prefix + "ban " + hash + " ")) {
          //send("wow! " + username + " (user) is so utterly retarded! can you believe it?");

          hash = Math.random();
          client.channels.cache.get("(replace this with your own id)").send("Hash: " + hash.toString());
          banned.push(command.replace(prefix + "ban " + hash + " ", ""));
          send("User is now blocked from using this bots commands");
        }
        if (command.startsWith(prefix + "unban " + hash + " ")) {
          //send("wow! " + username + " (user) is so utterly retarded! can you believe it?");

          hash = Math.random();
          client.channels.cache.get("(replace this with your own id)").send("Hash: " + hash.toString());
          banned = banned.filter(e => e !== command.replace(prefix + "unban " + hash + " ", ""));
          send("User is now unblocked from using this bots commands");
        }
      }
      setInterval(function() {
        if (f.connected) {
          f.sendUTF('3.nop;');
        }
      }, 2500);
    })
  })
  ws.connect('ws://(change this to an collabvm vm or an uservm ip)', 'guacamole');
}
function decodeCommand(string) {
  /*
  var sections = [];
  var bump = 0;
  while (sections.length <= 50 && cypher.length >= bump) {
    var current = cypher.substring(bump);
    var length = parseInt(current.substring(current.search(/\./) - 2));
    var paramater = current.substring(length.toString().length + 1, Math.floor(length / 10) + 2 + length);
    sections[sections.length] = paramater;
    bump += Math.floor(length / 10) + 3 + length;
  }
  sections[sections.length - 1] = sections[sections.length - 1].substring(0, sections[sections.length - 1].length - 1);
  return sections;
  */
  var pos = -1;
  var sections = [];
  for (; ;) {
    var len = string.indexOf('.', pos + 1);
    if (len == -1) {
      break;
    }
    pos = parseInt(string.slice(pos + 1, len)) + len + 1
    sections.push(string.slice(len + 1, pos)
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&#x2F;/g, '/')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
    );
    if (string.slice(pos, pos + 1) == ';') {
      break;
    }
  }
  return sections;
}
function encodeCommand(cypher) {
  /*
  var command = "";
  for (var i = 0; i < cypher.length; i++) {
    var current = cypher[i];
    command += current.length + "." + current;
    command += (i < cypher.length - 1 ? "," : ";");
  }
  return command;
  */
  var command = '';
  for (var i = 0; i < cypher.length; i++) {
    var current = cypher[i];
    command += current.length + '.' + current;
    command += (i < cypher.length - 1 ? ',' : ';');
  }
  return command;
}
connect();

