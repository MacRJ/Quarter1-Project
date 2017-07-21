function setInital(deckNum) {
  // $(document).ready(function() {

    // Setting Deck Number

    // get deck ID
    $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + deckNum, function(data) {
      console.log("deckinfo:", data);


      var deckID = data["deck_id"];
      //
      // get initial deck photo and value
      $("#cards").empty();
      $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1", function(data) {
        $("#cards").prepend("<img src=" + data["cards"][0]["image"] + ">")
        var initalValue = data["cards"][0]["value"]
        //
        // Correcting for FaceCards
        if (initalValue === "KING" || initalValue === "QUEEN" || initalValue === "JACK") {
          initalValue = 10;
        } else if (initalValue === "ACE") {
          aceFunction()
        } else {
          initalValue = parseInt(initalValue)
        }
        //

        $(window).ready(function() {
          gameLoop(initalValue, deckID);
        })
      })
    })
  // })
}
// counter function

// Turn Function
var counter = 0;
var turn = 0;
var player = 1;
var playerSet = 1

// set Playernumber of players
$("#player2").on("click", function() {
  playerSet = 2;
  console.log(playerSet);
})
$("#player3").on("click", function() {
  playerSet = 3;
  console.log(playerSet);
})

function turnCounter() {
  console.log("current turn:", turn);
  if (turn !== 0 && turn % 5 === 0) {
    // console.log("totalTurns:", turn)
    var scoreTotal = document.getElementsByClassName('player-score')[0].innerHTML;
    scoreTotal = parseInt(scoreTotal);
    var newTotal = scoreTotal += counter;
    $(".player-score").empty();
    $(".player-score").append(newTotal);
    nextPlayer();
    counter = 0;
  }
  turn++
}

function nextPlayer() {
  console.log("player:", player);
  console.log("nextPlayerHeard:", playerSet);
  if (player === playerSet) {
    player = 1
  } else {
    player++
  }

  var newPlayer = "#player-" + player;
  console.log("newPlayer:", newPlayer);
  $(".player-score").removeClass("player-score");
  $(newPlayer).addClass("player-score");

}




function aceFunction() {
  if ($("#aceDisplay").html() === "") {
    $(".hidden").addClass("ace").removeClass("hidden");
    $(".ace").removeClass("invisable")
    $("#High").unbind("click");
    $("#Low").unbind("click");
  }
}

// Game Loop
function gameLoop(prev, deck) {
  $("#higher").unbind("click");
  $("#lower").unbind("click");



  // Higher Function
  $("#higher").on("click", function() {
    $.get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1", function(data) {
      var newCardValue = data["cards"][0]["value"]


      // Appending new cardImage
      $("#cards").empty();
      $("#cards").prepend("<img src=" + data["cards"][0]["image"] + ">")

      // Correcting for FaceCards
      if (newCardValue === "KING" || newCardValue === "QUEEN" || newCardValue === "JACK") {
        newCardValue = 10
      } else if (newCardValue === "ACE" && $("#aceDisplay").html() === "") {
        aceFunction();
        $("#higher").addClass("hidden").removeClass("button");
        $("#lower").addClass("hidden").removeClass("button")
      } else if (newCardValue === "ACE") {
        newCardValue = parseInt(document.getElementById("aceDisplay").innerHTML);
      } else {
        newCardValue = parseInt(newCardValue)
      }
      //

      // Selecting high for ACE
      $("#High").on("click", function() {
        $("#aceDisplay").empty();
        $("#aceDisplay").append(11);
        $("#higher").addClass("button").removeClass("hidden");
        $("#lower").addClass("button").removeClass("hidden");
        $("#High").addClass("hidden").removeClass("ace");
        $("#Low").addClass("hidden").removeClass("ace");
        newCardValue = 11
        if (prev <= 11) {
          counter++;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        } else {
          counter--;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        }
        $.get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1", function(data) {
          var newCardValue = data["cards"][0]["value"]


          // Appending new cardImage
          $("#cards").empty();
          $("#cards").prepend("<img src=" + data["cards"][0]["image"] + ">")
        })
        gameLoop(newCardValue, deck);
      })



      // Checking High Values
      $("#higher").unbind("click");
      if (prev <= newCardValue) {
        counter++;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      } else {
        counter--;
        turnCounter();
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      }
      gameLoop(newCardValue, deck);
    })
  })
  //

  // Lower is clicked

  $("#lower").on("click", function() {
    $("#lower").unbind("click");

    $.get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1", function(data) {
      var newCardValue = data["cards"][0]["value"]


      // Appending new cardImage
      $("#cards").empty();
      $("#cards").prepend("<img src=" + data["cards"][0]["image"] + ">")

      // Correcting for FaceCards
      if (newCardValue === "KING" || newCardValue === "QUEEN" || newCardValue === "JACK") {
        newCardValue = 10
      } else if (newCardValue === "ACE" && $("#aceDisplay").html() === "") {
        aceFunction();
        $("#higher").addClass("hidden").removeClass("button");
        $("#lower").addClass("hidden").removeClass("button")
      } else if (newCardValue === 'ACE') {
        newCardValue = parseInt(document.getElementById("aceDisplay").innerHTML);
      } else {
        newCardValue = parseInt(newCardValue)
      }
      //

      // Selecting Low for ACE
      $("#Low").on("click", function() {
        $("#aceDisplay").empty();
        $("#aceDisplay").append(1);
        $("#higher").addClass("button").removeClass("hidden");
        $("#lower").addClass("button").removeClass("hidden");
        $("#High").addClass("hidden").removeClass("ace");
        $("#Low").addClass("hidden").removeClass("ace");
        newCardValue = 1
        if (prev >= 1) {
          counter++;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        } else {
          counter--;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        }
        $.get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1", function(data) {
          var newCardValue = data["cards"][0]["value"]


          // Appending new cardImage
          $("#cards").empty();
          $("#cards").prepend("<img src=" + data["cards"][0]["image"] + ">")
        })
        gameLoop(newCardValue, deck);
      })


      // checking value of card
      if (prev >= newCardValue) {
        // console.log("Lower Prev And New", prev, newCardValue);
        counter++;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      } else {
        turnCounter();
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      }
      gameLoop(newCardValue, deck);

    })
  })
}

deckNum = 1;
$("#2deck").on("click", function() {
  deckNum = 2;
  setInital(deckNum);
})
$("#3deck").on("click", function() {
  deckNum = 3;
  setInital(deckNum);
})
