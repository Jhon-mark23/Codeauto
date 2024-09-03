const axios = require("axios");
module.exports = {
  config: {
    name: "decrypt",
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "decrypt weak code",
  usage: "decrypt url",
  credits: ''
  },
  run: async function ({
    api: { sendMessage },
    args
  }) {
    const url = args[0];
    if (!url || !url.startsWith("https://")) {
      return sendMessage("Please provide a valid URL and make sure the url is a raw and contains an obfuscated code");
    }
    try {
      const {
        data: {
          result
        }
      } = await axios.post("https://apiv3-2l3o.onrender.com/decrypt", {
        url,
        token: "" // gist token (optional to upload to your own gist)
      });
      sendMessage(result);
    } catch (e) {
sendMessage(e.response?.data?.error || e.message || "An error occurred");
    }
  }
};
