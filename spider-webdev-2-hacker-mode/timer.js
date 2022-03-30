let time = document.querySelector("#time")
let seconds = 0
let minutes = 1
function add() {
    seconds--;
    if (seconds <= 0) {
      seconds = 59;
      minutes--;
    }
    if(minutes===0&&seconds===0)
    {
        alert('Game Over')
    }
    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    window.value=time.textContent
    timer();
  }
  function timer() {
    t = setTimeout(add, 1000);
  }
  add()