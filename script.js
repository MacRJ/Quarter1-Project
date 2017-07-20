function setInital() {
  $(document).ready(function() {
    // get deck ID
    $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(data) {
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
  })
}
// counter function

// Turn Function
var counter = 0;
var turn = 0;
var player = 1;

function turnCounter() {
  console.log("totalTurns:", turn)
  if (turn % 5 === 0 && turn !== = 0) {
    var scoreTotal = document.getElementsByClassName('player-score').innerHTML;
    scoreTotal = parseInt(scoreTotal);
    var newTotal = scoreTotal += counter;
    $(".player-score").empty();
    $(".player-score").append(newTotal);
  }
  turn++
  counter = 0;
  nextPlayer();
}

function nextPlayer() {
  if (player === 3 {
      player = 0
    } else {
      player++
    })
    var newPlayer = "#player-" + player;
    $(".player-score").removeClass("player-score");
    $("")
}


// I consoled log this out without testing -- trying to fix "Low" button
// // Ace Function
// $("#High").on("click", function() {
//   $("#Low").unbind("click");
//   $("#High").unbind("click");
//   // gameLoop();
// })
// $("#Low").on("click", function(){
//   $("#High").unbind("click");
//   $("#Low").unbind("click");
//   // gameLoop();
// })

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
          counter += 1;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        } else {
          counter -= 1;
          turnCounter();
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
        counter += 1;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      } else {
        counter -= 1;
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
          counter += 1;
          $(".scoreKeeper").empty();
          $(".scoreKeeper").append(counter)
        } else {
          counter -= 1;
          turnCounter();
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


setInital();
