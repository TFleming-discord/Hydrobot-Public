//
function writeToLeaderboard(msg){
    import('./leaderboards.js')
    .then(leaderboard => {
        var user = msg.author.id
        if(int(my discord id lol) in leaderboard){
           console.log("User is in leaderboard.")
            var tempScore = leaderboard[user]
            readFile("leaderboards.js", {enconding: 'utf8'}, function (err,data) {
                var formatted = data.replace(user + ":" + tempScore, user + ":" + tempScore + "," );
                console.log("Writing to file")
                writeFile("leaderboards.js", formatted, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
           });
        }
        else{
            console.log("User is NOT in leaderboard.")
            readFile("leaderboards.js", {encoding: 'utf8'}, function (err,data) {
                var formatted = data.replace(/Null:0/g, user + ":" + 1 + ",\n    Null:0");
                console.log("Adding new index")
                writeFile("leaderboards.js", formatted, 'utf8', function (err) {
                 if (err) return console.log(err);
                });
            });
        }
    })   
    
}//took me like 2 weeks oh my god

function sleep(ms) {//sleep function to pause bot if needed
    return new Promise(resolve => setTimeout(resolve, ms));
}
//writeToLeaderboard(msg)
//fucking awesome leaderboard func i wrote to write score to a file
//didnt work because file data is not refreshed upon subsequent reads, thus reading old data forever

//
//console.log(bot.users.cache.get("231907842922119178").username)//pulls discord username via user id
//
  