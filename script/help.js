const axios = require('axios');
module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['info'],
  description: "",
  usage: "Cleo [prompt]",
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
  ★ Music 
  ★ Pedro 
  ★ Poulyn 
  ★ Shoti
  ★ Pxart
  ★ Emojimix
  ★ Qoute
  ★ Unsend
━━━━━━━━━━━━━━━
𝗕𝗼𝘁 𝗼𝘄𝗻𝗲𝗿: 𝚁𝚎𝚗𝚣 𝙲𝚕𝚎𝚘

𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗔𝗶: https://codebuddy.great-site.net

𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗬𝗧: https://www.youtube.com/@CodeBuddySolutions`, event.threadID, event.messageID);
};
