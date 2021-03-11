var correctSound = new Audio("correct.mp3");
var wrongSound = new Audio("wrong.mp3");
var correctStat = 0;
var wrongStat = 0;

function loadData(k) {
  var requestURL = "../voca.json";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    var rj = request.response;
    showVoca(k, rj);
  };
}

function showVoca(k, m) {
  m.sort(function () {
    return 0.5 - Math.random();
  });
  var vocaDiv = document.getElementById("vocaDiv");
  var answerBox = document.getElementById("answerBox");
  var scoring = document.getElementById("scoring");
  var question = document.getElementById("question");
  var i = 0;
  if (k == "e2k") {
    k = 0;
  } else {
    k = 1;
  }
  vocaDiv.style.display = "block";

  function mkQuestion() {
    if (i > m.length) {
      alert("단어가 끝났습니다.");
      location.reload();
      return;
    }
    answerBox.value = "";
    question.innerHTML = m[i][k];
  }

  scoring.addEventListener("click", () => {
    if (answerBox.value == m[i][1 - k]) {
      correctSound.play();
      correctStat++;
      updateStat();
      alert("정답입니다!");
    } else {
      wrongSound.play();
      wrongStat++;
      updateStat();
      alert('땡! 정답은 "' + m[i][1 - k] + '"입니다!');
    }
    i++;
    mkQuestion();
  });

  mkQuestion();
}

function pressed(k) {
  document.getElementById("main").style.display = "none";
  loadData(k);
}

function updateStat() {
  var statBox = document.getElementById("stat");
  statBox.innerHTML = "정답: " + correctStat + " | 오답: " + wrongStat;
}
