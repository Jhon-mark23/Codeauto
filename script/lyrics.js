const axios = require('axios');
module.exports.config = {
  name: 'lyrics',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['lyric'],
  description: "An AI command powered by GPT-4",
  usage: "lyrics [prompt]",
  credits: 'Renz Cleo',
  cooldown: 0,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if(!input){
    api.sendMessage(`Enter a song to search for lyrics 🎧.`, event.threadID, event.messageID);
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return;
  }
  api.setMessageReaction('🎼', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddyserver2.onrender.com/", {prompt: input});
  const response = data.msg;
  api.sendMessage(`✝️ | 𝙿𝚎𝚍𝚛𝚘 | 
━━━━━━━━━━━━━━━━ ${response}`, event.threadID, event.messageID);
    await api.setMessageReaction('✅', event.messageID, () => {}, true);
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
