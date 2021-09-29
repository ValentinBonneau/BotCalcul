const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const {token} = require("./config.json");

client.login(token);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        let a,b,r;
        switch (interaction.commandName) {
            case 'ping':
                await interaction.reply('Pong!');
                break;
            case 'adition':
                a = interaction.options.data[0].value
                b = interaction.options.data[1].value
                r = a + b
                await interaction.reply(a + "+" + b + "=" + r);
                break;
            case 'soustraction':
                a = interaction.options.data[0].value
                b = interaction.options.data[1].value
                r = a - b;
                await interaction.reply(a + "-" + b + "=" + r);
                break;
            case 'multiplication':
                a = interaction.options.data[0].value
                b = interaction.options.data[1].value
                r = a * b;
                await interaction.reply(a + "*" + b + "=" + r);
                break;
            case 'division':
                a = interaction.options.data[0].value
                b = interaction.options.data[1].value
                r = a / b;
                await interaction.reply(a + "/" + b + "=" + r);
                break;
        }

    }

});



