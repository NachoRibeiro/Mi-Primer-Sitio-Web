var myHeader = new Headers ();
myHeader.append("X-API-Key", "ORFl6D4mOkDLbxN03Tb8aOXOFMfeexddEIzVs0YT");
var myInit = {
    method : "GET",
    headers : myHeader
}
var url = "https://api.propublica.org/congress/v1/113/house/members.json";
if (document.title.includes("Senate")){
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
};

fetch(url, myInit)
.then(function(response){
    return response.json();
})
.then(function(json){
    members = json.results[0].members;
    calculateVue();
})

var app = new Vue({
    el: '#app',
    data: {
        statistics: {
            members: 0,
            democrats: [],
            republicans: [],
            independents: [],
            demAverageVotes: 0,
            repAverageVotes: 0,
            indAverageVotes: 0,
            leastLoyal: [],
            mostLoyal: [],
            leastEngaged: [],
            mostEngaged: []
        }

    }
});

function calculateVue() {
    app.statistics.members = members.length;
    app.statistics.democrats = separateMembers(members , "D");
    app.statistics.republicans = separateMembers(members , "R");
    app.statistics.independents = separateMembers(members , "ID");
    app.statistics.demAverageVotes = percentageOfVotes(app.statistics.democrats);
    app.statistics.repAverageVotes = percentageOfVotes(app.statistics.republicans);
    app.statistics.indAverageVotes = percentageOfVotes(app.statistics.independents);
    app.statistics.leastLoyal = calculateLoyalty().least;
    app.statistics.mostLoyal = calculateLoyalty().most;
    app.statistics.leastEngaged = calculateAttendance().least;
    app.statistics.mostEngaged = calculateAttendance().most
}


//separo los miembros por partido
function separateMembers (members , sigla) {
    var finalArray = []

    for (let i = 0; i < members.length; i++) {
        var party = members[i].party
        if (party == sigla) {
            finalArray.push(members[i])
        }
    }

    return finalArray
}



//calculo el % votes with party
function percentageOfVotes (members) {
    var summation = 0;
    var average = 0;

    for (let i = 0; i < members.length; i++) {
        summation += members[i].votes_with_party_pct
    }
    if (members.length != 0) {
        average = Math.round(summation / members.length);
    }
    
    return average
}



function calculateLoyalty() {
    members.sort(function (a, b) {
        if (a.votes_with_party_pct > b.votes_with_party_pct){
            return 1;
        }
        if (a.votes_with_party_pct < b.votes_with_party_pct){
            return -1;
        }
        return 0
    });
    var tenPercent = members.length * 0.10
    var leastAndMost = {
        least : members.slice(0, tenPercent),
        most : members.slice(-tenPercent).reverse()
    }
    return leastAndMost
}



function calculateAttendance() {
    members.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct){
            return 1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct){
            return -1;
        }
        return 0
    });
    var tenPercent = members.length * 0.10
    var leastAndMost = {
        least : members.slice(-tenPercent).reverse(),
        most : members.slice(0, tenPercent)
    } 
    return leastAndMost
}