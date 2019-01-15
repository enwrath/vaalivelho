var state = 0; //0 = no vote visible, 1 = vote in middle, 
var leftImg, rightImg, midImg, currentVote, resultText, voteSlips;
var votes = [2, 3, 2, 3, 3]; //Randomly create of preset situations?
var res2 = 2, res3 = 3;
var vote = -1;

function init() {
	leftImg = document.getElementById("leftImg");
    rightImg = document.getElementById("rightImg");
    midImg = document.getElementById("midImg");
    currentVote = document.getElementById("currentVote");
    resultText = document.getElementById("resultText");
    voteSlips = document.getElementsByClassName("voteSlipHalf");
}

function getNextVote() {
	if (vote < votes.length - 1) {
		vote++;
		showVote();
	}
	//Change the image when amount of votes left changes to some %
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

function showVote() {
	currentVote.textContent = votes[vote];
	for (var i = 0; i < voteSlips.length; i++) {
		voteSlips[i].style.visibility = "visible";
	}
}

function hideVote() {
	for (var i = 0; i < voteSlips.length; i++) {
		voteSlips[i].style.visibility = "hidden";
	}
}

function submitAnswer() {
	var r2 = document.getElementById("result2").value;
	var r3 = document.getElementById("result3").value;
	if (r2 == res2 && r3 == res3) resultText.textContent = "Laskit oikein ja pelastit demokratian!"
	else resultText.textContent = "Tarkistuslaskussa selvisi laskuissasi tekemäsi virhe. Olet uhka demokratiallemme ja pääset uudelleenkoulutusleirille!";
}