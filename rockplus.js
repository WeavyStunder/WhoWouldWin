function submitRockplus() {
  //Gets the input values
  var playOne = document.getElementById("playerOneInput").value;
  var playTwo = document.getElementById("playerTwoInput").value;

  //Tests if they put in "Rock-Paper-Scissors"
  var rps = testRps(playOne.toLowerCase(), playTwo.toLowerCase());

  //Doesn't do the rest if "Rock-Paper-Scissors were input"
  if (!rps){
    //Turns the input values into numbers that would be a pain to calculate
    a = parseInt(hashFnv32a(playOne.toLowerCase(), "golf"))
    b = parseInt(hashFnv32a(playTwo.toLowerCase(), "golf"))

    //Checks for a draw
    if (a == b){
      draw();
    }

    //There's a better way to do this but I wrote this before breakfast and it 'aint broke so I'm not fixing it.

    //If it's not a draw, then it tests whether the two values are in the same half, in which case the lower number wins
    else{
      if ((a > 5000000000 && b > 5000000000) || (a < 5000000000 && b < 5000000000)){
        if (a < b)
          aWins();
        else
          bWins();
      }

      
      //Otherwise, the higher number needs to be more than 5 billion higher than the lower number to win
      else{
        if (a < 5000000000){
          if ((a+5000000000) > b)
            aWins();
          else
            bWins();
        }
        if (b < 5000000000){
          if ((b+5000000000) > a)
            bWins();
          else
            aWins();
        }
      }
    }
  }
}

//Honestly, I just got this from the internet and it does what I want so I don't question it.
function hashFnv32a(str, seed) {
  /*jshint bitwise:false */
  var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return scrambleString(""+(hval >>> 0));
}

//Flips the hashes so that input length doesn't influence has value as heavily.
function scrambleString(str) {
  while (str.length < 10){
    str = "0" + str;
  }
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
  }
  return newString;
}

//Specifically makes Rock-Paper-Scissors work.
function testRps(a,b)
{
  if (a == "rock"){
    if (b == "rock"){
      draw();
      return true;
    }
    if (b == "paper"){
      bWins();
      return true;
    }
    if (b == "scissors"){
      aWins();
      return true;
    }
  }

  if (a == "paper"){
    if (b == "rock"){
      aWins();
      return true;
    }
    if (b == "paper"){
      draw();
      return true;
    }
    if (b == "scissors"){
      bWins();
      return true;
    }
  }

  if (a == "scissors"){
    if (b == "rock"){
      bWins();
      return true;
    }
    if (b == "paper"){
      aWins();
      return true;
    }
    if (b == "scissors"){
      draw();
      return true;
    }
  }
  return false;
}

//Does Stuff if Fighter 1 wins
function aWins(){
  winDialogue(document.getElementById("playerOneInput").value, document.getElementById("playerTwoInput").value);
  document.getElementById("victor").innerHTML = document.getElementById("playerOneInput").value + " WINS!"
}
//Does Stuff if Fighter 2 wins
function bWins(){
  winDialogue(document.getElementById("playerTwoInput").value, document.getElementById("playerOneInput").value);
  document.getElementById("victor").innerHTML = document.getElementById("playerTwoInput").value + " WINS!"
}
//Does stuff if it's a draw
function draw(){
  drawDialogue();
}

//The random bit of dialogue is based on the input values as well
function winDialogue(winner, loser){
  rand = Math.floor((parseInt(hashFnv32a(winner.toLowerCase(), loser.toLowerCase())))/1000000000)
  if (rand == 0)
    document.getElementById("results").innerHTML = winner + " crushes " + loser;
  else if (rand == 1)
    document.getElementById("results").innerHTML = winner + " kicks " + loser + " to the curb";
  else if (rand == 2)
    document.getElementById("results").innerHTML = winner + " just barely manages to defeat " + loser;
  else if (rand == 3)
    document.getElementById("results").innerHTML = winner + " stomps " + loser + " without even breaking a sweat";
  else if (rand == 4)
    document.getElementById("results").innerHTML = loser + " makes a valiant effort, but is ultimately defeated by " + winner;
  else if (rand == 5)
    document.getElementById("results").innerHTML = winner + " sends " + loser + " running home crying for their mommy";
  else if (rand == 6)
    document.getElementById("results").innerHTML = winner + " absolutely annihilates " + loser;
  else if (rand == 7)
    document.getElementById("results").innerHTML = winner + " wipes the floor with " + loser;
  else if (rand == 8)
    document.getElementById("results").innerHTML = winner + " handily defeats " + loser;
  else if (rand == 9)
    document.getElementById("results").innerHTML = loser + " almost manages to pull out the dub, but " + winner + " comes out on top";
  else
  document.getElementById("results").innerHTML = winner + " breaks reality and my code. " + loser + " doesn't even stand a chance"
}

//Sometimes there's a draw
function drawDialogue(){
  document.getElementById("victor").innerHTML = "It's a draw."
}
