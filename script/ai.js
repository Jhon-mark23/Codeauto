const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
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
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿     𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 v2    ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━  
How can I help you today?
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction('🔍', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.post("https://codebuddyserver2.onrender.com/gpt", {prompt: input, user: name});
  const response = data.msg;
    
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿     𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆       ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━  
${response}
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    await api.setMessageReaction('✅', event.messageID, () => {}, true);
  } catch (error) {
    api.setMessageReaction('⚠️', event.messageID, () => {}, true);
  }
};
