// by default set p1 mark as x
var p1Mark = "x";
var turn = "x";
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

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
    makeBoard("cpu");
})

document.querySelector(".vs-player").addEventListener("click", function () {
    // console.log("starting vs player game with p1 as: " + p1Mark)
    makeBoard("player");
})

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        let row = Math.floor(i / 3);
        let col = (i % 3);

        // only write in a new value on an empty cell
        if (board[row][col] == "") {
            board[row][col] = turn;
            if (turn == "x") {
                this.firstElementChild.src = "./assets/icon-x.svg";
                turn = "o"
                // change svg up top
                document.querySelector(".x-svg").classList.remove("visible")
                document.querySelector(".o-svg").classList.add("visible")
                // set value in 2d array

            }
            else {
                this.firstElementChild.src = "./assets/icon-o.svg";
                turn = "x"
                // change svg up top
                document.querySelector(".x-svg").classList.add("visible")
                document.querySelector(".o-svg").classList.remove("visible")
            }
        }
        console.log(board)
        // check for win conditions
    })
}

function makeBoard(versus) {
    document.querySelector(".new-game-menu").classList.remove("visible")
    document.querySelector(".in-game").classList.add("visible")
    document.querySelector(".x-svg").classList.add("visible")
    if (versus == "cpu") {
        // set the bottom to show this
        // only setting for o since default is set for x
        if (p1Mark == "o") {
            document.querySelector(".game-state-x-label").textContent = "(CPU)"
            document.querySelector(".game-state-o-label").textContent = "(YOU)"
        }
    }
    else {
        // set the bottom to show vs player
        if (p1Mark == "x") {
            document.querySelector(".game-state-x-label").textContent = "(P1)"
            document.querySelector(".game-state-o-label").textContent = "(P2)"
        }
        else {
            document.querySelector(".game-state-x-label").textContent = "(P2)"
            document.querySelector(".game-state-o-label").textContent = "(P1)"
        }
    }
}

function checkWin() {

}