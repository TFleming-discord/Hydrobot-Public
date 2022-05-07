import Discord, { Intents, Message, User, UserManager, MessageEmbed } from 'discord.js'                          //bot setup
import cheerio from 'cheerio'
import fs from 'fs'
import {leaderboard} from './leaderboards.js'                                                      
import dotenv from 'dotenv'                                                                        
dotenv.config()                                                                                    
                                                                                                   
const bot = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})    
const prefix = "^"// defines the prefix bot will listen for                                        
var loggedActions = ["-------------------------BEGIN DUMP-------------------------"]//logs storage
var time = new Date();//callable current time var                                                  
var rpsActive = false
var lb = leaderboard
var tempNameHolder = []
console.log("leaderboard loaded into mem")
console.log(lb)

/////////////////////////////////////////////////////////////////////////////////////////////////////

function sleep(ms) {//sleep function to pause bot if needed
    return new Promise(resolve => setTimeout(resolve, ms));
}

function log(data){//func to store logs inside a variable, and push to console
    if(data !== undefined){//if data is passed through
        console.log(data);//console push
        loggedActions.push(data);//var push
    }
    else//if data is not passed through
    {
        return(loggedActions)//return the logs
    }
}

function rpsMinigame(msg, guess){//rock paper scissors func												//VVVVVVV all the possible responses for RPS
    var rpsResponses = ["I calculated this.", "I'm cracked, bro.", "Loser lol", "A tie!", "Close call...", "what", "I lost to someone like *you?*", "Congratulations, you're officially more efficient than an i7-9700k", "You're clearly cheating."]
    var emoji = msg.content.replace(prefix + "rps ","");//strip the message of un-needed data
    var concat = guess + "|" + emoji;//put users guess and Hydrobots guess into one string

    switch(concat){
        //guess = ✊
        case "0|✊"://if Hydrobot guesses 0 (Rock), and the user guesses hand fist (Rock)
            msg.reply("MY :fist: vs YOUR :fist:");//inform the user
            sleep(2000).then(() => {//wait 2 seconds, simulates the couple of seconds it takes people to realize who won
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 3]);//send a message from rpsResponses by looking at rpsResponses index 1-3, then adding 3 (thus only allowing TIED responses)
                
            })
        break;
        case "0|🖐️"://if Hydrobot guesses 0 (Rock), and the user guesses hand splayed (Paper)
            msg.reply("MY :fist: vs YOUR :hand_splayed:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 6]);//send a message from rpsResponses by looking at rpsResponses index 1-3, then adding 6 (thus only allowing LOSE responses)
        })
        break;
        case "0|✌️":
            msg.reply("MY :fist: vs YOUR :v:");//if Hydrobot guesses 0 (Rock), and the user guesses v (Scissors)
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3)]);//send a message from rpsResponses by only looking at rpsResponses index 1-3 (thus only allowing WIN responses)
                writeToLeaderboard(msg)
        })
        break;
        //guess = 🖐️ 
        case "1|✊":
            msg.reply("MY :hand_splayed: vs YOUR :fist:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3)]);
        })
        break;
        case "1|🖐️":
            msg.reply("MY :hand_splayed: vs YOUR :hand_splayed:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 3]);
        })
        break;
        case "1|✌️":
            msg.reply("MY :hand_splayed: vs YOUR :v:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 6]);
                writeToLeaderboard(msg)
        })
        break;
        //guess = ✌️
        case "2|✊":
            msg.reply("MY :v: vs YOUR :fist:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 6]);
        })
        break;
        case "2|🖐️":
            msg.reply("MY :v: vs YOUR :hand_splayed:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3)]);
        })
        break;
        case "2|✌️":
            msg.reply("MY :v: vs YOUR :v:");
            sleep(2000).then(() => {
                msg.channel.send(rpsResponses[Math.floor(Math.random() * 3) + 3]);
                writeToLeaderboard(msg)
    })}
    time = new Date();
    log("In " + msg.guild.name + ", " + msg.member.user.tag + " played Rock Paper Scissors " + concat + " at " + time.toLocaleString() + ".")
}
//

function writeToLeaderboard(msg){
    var user = msg.author.id 
    if(user in lb){
       console.log("User is in leaderboard.")
       var userOldScore = lb[user]
       lb[user] = lb[user] + 1
       fs.readFile("leaderboards.js", {encoding: 'utf8'}, function (err,data) {
           var formatted = data.replace("\"" + user + "\"" + ":" + userOldScore, "\"" + user + "\"" + ":" + lb[user]);
           console.log("Writing to file")
           console.log(lb)
           fs.writeFile("leaderboards.js", formatted, 'utf8', function (err) {
               if (err) return console.log(err);
            });
        });
    }
    else{
        console.log("User is NOT in leaderboard.")
        fs.readFile("leaderboards.js", {encoding: 'utf8'}, function (err,data) {
            console.log("Adding new index")
            lb[user] = 1
            var formatted = data.replace(/Null:0/g, "\"" + user + "\"" + ":" + 1 + ",\n    Null:0");
            console.log(lb)
            fs.writeFile("leaderboards.js", formatted, 'utf8', function (err) {
             if (err) return console.log(err);
            });
        });
    } 
}
/*doesn't work :(
function porn(msg){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=fat_honkin_breasts",
        method: "GET",
        header: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    request(options, function(error, response, responseBody) {
        console.log("tryina porn")
        if (error) {
            console.log("ERROR BRO")
            console.log(error)
            return;
        }
        
        var $ = cheerio.load(responseBody);

        console.log($)

        var links = $(".image a.link")
        
        console.log("--------------------------------------------------")

        console.log(links)

        var urls = new Array(links.length).fill(0).map((v, i) => ByteLengthQueuingStrategy.eq(i).attr("href"))

        console.log(urls)

        if(!urls.length){
            console.log("porn is not urls length")
            return;
        }
        console.log("porn sending")
        msg.channel.reply(urls[Math.floor(Math.random() * urls.length)])
    })
}*/

bot.on('ready', () => {//when the bot is ready
    time = new Date();//get current time
    log("Bot activated at " + time.toLocaleString())//log activation
    fs.readFile("leaderboards.js", {enconding: 'utf8'}, function (err,data) {
    })
})

bot.on('messageCreate', (msg) => {//when a message is sent, check for the following :
    if (msg.content.toLowerCase().includes(prefix + "ping")){//test message listener
        msg.reply("Pong! haha isnt this funny")
        time = new Date();
        log("In " + msg.guild.name + ", " + msg.member.user.tag+ " pong'd with the bot at " + time.toLocaleString())
    }
    else if ((msg.content.toLowerCase() === (prefix + "carsh")) && msg.author.id === "literally my discord id"){//crash message listener
        log("In " + msg.guild.name + ", " + msg.member.user.tag + "crashed the bot at" + time.toLocaleString() + " :(")
        log("--------------------------END DUMP--------------------------")
        log().forEach(element => msg.channel.send(element));
        msg.channel.send("Crashed")
        msg.channel.sned("boobs")//purposely written incorrectly
    }
    else if (msg.content.toLowerCase() === (prefix + "dump logs") && msg.member.permissions.has("ADMINISTRATOR")) { //dump logs listener -- if the user is a server admin)
        time = new Date();
        log("In " + msg.guild.name + ", " + msg.member.user.tag + " dumped the logs in chat " + msg.channel.name + " at " + time.toLocaleString());//log chat log dump action
        log().push("-----------------------END DUMP-----------------------")
        log().forEach(element => msg.channel.send(element));
        log().pop();
    }
    else if((msg.content.includes(prefix + "rps") && rpsActive == false)){//if the user is asking for RPS
         if (msg.content.includes("✊") || msg.content.includes("🖐️") || msg.content.includes("✌️")){//...and provides a guess
            rpsActive = true;//the bot is now playing RPS
            sleep(2000).then(() => {//simulates the bot "Thinking" about what to pick
                var guess = Math.floor(Math.random() * 3); //picks a number between 1-3
                rpsMinigame(msg, guess);//feeds necessary data into rpsMinigame
                rpsActive = false;//the bot is no longer playing RPS
            })
         }
         else{//if the user tries playing RPS without providing a reasonable guess
             msg.reply("You gotta guess CORRECTLY.")
         }
    }
    else if (msg.content.toLowerCase().replace(/[?!.]/g,'').includes("who the hell is steve jobs")){
        msg.reply("Ligma Balls.")
        msg.channel.send("https://cdn.discordapp.com/attachments/824139922436522034/944398416262352968/yt5s.com-Dr.Manhatten_Ligma_Balls_HD_version360p_Trim_1.gif")
    }
    /*else if (msg.content.includes(prefix + "porn")){
        if(msg.channel.nsfw){
            console.log("porn detected")
            porn(msg)
        }
        else{
            msg.channel.send("there are KIDS here bro")
        }
    }*/
    else if (msg.content.toLowerCase() === (prefix + "leaderboards")){
        var sortlb = Object.entries(lb).sort((a,b)=>b[1]-a[1])
        console.log("HERE WE GO----------------------------------------------")
        console.log(JSON.stringify(sortlb))
        for(var i = 0; i <= Object.keys(sortlb).length; i++){
            bot.users.fetch(sortlb[1][0]).then((user) => {
                console.log("inside loop : " + sortlb[1][0] + ", i = " + i)
            })

            msg.channel.send({ embeds: [{
                color: 0x0099ff,
                title: 'Rock Paper Scissors Leaderboards',
                description: 'Flex your random dice rolls!',
                thumbnail: {
                    url: 'https://imgur.com/3AJW1Lx',//top right img
                }, 
                fields: [
                    {
                        name: tempNameHolder[0],
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',//top left pfp
                        value: "**" + sortlb[0][1] + "**" + " RPS Wins!",
                    },
                    /*{
                        name: secondUser,
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',//top left pfp
                        value: "**" + sortlb[1][1] + "**" + " RPS Wins!",
                    },*/
                    /*{
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },*///empty space in embed
                ],
                timestamp: new Date(),
                footer: {
                    text: 'this took 2 weeks to make',
                    icon_url: 'https://i.imgur.com/8VpYIAX.png',
                },
            }]})
            
        }
    }
    //WHY WONT IT WORK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    else if (msg.content.toLowerCase() === (prefix + "test")){
        console.log("-------testing-------------")
        var sortlb = Object.entries(lb).sort((a,b)=>b[1]-a[1])
        console.log("sorting leaderboard (lb) : " + JSON.stringify(lb))
        var sortable = Object.entries(lb).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        console.log("sortABLE (sorted lb) is currently : " + JSON.stringify(sortable) + " and is reading as " + (typeof sortable))
        console.log(sortable["Null"])
        console.log("what the fuck is sortlb : " + sortlb)
        console.log("what the fuck is sortlb[0] : " + sortlb[0])
        console.log("what the fuck is sortlb[0][0] : " + sortlb[0][0])
        console.log("what the fuck is sortlb[0] : " + sortlb[1])
        console.log("what the fuck is sortlb[0][0] : " + sortlb[1][0])
        //console.bitch()
        /*for(let i = 1; i <= Object.keys(lb).length; i++){
            bot.users.fetch(sortlb[parseInt(i)][1]).then((user) => {
                tempNameHolder.push(user.username)
            })
        }*/
        //console.log(msg.member.permissions.has("ADMINISTRATOR"))
        //console.log(msg.member.user.username)//PULLS USERNAME
        //console.log(msg.guild.members.cache.get())
        //console.log(bot.users.cache.get("231907842922119178").username)//my account, runs fine
        //console.log(bot.users.cache.get("170969665911128064").username)//friend, throws error "Cannot read properties of undefined"
        //console.log(bot.users.cache.get("407235365490130945").username)//alt, throws error "Cannot read properties of undefined"
        //console.log(bot.users.fetch("407235365490130945"))
        //console.log("---------------")
        //bot.users.fetch("231907842922119178").then((acc) => {
        //    console.log(typeof acc.username)
        //})
        
    }
})

bot.login("bro trust me im like SUPER important bro just let me in bro please")