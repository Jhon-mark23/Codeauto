const axios = require('axios');
module.exports.config = {
  name: 'ferdie',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['pastor'],
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
  const input = args.join(' ');
  if(!input){
    api.sendMessage(`✝️ | Ferdie | 
━━━━━━━━━━━━━━━━ Hello! 👋 How can I assist you today?`, event.threadID, event.messageID);
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return;
  }
  api.setMessageReaction('⏱️', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddy-server.onrender.com/ferdie", {prompt: input});
  const response = data.msg;
  api.sendMessage(`✝️ | Ferdie | 
━━━━━━━━━━━━━━━━ ${response}`, event.threadID, event.messageID);
    await api.setMessageReaction('✅', event.messageID, () => {}, true);
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
