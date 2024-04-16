const axios = require('axios');
module.exports.config = {
  name: 'poulyn',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['babes'],
  description: "An AI command powered by GPT-4",
  usage: "Poulyn [prompt]",
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
    api.sendMessage(`🎀 | 𝙿𝚘𝚞𝚕𝚢𝚗 | 
━━━━━━━━━━━━━━━━\nHello! 👋 Kumusta araw mo bhe?`, event.threadID, event.messageID);
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return;
  }
  api.setMessageReaction('🤍', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddyserver3.onrender.com/ai", {prompt: input, user: name});
  const response = data.msg;
  api.sendMessage(`🎀 | 𝙿𝚘𝚞𝚕𝚢𝚗 | 
━━━━━━━━━━━━━━━━\n${response}`, event.threadID, event.messageID);
    await api.setMessageReaction('💚', event.messageID, () => {}, true);
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
