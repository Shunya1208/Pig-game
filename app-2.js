var init = function(){
    var fields,arr;

    fields = document.querySelectorAll(".player-score,.player-current-score");
    arr = Array.prototype.slice.call(fields);

    arr.forEach(function(cur){
        cur.textContent = "0";
    })

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");

    document.getElementById("name-0").textContent = "PLAYER 1"
    document.getElementById("name-1").textContent = "PLAYER 2"

    data.globalScore.p1 = 0;
    data.globalScore.p2 = 0;
    data.roundScore = 0;
    activePlyer = 0;
    state = true;

};

var nextPlayer = function() {
        data.roundScore = 0
        document.querySelector("#current-" + activePlyer).textContent = data.roundScore;
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        activePlyer === 0 ? activePlyer = 1 : activePlyer = 0;
};

var calcScore = function() {
    if(state){
        var dice = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".dice").src = "dice-" + dice + ".png";
        document.querySelector(".dice").style.display = "block";
    
        console.log(dice);
    
        if(dice !== 1) {
            data.roundScore += dice;
            document.querySelector("#current-" + activePlyer).textContent = data.roundScore;
    
        }else {
            nextPlayer();
        }
    }
};

var holdScore = function() {
    if(state) {
        data.globalScore["p" + activePlyer] += data.roundScore;
        document.getElementById("score-" + activePlyer).textContent = data.globalScore["p" + activePlyer];
    
        if(data.globalScore["p" + activePlyer] >= 20) {
            document.querySelector(".player-" + activePlyer +"-panel").classList.remove("active");
            document.querySelector(".player-" + activePlyer +"-panel").classList.add("winner");
            document.querySelector("#name-" + activePlyer).textContent = "Winner!!!";
    
            state = false;
        } else {
            nextPlayer();
        }
    }
};



var data = {
    globalScore:{
        p0: 0,
        p1: 0
    },

    roundScore: 0
};

var activePlyer = 0;
var state;

init();

document.querySelector(".btn-roll").addEventListener("click",calcScore);

document.querySelector(".btn-hold").addEventListener("click",holdScore);

document.querySelector(".btn-new").addEventListener("click",init);