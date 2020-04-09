const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  if (hits === maxHits) {
    endGame();
  }
  $(divSelector).removeClass("miss");
}
function startGame() {
  firstHitTime = getTimestamp();
  $(".game-field").removeClass("d-none");
  $("#button-start").addClass("d-none");
  $("#button-reload").removeClass("d-none");
  round();
}

function endGame() {
  $(".game-field").addClass("d-none");
  $("#button-reload").removeClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("")
    round();
  }  else {
    $(event.target).addClass("miss");
    hits = hits - 1;
    $(event.target).text("-1")

  }
}

function init() {
  $(".game-field").addClass("d-none");
  $("#button-reload").addClass("d-none");
  $(".game-field").click(handleClick);
  $("#button-start").click(startGame);
  $("#button-reload").click(
    function() {
      location.reload();
    }
  );
}

$(document).ready(init);
