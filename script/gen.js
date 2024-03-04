module.exports.config = {
		name: "gen",
	  version: "25.0.0",
		hasPrefix: false,
		role: 0,
		description: "Generate image",
		usages: "[text]",
		credits: "Deku",
		aliases: ["gen"]
};

module.exports.run = async function ({ api, event, args }) {
		let t = args.join(" ");
		if (!t) return api.sendMessage('Missing prompt!', event.threadID, event.messageID);
		api.sendMessage('Processing request...', event.threadID, event.messageID);
		const axios = require('axios');
		const fs = require('fs');
		const { Prodia } = require("prodia.js");

		try {
				const prodia = new Prodia("70b8b086-24d8-4b14-b870-39efe453e5d3");
				const bestModel = ["absolutereality_V16.safetensors [37db0fc3]", "absolutereality_v181.safetensors [3d9d4d2b]", "amIReal_V41.safetensors [0a8a2e61]", "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]"];
				let url = [];
				let image = [];

				for (let i of bestModel) {
						const generate = await prodia.generateImage({
								prompt: t,
      
