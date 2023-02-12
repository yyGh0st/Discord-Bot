const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ]
});

const roles = [
    {
        id: '1074337565647310849',
        label: 'Blue'
    },
    {
        id:'1074337574333718598',
        label: 'Green'
    },
    {
        id:'1074337578645454868',
        label: 'Red'
    },
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1074338091952779334');
        if(!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Claim or remove a role',
            components: [row]
        })
        process.exit();
    } catch (error) {
        console.log(error)
    }
});

client.login(process.env.TOKEN);

