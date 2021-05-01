var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var number=0;
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play()
    audio.remove()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(() => {
        $("#"+currentColour).removeClass('pressed');
    }, 100);;
}
function nextSequence(){    
    randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour)
    level++;
    $('h1').text('Level '+level);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function gameOver(){
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);;
    level=0;
    number=0;
    gamePattern=[];
    userClickedPattern=[];
    $('.start').prop('disabled',false);
    $('h1').text('Game Over');
    $('.start').html('Play Again');
}

function checkAnswer(){
    console.log('check '+number);
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[number-1]==userClickedPattern[number-1]){
        console.log("pass");
        if(number==level){
            console.log('level pass');
            userClickedPattern=[];
            number=0;
            nextSequence();
        }
    }else{
        console.log('gameover');
        gameOver();
    }
   
}

$('.btn').click(
   
    function(){    
        if(level!=0){     
        userClickedPattern.push($(this).attr('id'))
        playSound($(this).attr('id'))
        animatePress($(this).attr('id'))
        number++;
        checkAnswer();
        }
    }

)

$('.start').click(
    function(){
        $('.start').prop('disabled',true);
        $('.start').html('Play');
        nextSequence();
    }
)