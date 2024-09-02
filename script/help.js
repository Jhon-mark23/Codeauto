const commands = {
  ai: {
    name: "Ai",
    info: "An artificial intelligence powered by Google (Gemini).",
    usage: "ai <question>"
  },
  cleo: {
    name: "Cleo",
    info: "A character artificial intelligence made by Renz Cole (Gemini powered).",
    usage: "cleo <question>"
  },
  lyrics: {
    name: "Lyrics",
    info: "Use to search for lyrics.",
    usage: "lyrics <title>"
  },
  music: {
    name: "Music",
    info: "Use to play music from youtube.",
    usage: "music <title>"
  },
  pedro: {
    name: "Pedro",
    info: "A character artificial intelligence based in Catholic religion made by Renz Cole",
    usage: "pedro <question>"
  },
  poulyn: {
    name: "Poulyn",
    info: "A character artificial intelligence that speaks tagalog made by Renz Cole",
    usage: "poulyn <question>"
  },
  qoute: {
    name: "Qoute",
    info: "Sends a random qoute.",
    usage: "qoute"
  },
  shoti: {
    name: "Shoti",
    info: "Sends a random cute girls.",
    usage: "shoti"
  },
  unsend: {
    name: "Unsend",
    info: "Unsent bot messages",
    usage: "reply \"unsend\" to bot chat."
  },
}
module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['commands'],
  description: "",
  usage: "help",
  credits: 'Renz Cleo',
  cooldown: 0,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  if (args[0]) {
    const command = args[0].toLowerCase();
    if (commands[command]) {
      const { name, info, usage } = commands[command];
      return api.sendMessage(`𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽👾\n━━━━━━━━━━━━━━━━\n𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${name}\n𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${info}\n𝚄𝚜𝚊𝚐𝚎: ${usage}\n━━━━━━━━━━━━━━━━`)
    }else{
      return api.sendMessage(`Command not found. Type info to view all available commands.`)
    }
    
  }
  
  api.sendMessage(`𝚃𝚄𝚃𝙴𝙻 𝙱𝙾𝚃 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂👾
━━━━━━━━━━━━━━━
  ★ Ai
  ★ Aii
  ★ Adduser
  ★ Cleo
  ★ Lyrics
  ★ Music 
  ★ Leave 
  ★ Pedro 
  ★ Poulyn
  ★ Quote
  ★ Shoti
  ★ Unsend
━━━━━━━━━━━━━━━
𝗙𝗼𝗹𝗹𝗼𝘄 𝘁𝗵𝗲 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: https://www.facebook.com/profile.php?id=100030880666720&mibextid=ZbWKwL`, event.threadID, event.messageID);
};
