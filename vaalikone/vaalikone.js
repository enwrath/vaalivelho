var qtext, rtext, qarea, rarea, rimg, rtext2;
var current = -1;

//lower score = agree more
var parties = {
    'sdp': {
    	'score': 0,
        'name': 'Suomen Sosialidemokraattinen Puolue',
     	'img': '../logoquiz/logot/sdp.png'
    },
    'kesk': {
    	'score': 0,
        'name': 'Suomen Keskusta',
     	'img': '../logoquiz/logot/kesk.png'
    },
    'kok': {
    	'score': 0,
        'name': 'Kansallinen Kokoomus',
     	'img': '../logoquiz/logot/kok.png'
    },
    'rkp': {
    	'score': 0,
        'name': 'Suomen ruotsalainen kansanpuolue',
     	'img': '../logoquiz/logot/rkp.png'
    },
    'kd': {
    	'score': 0,
        'name': 'Suomen Kristillisdemokraatit',
     	'img': '../logoquiz/logot/kd.png'
    },
    'vihr': {
    	'score': 0,
        'name': 'Vihreä liitto',
     	'img': '../logoquiz/logot/vihr.png'
    },
    'vas': {
    	'score': 0,
        'name': 'Vasemmistoliitto',
     	'img': '../logoquiz/logot/vas.png'
    },
    'ps': {
    	'score': 0,
        'name': 'Perussuomalaiset',
     	'img': '../logoquiz/logot/ps.png'
    },
    'sin': {
    	'score': 0,
        'name': 'Sininen tulevaisuus',
     	'img': '../logoquiz/logot/sin.png'
    }
};
function initStuff() {
	qtext = document.getElementById('qtext');
	qarea = document.getElementById('questionArea');
	rtext = document.getElementById('rtext');
	rimg = document.getElementById('rimg');
	rtext2 = document.getElementById('rtext2');
	rarea = document.getElementById('resultArea');
	nextQuestion();
};

function nextQuestion() {
	if (current < questions.length - 1) {
		current += 1;
		qtext.textContent = questions[current].text;
	}
	else showResults();
};


function updateScore(q, v) {
	parties.kd.score += Math.abs(questions[q].kd - v);
	parties.kok.score += Math.abs(questions[q].kok - v);
	parties.sdp.score += Math.abs(questions[q].sdp - v);
	parties.sin.score += Math.abs(questions[q].sin - v);
	parties.ps.score += Math.abs(questions[q].ps - v);
	parties.vas.score += Math.abs(questions[q].vas - v);
	parties.vihr.score += Math.abs(questions[q].vihr - v);
	parties.rkp.score += Math.abs(questions[q].rkp - v);
	parties.kesk.score += Math.abs(questions[q].kesk - v);
}

function userAnswer(v) {
	updateScore(current, v);
	nextQuestion();
};

function showResults() {
	qarea.style.display = 'none';
	rarea.style.display = 'block';
	var results = [];
	for (var s in parties) {
	    results.push([s, parties[s].score]);
	}

	results.sort(function(a, b) {
	    return a[1] - b[1];
	});

	rtext.textContent = 'Sinulle sopivin puolue on \r\n\r\n' + parties[results[0][0]].name;
	rimg.src = parties[results[0][0]].img;
	rtext2.textContent = 'Loput puolueet sopivuusjärjestyksessä:\r\n\r\n';
	for (var i = 1; i < results.length; i++) {
		rtext2.textContent += parties[results[i][0]].name+'\r\n';
	};
}