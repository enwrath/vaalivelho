var leftImg, rightImg, quizDiv, resultDiv;
var results = {
    "sdp": {
        "score": 0,
        "name": "Suomen Sosialidemokraattinen Puolue",
        "maxscore": 0
    },
    "kesk": {
        "score": 0,
        "name": "Suomen Keskusta",
        "maxscore": 0
    },
    "kok": {
        "score": 0,
        "name": "Kansallinen Kokoomus",
        "maxscore": 0
    },
    "rkp": {
        "score": 0,
        "name": "Suomen ruotsalainen kansanpuolue",
        "maxscore": 0
    },
    "kd": {
        "score": 0,
        "name": "Suomen Kristillisdemokraatit",
        "maxscore": 0
    },
    "vihr": {
        "score": 0,
        "name": "Vihreä liitto",
        "maxscore": 0
    },
    "vas": {
        "score": 0,
        "name": "Vasemmistoliitto",
        "maxscore": 0
    },
    "ps": {
        "score": 0,
        "name": "Perussuomalaiset",
        "maxscore": 0
    },
    "sin": {
        "score": 0,
        "name": "Sininen tulevaisuus",
        "maxscore": 0
    }
};
const data = [
    {"img": "logot/sdp.png", "owner": "sdp"},
    {"img": "logot/kesk.png", "owner": "kesk"},
    {"img": "logot/kok.png", "owner": "kok"},
    {"img": "logot/rkp.png", "owner": "rkp"},
    {"img": "logot/kd.png", "owner": "kd"},
    {"img": "logot/vihr.png", "owner": "vihr"},
    {"img": "logot/vas.png", "owner": "vas"},
    {"img": "logot/ps.png", "owner": "ps"},
    {"img": "logot/sin.png", "owner": "sin"}
];
var pairList = [];
var currentPair;

function init() {
    leftImg = document.getElementById("leftImg");
    rightImg = document.getElementById("rightImg");
    quizDiv = document.getElementById("quizDiv");
    resultDiv = document.getElementById("resultDiv");

    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            var pair;
            // Randomize left/right position
            if (Math.random() < 0.5) pair = [data[i], data[j]];
            else pair = [data[j], data[i]];
            pairList.push(pair);
            results[data[i].owner].maxscore += 1;
            if (results[data[i].owner] != results[data[j].owner]) results[data[j].owner].maxscore += 1;
        }
    }
    currentPair = 0;
    pairList.sort(function() { return 0.5 - Math.random() }); //Randomly sort -> shuffle
    leftImg.src = pairList[currentPair][0].img;
    rightImg.src = pairList[currentPair][1].img;
}

function showResults() {
    quizDiv.style.display = "none";
    var parties = Object.keys(results);
    var sortedResults = [];
    for (var i = 0; i < parties.length; i++) {
        sortedResults.push({
                "name": results[parties[i]].name,
                "score": results[parties[i]].score,
                "maxscore": results[parties[i]].maxscore
            });

    }
    sortedResults = sortedResults.sort(function (a, b) {
        return b.score - a.score;
    });
    appendResultRow("Vastauksiesi perusteella tekoäly on laskenut yhteensopivuutesi eri puolueiden kanssa:");

    sortedResults.forEach(function (e) {
        var percentage = ((e.score / e.maxscore) * 100).toFixed(1);
        var t = percentage + "%: " + e.name;
        appendResultRow(t);
    });
}

function appendResultRow(text) {
    var para = document.createElement("P");
    var t = document.createTextNode(text);
    para.appendChild(t);
    resultDiv.appendChild(para);
}

function nextPair() {
    if (currentPair + 1 < pairList.length) { 
        currentPair++;
        leftImg.src = pairList[currentPair][0].img;
        rightImg.src = pairList[currentPair][1].img;
    } else showResults();
}

function choose(left) {
    if (left) results[pairList[currentPair][0].owner].score += 1;
    else results[pairList[currentPair][1].owner].score += 1;
    nextPair();
}