console.log('API Route Connected');


// Node Dependencies
var path = require('path');

// Link in Friends Data

var fs = require('fs');

// Link in Friends Data
let friendsFile = path.join(__dirname + '/../data/friends.js');
let friendsData = JSON.parse(fs.readFileSync(friendsFile, "utf8"));






// Includes Two Routes
function apiRoutes(app) {
    
    app.get('/api/friends', function (req, res) {
        
        res.json(friendsData);

    });

      
    app.post('/api/friends', function (req, res) {
        let newUser = req.body;

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(findFriend(newUser));

    });

}


// Export for use in main server.js file
module.exports = apiRoutes;


function findFriend(newUser) {

    friendsScoresArr = [];
    matchArr = [];
        // iterate through each potential friend
        for (let i = 0 ; i < friendsData.length ; i++) {
            
            let total = 0;

            for ( let m = 0 ; m < friendsData[i].scores.length ; m++) {

                if (friendsData[i].scores[m] <= newUser.scores[m]) {
                    total += newUser.scores[m] - friendsData[i].scores[m];
                } else {
                    total += friendsData[i].scores[m] - newUser.scores[m];
                }

            }

            friendsScoresArr.push(total);

        };
        
        console.log(friendsScoresArr);

        let lowestScore = 100;
        for ( let i = 0 ; i < friendsScoresArr.length ; i++) {
            if (friendsScoresArr[i] < lowestScore) {
                lowestScore = friendsScoresArr[i];
            }
        } 
        
        console.log(lowestScore);

        for ( let i = 0 ; i < friendsScoresArr.length ; i++) {
            if (friendsScoresArr[i] == lowestScore) {
                matchArr.push(i);
            }
        } 

        let returnMessage = '<p class="lead">';
        if (matchArr.length > 1) {
            returnMessage += 'You have matched equally with ' + matchArr.length + ' people!</p>'
        } else {
            returnMessage += 'Your match has been found!</p>'
        }

        
        
        console.log(matchArr);

        for (key in matchArr) {
            returnMessage += `<p class="lead" style="margin-bottom:10px;">
            ${friendsData[matchArr[key]].name}
            </p><br>
            <img src="${friendsData[matchArr[key]].photo}" style="width:220px;">
            <br><br>
            `
        }
        

        friendsData.push(newUser);

        fs.writeFileSync(friendsFile, JSON.stringify(friendsData));


        return returnMessage;

}