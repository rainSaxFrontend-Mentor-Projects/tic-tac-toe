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

            }
            else {
                this.firstElementChild.src = "./assets/icon-o.svg";
                turn = "x"
                // change svg up top
                document.querySelector(".x-svg").classList.add("visible")
                document.querySelector(".o-svg").classList.remove("visible")
            }
        }

        // check for win conditions
        let winner = checkWin();
        if (winner != "") {
            // set up results screen with winner
            console.log("Winner: " + winner + "!")
        }
    })
}

function checkWin() {
    // horizontal wins
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] != "") {
            let hval = board[i][0];
            let count = 0;
            for (let j = 1; j < board[i].length; j++) {
                if (hval == board[i][j]) {
                    count++;
                }
            }
            if (count == 2) {
                return hval;
            }
        }
    }

    // vertical wins
    for (let i = 0; i < 3; i++) {
        if (board[0][i] != "") {
            // use first row values to compare, going down
            let vval = board[0][i];
            let count = 0;
            for (let j = 1; j < 3; j++) {
                // use board[j][i] to loop columns
                if (board[j][i] == vval) {
                    count++;
                }
            }
            if (count == 2) {
                return vval;
            }
        }
    }

    // diagonal wins
    let dval1 = board[0][0]
    if (dval1 != "") {
        if (dval1 == board[1][1] && dval1 == board[2][2]) {
            return dval1
        }
    }
    let dval2 = board[0][2]
    if (dval2 != "") {
        if (dval2 == board[1][1] && dval2 == board[2][0]) {
            return dval2
        }
    }
    return ("")
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

