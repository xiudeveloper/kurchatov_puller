// process.env.var
const superagent = require('superagent');
const fs = require('fs');
const discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const allIntents = discord.Intents.FLAGS.GUILDS;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const env = require('dotenv').config()
const token = process.env.token


console.log('kurchatov is starting')
client.login(token);

client.on("ready", () => {
	console.log('logging to discord')
});

function loadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
        ? fs.readFileSync(filename).toString()
        : 'null'
    )
}

function saveJSON(filename = '', json = '') {
    return fs.writeFileSync(filename, JSON.stringify(json, null, 2))
}

setInterval(async () => {
    await superagent.get('https://search.roblox.com/catalog/json?CatalogContext=2&Category=6&SortType=3&ResultsPerPage=20').then(res => {
        res = res.body

        const logged = loadJSON('Logged.json')
        const blacklisted = loadJSON('Blacklisted.json')

        res.forEach(element => {
            function Check1(num) {
                return num === element.AssetId
            }
    
            function Check2(str) {
                return str === element.Creator
            }

            if (logged.some(Check1) || blacklisted.some(Check2)) return

            var created = element.CreatedDate
            created = created.replace(/[^0-9]/g, '')
            const unixTime = created
            const date = new Date(parseInt(unixTime))

            try {
                console.log(`Type: Model | Name: ${element.Name} | Asset ID: ${element.AssetId} | Creator: ${element.Creator}`)
				client.channels.cache.get("898281779880931401").send(`》 Type: Model\n》 Name: ${element.Name}\n》 Asset ID: ${element.AssetId}\n》 Creator: ${element.Creator}\n》 Link: https://www.roblox.com/library/${element.AssetId}/`);
                logged.push(element.AssetId)
                saveJSON('Logged.json', logged)
            } catch (error) {
                console.error('Error trying to log: ', error)
            }

        })
    })
}, 5000)

setInterval(async () => {
    await superagent.get('https://search.roblox.com/catalog/json?CatalogContext=2&Category=7&SortType=3&ResultsPerPage=20').then(res => {
        res = res.body

        const logged = loadJSON('Logged.json')
        const blacklisted = loadJSON('Blacklisted.json')

        res.forEach(element => {
            function Check1(num) {
                return num === element.AssetId
            }
    
            function Check2(str) {
                return str === element.Creator
            }

            if (logged.some(Check1) || blacklisted.some(Check2)) return

            var created = element.CreatedDate
            created = created.replace(/[^0-9]/g, '')
            const unixTime = created
            const date = new Date(parseInt(unixTime))

            try {
                console.log(`Type: Plugin | Name: ${element.Name} | Asset ID: ${element.AssetId} | Creator: ${element.Creator}`)
				client.channels.cache.get("898281779880931401").send(`》 Type: Plugin\n》 Name: ${element.Name}\n》 Asset ID: ${element.AssetId}\n》 Creator: ${element.Creator}\n》 Link: https://www.roblox.com/library/${element.AssetId}/`);
                logged.push(element.AssetId)
                saveJSON('Logged.json', logged)
            } catch (error) {
                console.error('Error trying to log: ', error)
            }

        })
    })
}, 5000)

setInterval(() => {
    saveJSON('Logged.json', [])
}, 300000)

