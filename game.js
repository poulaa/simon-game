var buttonColours = ["red", "blue", "green", "yellow" ];

var gamePattern = [];
var userClickedPattern =[];
var userChosenColour;

var level = 0;
var start = false;

function nextSequence()
{
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level " + level);
    var rand = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[rand];
    
   
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
}

// wehn user click on button

$( ".btn" ).click( function() {
     userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);

        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);

  } );


  function checkAnswer(currentLevel)
  {       
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
          console.log("success");
    
          //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
          if (userClickedPattern.length === gamePattern.length){
    
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
    
          var wrong = new Audio("sounds/" + "wrong" + ".mp3");
          wrong.play();

          $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
        }
  
  }

  function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  

  function animatePress(currentColour)
  {
    
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
  }

  $(document).keypress(function() {
    if (!start){
    

    $("h1").text( "level "+level) ; 
   
    nextSequence();
    start = true;
    }
  }
);

function startOver()
{
  level=0;
  gamePattern =[];
start=0;
}