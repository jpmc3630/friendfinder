console.log('API Route Connected');


// Node Dependencies
var path = require('path');

// Link in Friends Data
var friendsData = require('../data/friends.js');


// Includes Two Routes
function apiRoutes(app) {
    
    app.get('/api/friends', function (req, res) {
        res.sendFile(path.join(__dirname + '/../data/friends.js'));
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
    console.log('me:');
    console.log(newUser.scores);

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

        let returnMessage = '';
        if (matchArr.length > 1) {
            returnMessage += 'You have matched equally with ' + matchArr.length + ' people!<br>'
        } else {
            returnMessage += 'Your match has been found!<br>'
        }

        
        
        console.log(matchArr);

        for (key in matchArr) {
            returnMessage += `
            ${friendsData[matchArr[key]].name}
            <br>
            <img src="${friendsData[matchArr[key]].photo}" style="width:200px;">
            <br><br>
            `
        }
        
        return returnMessage;

}