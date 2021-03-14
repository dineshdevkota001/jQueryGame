$(document).ready(() => {
    $('#gameover').trigger('load');
    $('#beep').trigger('load');
    $('#gamestart').trigger('load');
    $('#gameOver').on('click', () => {
        let difficulty = 3000 - parseInt($('#difficulty').val()) * 200;
        // 2000 = 5 1000=10 3000=1
        console.log(difficulty)
        $('#gameOver').fadeOut(300);
        $('#gamestart').trigger('play');
        setTimeout(game(difficulty), 5000);
        setTimeout(()=>{$('#gameElements').removeClass('blur')},1000);
        // $('.cell').off('click')
    })
})

const game = (difficulty) => {
    console.log('timestart')
    $('#score').html('0')
    var intervalClock = setInterval(() => {
        randomFadein(Math.floor(difficulty*0.9), intervalClock)
    }, difficulty);
}

const randomFadein = (fadeSpeed, intervalClock) => {
    var score = parseInt($('#score').html());
    gameOverflag = true;
    let rnd = Math.floor(Math.random() * 10)
    if (rnd === 0) rnd = 5;
    let pickedCell = '#' + rnd.toString();
    $(pickedCell).addClass('clickable');
    $(pickedCell).on('click', () => {
                score = score + 1;
                $('#score').html(score);
                gameOverflag= false;
                $(pickedCell).removeClass('clickable');
                $(pickedCell).addClass('clicked');
                $('#beep').trigger('play');
            })
    setTimeout(() => {
        $(pickedCell).removeClass('clicked');
        $(pickedCell).off('click');
        if (gameOverflag){
            console.log('gameover');
            $('#gameover').trigger('play');
            gameOver(intervalClock);
        }
    },fadeSpeed/(1 + score*0.01));
}

const gameOver = (intervalClock)=>{
    clearInterval(intervalClock);
    $('#gameElements').addClass('blur')
    $('.clickable').removeClass('clickable');
    $('#centerText').html('GameOver');
    $('#continueText').html('Click to Restart. Your Score is '+$('#score').html())
    $('#score').html('0');
    $('#gameOver').fadeIn(2000);
}