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
      const apiUrl = `https://lyrist.vercel.app/api/${encodeURIComponent(req.body.prompt)}`;
      await axios.get(apiUrl)
        .then(response =>{
          api.sendMessage(`🎧𝚃𝚒𝚝𝚕𝚎: ${response.data.title}\n👤𝙰𝚛𝚝𝚒𝚜𝚝: ${response.data.artist}\n\n${response.data.lyrics}`, event.threadID, event.messageID);
          api.setMessageReaction('💚', event.messageID, () => {}, true);
        })
  
  
  } catch (error) {
    api.sendMessage(`⚠️AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
 
};
