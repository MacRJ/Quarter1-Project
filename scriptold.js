window.addEventListener("load", function() {
  var value = [];
  // console.log(value)


  // Get Deck ID
  $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(data) {
    var deckId = data["deck_id"]
    // console.log(deckId)
    //

    // Game Loop
    gameLoop();
    var tempvalue = [];

    function gameLoop() {
      var whatIs = [];

      // Pulling from the deck
      var prev = value[value.length - 1];
      $.get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data) {
        //
        // Set up variable 'card' has image and value
        var image = [];
        for (var k in data) {
          // console.log(data["cards"])
          for (var l in data["cards"]) {
            for (var m in data["cards"][l]) {}
          }
        }
        image.push(data["cards"][l]["image"])
        tempvalue.push(data["cards"][l]["value"])
        //

        // Prepend img to the html
        $(".cards").empty();
        $(".cards").prepend("<img src=" + image[0] + ">")
        //

        // change value of face cards
        // console.log("fjhfhgf", tempvalue)

        for (var i = 0; i < tempvalue.length; i++) {
          if (tempvalue[i] === "KING" || tempvalue[i] === "QUEEN" || tempvalue[i] === "JACK") {
            value.push(10)
          } else if (tempvalue[i] === "ACE") {
            AceValue();
          } else {
            value.push(parseInt(tempvalue[i]))
          }
        }

        var curr = value[value.length - 1];




        console.log("PREVCURR: ", prev, curr);


        // Game
        //When cliked higher
        $("#higher").on("click",function(){
          whatIs.push("higher");
        })
        $("#lower").on("click",function(){
          whatIs.push("lower");
          // console.log(whatIs)
        })

        counter = 0;
$("#aceDisplay").mousedown(function(){
  $("#aceDisplay").unbind('click');
console.log(whatIs);
console.log(prev);
console.log(curr);

        if((prev < curr) && (whatIs[0] == "higher")){
          counter += 1;
          console.log("actually higher")
        }else if((prev < curr) && (whatIs[0] == "lower")){
          counter += -1;
          console.log("wrong")
        } else if((prev > curr) && (whatIs[0] == "higher")){
          counter += -1;
          console.log("wrong")
        }else if((prev > curr) && (whatIs[0] == "lower")){
          counter += 1;
          console.log("actually lower")}

})
$(".scoreKeeper").empty();
$(".scoreKeeper").append(counter);



// if(prev < curr){console.log("higher")}
// if(prev > curr){console.log("lower")}






        // When click lower










      })
    }

    // setting the value of ACE
    function AceValue() {
      $(".hidden").addClass("ace").removeClass("hidden");
      $("#High").on("click", function() {
        var temp = document.getElementById('aceDisplay').innerHTML;
        value.push(temp)

      })
    }
    $("#Low").on("click", function() {
      var temp = document.getElementById('aceDisplay').innerHTML;
      value.push(temp)


    })
    //









    // Initiate next card
    $("#aceDisplay").mousedown(function(){
      gameLoop();
      $("#aceDisplay").unbind('click');
    })

    // Setting value of Ace to high

    $("#High").on("click", function() {
      $("#aceDisplay").empty();
      $("#aceDisplay").append(11);
    })
    // Setting value of Ace to low
    $("#Low").on("click", function() {
      $("#aceDisplay").empty();
      $("#aceDisplay").append(1)
    })




  });
})
