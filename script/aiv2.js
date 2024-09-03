const axios = require('axios');

module.exports.config = {
  name: 'aiv2',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt-3.5', 'turbo'],
  description: "An AI command powered by GPT-3.5 Turbo",
  usage: "Ai-v2 [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'aiv2'. For example: 'aiv2 What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage('Please wait...', event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://nash-api-end.onrender.com/gpt-3_5-turbo?prompt=${encodeURIComponent(input)}`);
    const response = data.result.reply;

    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
