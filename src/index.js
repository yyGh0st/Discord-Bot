const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ]
})
    


client.on('ready', (c) => {
    console.log(`✅ • ${c.user.tag} is online.`)
});

client.login(process.env.TOKEN);


client.on('messageCreate', (msg) => {
    if(msg.author.bot) {
        return;
    }
    if(msg.content === 'hello'){
        msg.reply("hello")
    }
 console.log(`${msg.author.tag} = ${msg.content}`)
})

client.on('interactionCreate', async (interaction) => {
    
    try {
    
        if(interaction.commandName === "imageai") {
            interaction.reply("Loading...");
            const predict = async function (interactionchannel) {
                const response = await openai.createImage({
                    prompt: interaction.options.get('prompt').value,
                    n: 1,
                    size: "256x256",
                });
                 const answer = new EmbedBuilder()
                    .setTitle('Image Generated')
                    .setImage(response.data.data[0].url)
                    
                 
                    interaction.editReply({ content: null, embeds: [answer]});
                }
            predict(interaction.channel);

        }
    
    } catch (error) {
        console.log(error)
    }
})


const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

const openai= new OpenAIApi(config);


