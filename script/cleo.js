const axios = require('axios');
module.exports.config = {
  name: 'cleo',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt'],
  description: "An AI command powered by GPT-4",
  usage: "Cleo [prompt]",
  credits: 'Renz Cleo',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const info = await api.getUserInfo(event.senderID);
  const name = info[event.senderID].name;
  const input = args.join(' ');
  if(!input){
    api.sendMessage(`🗨 | 𝙲𝚕𝚎𝚘 | 
━━━━━━━━━━━━━━━━ Hello! 👋 How can I assist you today?`, event.threadID, event.messageID);
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return;
  }
  api.setMessageReaction('⏱️', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddy-server.onrender.com/cleo", {prompt: input, user: name});
  const response = data.msg;
  api.sendMessage(`🗨 | 𝙲𝚕𝚎𝚘 | 
━━━━━━━━━━━━━━━━ ${response}`, event.threadID, event.messageID);
    await api.setMessageReaction('✅', event.messageID, () => {}, true);
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
