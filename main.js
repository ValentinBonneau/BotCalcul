const {Client, Intents, MessageActionRow, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const {token} = require("./config.json");

const number = [["(", ")", " ", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "del", "="]]


client.login(token);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        let a, b, r;
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
            case 'calcul':

                const rows = messageCalculatriceRows();

                await interaction.reply({
                    embeds: [
                        {
                            title: "Votre calcul",
                            description: "...",
                            color: null
                        }]
                    , components: rows
                })
                break;
        }
    } else if (interaction.isButton()) {
        interaction.deferUpdate();
        const action = interaction.customId.slice(2);
        let embed = interaction.message.embeds[0];
        switch (action) {
            case "del":
                if (embed.description !== '...' && embed.description !== '> ') {
                    embed.description = embed.description.slice(0, embed.description.length - 1)
                }
                interaction.message.edit({
                    embeds: [
                        embed
                    ],
                    components: messageCalculatriceRows()
                })
                break;
            case "=":
                embed.title = embed.description.slice(2) + " =";
                embed.description = eval(embed.description.slice(2)).toString();
                interaction.message.edit({
                    embeds: [
                        embed
                    ],
                    components: []
                });
                break;
            default:
                if (embed.description === '...') {
                    embed.description = "> " + action;
                } else {
                    embed.description += action;
                }
                interaction.message.edit({
                    embeds: [
                        embed]
                    , components: messageCalculatriceRows()
                })
                break;
        }

    } else {
        console.log(interaction.type);
    }

});


function messageCalculatriceRows() {
    var rows = []
    number.forEach(function (row) {
        rows.push(new MessageActionRow())
        row.forEach(function (char) {
            switch (char) {
                case " ":
                    rows[rows.length - 1].addComponents(
                        new MessageButton()
                            .setCustomId("useless")
                            .setLabel(" ")
                            .setStyle(2)
                            .setDisabled(true)
                    )
                    break;
                case "=":
                    rows[rows.length - 1].addComponents(
                        new MessageButton()
                            .setCustomId("id" + char)
                            .setStyle(3)
                            .setLabel(char)
                    )
                    break;
                case "del":
                    rows[rows.length - 1].addComponents(
                        new MessageButton()
                            .setCustomId("id" + char)
                            .setStyle(4)
                            .setLabel(char)
                    )
                    break;
                default:
                    rows[rows.length - 1].addComponents(
                        new MessageButton()
                            .setCustomId("id" + char)
                            .setStyle(1)
                            .setLabel(char)
                    )
                    break;
            }
        })

    })
    return rows
}



