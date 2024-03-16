const axios = require('axios');
module.exports.config = {
  name: 'lyrics',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['song'],
  description: "An AI command powered by GPT-4",
  usage: "lyrics [prompt]",
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
    api.sendMessage(`Enter a song to search for lyrics 🎧.`, event.threadID, event.messageID);
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return;
  }
  api.setMessageReaction('🤍', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddyserver2.onrender.com/lyrics", {prompt: input, user: name});
  const response = data.msg;
  api.sendMessage(`🎧𝚃𝚒𝚝𝚕𝚎: ${data.msg.title}\n👤𝙰𝚛𝚝𝚒𝚜𝚝: ${data.msg.artist}\n\n${data.msg.lyrics}`, event.threadID, event.messageID);
    await api.setMessageReaction('💚', event.messageID, () => {}, true);
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
