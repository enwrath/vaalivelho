var state = 0; //0 = no vote visible, 1 = vote in middle, 
var leftBtn, rightBtn, currentVote, resultText, voteSlips, gameDiv, menuDiv, electionName, resultDiv, formButton;
var vote, level, state;

var levels = {
	easy: {
		votes: [2, 3, 2, 3, 3],
		results: {
			2: 2,
			3: 3
		},
		name: "Keijukylän yläasteen oppilaskuntavaalit",
		winMsg: "Laskit äänen oikein ja sait opettajalta omenan palkaksi!",
		lossMsg: 'Tarkistuslaskennassa selvisi, että laskit äänet väärin. Koulun kingi sanoo: "Välitunnilla tavataan, demokratian vihaaja..."'
	},
	medium: {
	votes: [3,5,4,6,6,4,2,6,3,5,6,4,3,6,3,4,3,6,6,5],
		results: {
			2: 1,
			3: 5,
			4: 4,
			5: 3,
			6: 7
		},
		name: "Kylänvanhimpien vanhimmuusäänestys",
		lossMsg: "Palkkioksi virheellisestä äänenlaskusta saat kepistä. Korkeista i'istään huolimatta kylänvanhimpien kepiniskut raikuvat iloisesti.",
		winMsg: "Uusi kylänvanhin kehui sinua hienosta laskutyöstä."
	},
	hard: {
	votes: [1,1,2,1,3,1,1,1,1,1,1,1,2,2,3,2,1,1,2,3,1,1,1,3,1,1,2,2,3,1,3,1,3,3,2,1,3,1,1,1,1,2,2,1,2,3,3,3,1,2,2,1,1,3,1,2,2,2,1,1,1,1,3,1,1,2,3,1,1,1,1,3,3,3,1,2,1,1,1,2,2,1,2,1,1,1,1,1,1,1,3,1,1,3,3,3,1,2,1,1,3,1,3,2,2,1,1,1,1,1,2,1,3,3,1,3,3,2,3,1,1,1,1,2,1,3,3,1,2,1,2,1,2,1,2,1,1,1,2,2,1,1,2,1,2,3,1,1,1,1,3,3,3,1,2,1,1,1,1,1,3,2,1,1,1,1,3,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,3,2,1,1,2,2,1,1,2,2,1,1,1,1,1,3,1,1,2,1,1,1,1,2,3,3,2,1,1,1,1,1,2,1,1,3,1,3,1,1,1,1,2,2,2,2,1,3,2,3,2,2,1,1,1,1,1,1,2,2,2,2,2,1,3,1,3,1,3,2,3,1,2,1,1,1,3,1,1,2,2,1,1,2,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,3,1,1,1,2,1,1,1,1,1,3,1,3,1,1,3,1,2,2,3,3,1,1,1,2,2,3,1,3,2,2,2,1,2,2,2,2,1,3,3,2,1,1,1,3,1,3,1,3,1,2,1,1,1,1,1,1,3,1,1,1,1,1,1,1,2,1,1,2,3,1,1,2,3,1,1,1,1,2,1,3,2,2,3,1,3,3,2,1,2,1,1,1,2,3,3,1,3,2,1,2,2,1,1,1,1,1,2,1,2,3,2,1,3,2,1,1,2,1,1,1,2,1,1,1,2,3,1,1,3,1,1,1,1,1,1,1,1,2,2,1,2,1,2,1,1,1,1,3,2,1,1,2,1,3,3,1,3,1,1,1,3,1,1,3,1,1,2],
		results: {
			1: 268,
			2: 109,
			3: 84
		},
		name: "Kunnioitetun suurjohtajan valitsemisvaalit",
		winMsg: "Tarkistuslaskenta ja kansainväliset tarkkailijat ovat hyväksyneet tulokset. Palkkioksi pääset eläkkeelle jo 88-vuotiaana.",
		lossMsg: "Tarkistuslaskennassa paljastui ongelmia tuloksessa. Salainen palvelu tutkii asiaa ja odottaessa pääset uudelleenkoulutusleirille."
	}
};

function init() {
	leftBtn = document.getElementById("leftButton");
    rightBtn = document.getElementById("rightButton");
    midImg = document.getElementById("midImg");
    currentVote = document.getElementById("currentVote");
    resultText = document.getElementById("resultText");
    voteSlips = document.getElementsByClassName("voteSlipHalf");
    gameDiv = document.getElementById("gameDiv");
    menuDiv = document.getElementById("menuDiv");
    resultDiv = document.getElementById("resultDiv");
    formButton = document.getElementById("formButton");
	electionName = document.getElementById("electionName");
}

function startGame(levelName) {
	//Remove old inputs from result form
	var oldFormNames = document.getElementsByClassName("formRow");
	for (var i = oldFormNames.length-1; i >= 0; i--) {
		oldFormNames[i].parentNode.removeChild(oldFormNames[i]);
	}
	menuDiv.style.display = "none";
	gameDiv.style.display = "block";
	level = levelName;
	vote = -1;
	state = 0;
	electionName.textContent = levels[level].name;
	//Reset buttons and voteslip visibility etc
	leftBtn.disabled = false;
	rightBtn.disabled = true;
	for (var i = 0; i < voteSlips.length; i++) {
		voteSlips[i].style.visibility = "hidden";
	}
	populateResultForm();
}

function populateResultForm() {
	Object.keys(levels[level].results).forEach(function(e) {
		formButton.insertAdjacentHTML('beforebegin', '<div class="formRow"><label for="'+e+'">Ehdokas '+e+':</label><input type="number" id="'+e+'" min="0"></div>');
	});
}

function returnToMenu() {
	resultDiv.style.display = "none";
	menuDiv.style.display = "flex";
}

function getNextVote() {
	if (vote < levels[level].votes.length - 1) {
		vote++;
		showVote();
	}
}

function clicked(number) {
	if (number == 0 && state == 0) {
		getNextVote();
		state = 1;
	}
	else if (number == 1 && state == 1) {
		hideVote();
		state = 0;
	}
}

function switchDisabledButton() {
	leftBtn.disabled = !leftBtn.disabled;
	rightBtn.disabled = !rightBtn.disabled;
}

function showVote() {
	currentVote.textContent = levels[level].votes[vote];
	for (var i = 0; i < voteSlips.length; i++) {
		voteSlips[i].style.visibility = "visible";
	}
	switchDisabledButton();
}

function hideVote() {
	for (var i = 0; i < voteSlips.length; i++) {
		voteSlips[i].style.visibility = "hidden";
	}
	switchDisabledButton();
	if (vote >= levels[level].votes.length - 1) {
		leftBtn.disabled = true;
		//Explain that all votes have been seen
	}
}

function submitAnswer() {
	var victory = true;
	Object.keys(levels.easy.results).forEach(function(e) {
			if (levels[level].results[e] != document.getElementById(e).value) victory = false;
	});
	if (victory) resultText.textContent = levels[level].winMsg;
	else resultText.textContent = levels[level].lossMsg;
	gameDiv.style.display = "none";
	resultDiv.style.display = "block";
}