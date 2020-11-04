var myHeader = new Headers();
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
}).then(function(json){
    app.members = json.results[0].members;
})

var app = new Vue({
    el : '#app',
    data :{
        members : [],
    }
});

/*function mostrarEnTabla(){
    var imprimirBody = "";
    for (let i = 0; i < miembros.length; i++) {
        imprimirBody = imprimirBody + "<tr>"
        + "<td><a href='" + miembros[i].url + "'>" + miembros[i].last_name + ", " + miembros[i].first_name + " " + (miembros[i].middle_name || " ") + "</a></td>"
        + "<td>" + miembros[i].party + "</td>"
        + "<td>" + miembros[i].state + "</td>"
        + "<td>" + miembros[i].seniority + "</td>"
        + "<td>" + miembros[i].votes_with_party_pct + " %" + "</td>"
        + "</tr>"
    }
    document.getElementById("senate-data").innerHTML = imprimirBody;
}*/
