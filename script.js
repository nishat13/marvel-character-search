//functions for the page
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var PRIV_KEY = "**********************************";
var PUBLIC_KEY = "b12d08a6462dd961a971fdd519220b93";


function getMarvelResponse() {
    //empty out old results/clear cache when 
    //submit button is clicked again
    $('#result').empty();
    // you need a new ts every request                                                                                    
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
                                                                         
    var marvelcomicsAPI = 'https://gateway.marvel.com:443/v1/public/comics'; 

    var titleStartsWith = document.getElementById('name').value;
    var startYear = $('#startYear').val();
    var issueFormat = document.getElementById('issueFormat').value;
    var order = document.getElementById('orderBy').value;

    if (titleStartsWith == "" || !isNaN(titleStartsWith)){
        alert("Please enter a valid name and fill out all required fields! Thank you!");
    }
    else if (startYear == "" || isNaN(startYear)){
        alert("Please enter a valid year and fill out all required fields! Thank you!");
    }

    $.getJSON(marvelcomicsAPI, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 100,
        titleStartsWith: titleStartsWith,
        startYear: startYear,
        format: issueFormat,
        orderBy: order
    })
    .done(function(data){
            console.log(data);
            if((data.data.results.length == 0)){
                alert("No results found matching your query!");
            }
            for(var i = 0; i< data.data.count; i++){
              
                    var comicTitle = data.data.results[i].title;
                    var comicID = data.data.results[i].id;
                    getMarvelCharacter(comicID,comicTitle);
                

            }
    })
    
    .fail(function(err){
        console.log(err);

    });
};


function getMarvelCharacter(x,y){
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
                                                                         
    var marvelcharactersAPI = 'https://gateway.marvel.com:443/v1/public/characters';
   
    $.getJSON(marvelcharactersAPI, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        comics: x, 
        limit: 1,
        orderBy: name,
    })
    .done(function(data){
        console.log(data);
        var results = data.data.results;
        var output = '<ul>';
        var imgPath = 'http://www.gamasutra.com/db_area/images/news2001/34357/marvel%20universe%20mmo.jpg';
        var characterName;
        var characterDesc;
        if (results[0] == undefined) {
            characterName = "No characters available";
            characterDesc = "";
        }
        else{
            characterName = results[0].name;
            characterDesc = results[0].description;
            imgPath = results[0].thumbnail.path + '/standard_xlarge.' + results[0].thumbnail.extension;
        }
        output += '<li><img src="' + imgPath + '"><br>'+y+'<br>'+characterName+'<br>'+characterDesc+'<br>'+'</li>';
        output += '</ul>'
        
        $('#result').append(output);
    })
    .fail(function(err){
        console.log(err);

    });
  
};


