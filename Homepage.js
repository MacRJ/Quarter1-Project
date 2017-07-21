window.addEventListener("load", function() {

// background
  d3.select("body")
    .style("background-color", "black")
  //
  d3.select(".greeting").transition()
    .style("background-color", "white")
    .style("height", "400px")
    .style("margin-top", "300px")

    d3.select(".gameHolder")
    .style("margin-top", "0px")
//

// initalizing game
// player1
$("#player1").on("click",function(){
  // setInital();
d3.selectAll(".invisable")
  .classed("invisable", false)

  d3.selectAll(".visable")
  .classed("invisable", true);
  d3.selectAll(".visable")
    .classed("visable", false);
  d3.select(".greeting").transition()
    .style("height", "1px")
    .style("margin-bottom", "0px")

  d3.select(".gameHolder")
    .style("margin-bottom", "300px")
})
// player2
$("#player2").on("click",function(){
  // setInital();
d3.selectAll(".invisable")
  .classed("invisable", false)

  d3.selectAll(".visable")
  .classed("invisable", true);
  d3.selectAll(".visable")
    .classed("visable", false);
  d3.select(".greeting").transition()
    // .style("background-color", "blue")
    .style("height", "1px")
    .style("margin-bottom", "0px")

  d3.select(".gameHolder")
    .style("margin-top", "300px")
})
// player3
$("#player3").on("click",function(){
  // setInital();
d3.selectAll(".invisable")
  .classed("invisable", false)

  d3.selectAll(".visable")
  .classed("invisable", true);
  d3.selectAll(".visable")
    .classed("visable", false);
  d3.select(".greeting").transition()
    // .style("background-color", "blue")
    .style("height", "1px")
    .style("margin-bottom", "0px")

  d3.select(".gameHolder")
    .style("margin-top", "300px")
})
// stylizing
// var scorekeeper = d3.select(".scoreKeeper")
// d3.select(".scoreKeeper"
//     .attr("cx", 200)
//     .attr("cy", 100)
//     .attr("r", 50)
//     .style("fill", "red");

})

function dropDown() {

  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function dropDown1() {

  document.getElementById("myDropdown1").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
