const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Search for images on Pinterest.",
  usages: "pinterest [query]",
  credits: "Developer",
};

async function getPinterestImages(query) {
  try {
    const { data } = await axios.get(`https://nash-api-end.onrender.com/pinterest?search=${encodeURIComponent(query)}`);
    return data.data.data;
  } catch (error) {
    throw error;
  }
}

module.exports.run = async function({ api, event, args, prefix }) {
  const input = args.join(' ');
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  if (!input) {
    api.sendMessage(`To get started, type Pinterest followed by the name of the image you are looking for.\n\nExample:\n\n${prefix}pinterest soyeon`, event.threadID, event.messageID);
  } else {
    try {
      const key = input.trim();
      api.sendMessage(`Searching for ${key}`, event.threadID, event.messageID);
      const images = await getPinterestImages(key);
      let file = [];

      for (let i = 0; i < images.length; i++) {
        const path = `./script/cache/${timestamp}_${i + 1}.jpg`;
        const download = (await axios.get(images[i], { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(download, 'utf-8'));
        file.push(fs.createReadStream(path));
      }

      await api.sendMessage({
        attachment: file,
        body: ""
      }, event.threadID, (err) => {
        if (!err) {
          for (let i = 0; i < images.length; i++) {
            fs.unlinkSync(`./script/cache/${timestamp}_${i + 1}.jpg`);
          }
        }
      }, event.messageID);
    } catch (error) {
      console.log(error);
      api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};