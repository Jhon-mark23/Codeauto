const axios = require('axios');
module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['info'],
  description: "",
  usage: "help [prompt]",
  credits: 'Renz Cleo',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  api.sendMessage(`𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 👾
━━━━━━━━━━━━━━━
  ★ Adduser 
  ★ Ai
  ★ Cleo
  ★ Gemini
  ★ Hercai
  ★ Lyrics
  ★ Music 
  ★ Pedro 
  ★ Poulyn
  ★ Qoute
  ★ Shoti
  ★ Unsend
━━━━━━━━━━━━━━━
𝗙𝗼𝗹𝗹𝗼𝘄 𝘁𝗵𝗲 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: https://www.facebook.com/bosscleo3233

𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗬𝗧: https://www.youtube.com/@CodeBuddySolutions`, event.threadID, event.messageID);
};
