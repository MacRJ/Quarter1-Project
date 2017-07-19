function setInital() {
  $(document).ready(function() {
    // get deck ID
    $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(data) {
// console.log(data)
      var deckID = data["deck_id"];
      //
      // get initial deck photo and value
      $.get("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1", function(data) {
        $(".cards").prepend("<img src=" + data["cards"][0]["image"] + ">")
        var initalValue = data["cards"][0]["value"]
        //
        // Correcting for FaceCards
        var correctedInitialValue = []
        if (initalValue === "KING" || initalValue === "QUEEN" || initalValue === "JACK" || initalValue === "ACE") {
          initalValue = 10;
        } else {
          correctedInitialValue.push(parseInt(data["cards"][0]["value"]))
        }
        //
        $("#higher").on("click", function() {
          $("#higher").unbind('click');
          gameLoop(correctedInitialValue, deckID);
        })
        $("#lower").on("click", function() {
          $("#higher").unbind('click');
          gameLoop(correctedInitialValue, deckID);
        })

      })
    })
  })
}

function gameLoop(prev, deck) {
  var counter = 0;
  // pulling new card
  $.get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1", function(data) {
    var newCardValue = data["cards"][0]["value"]
    console.log(newCardValue)

    // Appending new cardImage
    $(".cards").empty();
    $(".cards").prepend("<img src=" + data["cards"][0]["image"] + ">")

    // Correcting for FaceCards
    if (newCardValue === "KING" || newCardValue === "QUEEN" || newCardValue === "JACK" || newCardValue === "ACE") {
      newCardValue = 10
    }
    //

    // Checking High Values
    $("#higher").on("click", function() {
      $("#higher").unbind("click");
      if (prev <= newCardValue) {
        counter += 1;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      } else {
        counter += -1;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      }
      gameLoop(newCardValue, deck)
    })
    // console.log(prev)
    // console.log(newCardValue);
    // gameLoop(newCardValue, deck);
//
// Check low values
    $("#lower").on("click", function() {
      $("#lower").unbind("click");
      if (prev >= newCardValue) {
        counter += 1;
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      } else {
        counter += -1
        $(".scoreKeeper").empty();
        $(".scoreKeeper").append(counter)
      }
      gameLoop(newCardValue, deck);
    })
  })
}
setInital();
