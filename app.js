// by default set p1 mark as x
var p1Mark = "x";
var turn = "x";

// blank all the cells which are by default set to x for valid html
var cells = document.querySelectorAll(".board-cell");
for (let cell of cells) {
    cell.firstElementChild.src = "";
}

document.querySelector(".new-game-menu").classList.add("visible")

document.querySelector(".x-choice").addEventListener("click", function () {
    p1Mark = "x";
})

document.querySelector(".o-choice").addEventListener("click", function () {
    p1Mark = "o";
})

document.querySelector(".vs-cpu").addEventListener("click", function () {
    // console.log("starting vs cpu game with p1 as: " + p1Mark)
    makeBoard();
})

document.querySelector(".vs-player").addEventListener("click", function () {
    // console.log("starting vs player game with p1 as: " + p1Mark)
    makeBoard();
})

for (let cell of cells) {
    cell.addEventListener("click", function () {
        if (turn == "x") {
            this.firstElementChild.src = "./assets/icon-x.svg";
            turn = "o"
            // change svg up top
            document.querySelector(".x-svg").classList.remove("visible")
            document.querySelector(".o-svg").classList.add("visible")
        }
        else {
            this.firstElementChild.src = "./assets/icon-o.svg";
            turn = "x"
            // change svg up top
            document.querySelector(".x-svg").classList.add("visible")
            document.querySelector(".o-svg").classList.remove("visible")
        }
    })
}

function makeBoard() {
    document.querySelector(".new-game-menu").classList.remove("visible")
    document.querySelector(".in-game").classList.add("visible")
    document.querySelector(".x-svg").classList.add("visible")
}