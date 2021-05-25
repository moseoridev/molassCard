var correctSound = new Audio("assets/audio/correct.mp3");
var wrongSound = new Audio("assets/audio/wrong.mp3");
var correctStat = 0;
var wrongStat = 0;

function pressed(k) {
  document.getElementById("main").hidden = true;
  loadData(k);
}

function loadData(k) {
  var chapter = document.getElementById("chapter").value;
  var requestURL = "assets/json/" + chapter + ".json";
  var request = new XMLHttpRequest();
  var chapter = document.getElementById("chapter");
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
  var questionDiv = document.getElementById("questionDiv");
  var answerBox = document.getElementById("answerBox");
  var scoring = document.getElementById("scoring");
  var question = document.getElementById("question");
  var i = 0;
  if (k == "e2k") {
    k = 0;
  } else {
    k = 1;
  }
  questionDiv.hidden = false;

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
      playSound("correct");
      correctStat++;
      updateStat();
      alert("정답입니다!");
    } else {
      playSound("wrong");
      wrongStat++;
      updateStat();
      alert('땡! 정답은 "' + m[i][1 - k] + '"입니다!');
    }
    i++;
    mkQuestion();
  });

  mkQuestion();
}

function updateStat() {
  var statBox = document.getElementById("stat");
  statBox.innerHTML = "정답: " + correctStat + " | 오답: " + wrongStat;
  " | 정답률: " +
    ((correctStat / (correctStat + wrongStat)) * 100).toFixed(2) +
    "%";
}

function soundSetting() {
  _toggle = document.getElementById("soundFlag");
  if (_toggle.innerHTML === "켜짐") {
    _toggle.innerHTML = "꺼짐";
    localStorage.setItem("soundSetting", JSON.stringify([false]));
  } else {
    _toggle.innerHTML = "켜짐";
    localStorage.setItem("soundSetting", JSON.stringify([true]));
  }
}

function playSound(b) {
  __toggle = document.getElementById("soundFlag");
  if (__toggle.innerHTML === "켜짐") {
    if (b === "correct") {
      correctSound.play();
    } else {
      wrongSound.play();
    }
  }
}

var ansform = document.getElementById("answerForm");
function handleForm(event) {
  event.preventDefault();
}
ansform.addEventListener("submit", handleForm);

toggle = document.getElementById("soundFlag");
if (localStorage["soundSetting"]) {
  if (JSON.parse(localStorage.getItem("soundSetting"))[0]) {
    toggle.innerHTML = "켜짐";
  } else {
    toggle.innerHTML = "꺼짐";
  }
} else {
  toggle.innerHTML = "켜짐";
}
