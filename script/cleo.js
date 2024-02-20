const axios = require('axios');
module.exports.config = {
  name: 'cleo',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt'],
  description: "An AI command powered by GPT-4",
  usage: "Cleo [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Cleo is ready to help you, please specify your questions.`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Finding answers...`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.post("https://codebuddy-server.onrender.com/ai", {prompt: input});
  
    
    const response = data.msg;
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿     𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 v2    ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━
${response}
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT THE DEVELOPER, RENZ CLEO IF THERE'S STILL A PROBLEM.', event.threadID, event.messageID);
  }
};
