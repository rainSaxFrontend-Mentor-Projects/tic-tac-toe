// by default set p1 mark as x
var p1Mark = "x";
var turn = "x";
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
var versus;

// blank all the cells which are by default set to x for valid html
var cells = document.querySelectorAll(".board-cell");

function resetScores() {
    document.querySelector(".x-score").lastElementChild.textContent = 0
    document.querySelector(".o-score").lastElementChild.textContent = 0
    document.querySelector(".ties-score").lastElementChild.textContent = 0
}

function clearBoard() {
    for (let cell of cells) {
        cell.firstElementChild.src = "";
        if (cell.classList.contains("winner-cell-x")) {
            cell.classList.remove("winner-cell-x")
        }
        if (cell.classList.contains("winner-cell-o")) {
            cell.classList.remove("winner-cell-o")
        }
        if (cell.firstElementChild.classList.contains("winner-img")) {
            cell.firstElementChild.classList.remove("winner-img")
        }
        if (cell.childElementCount > 1) {
            cell.removeChild(cell.lastElementChild)
        }
        setTurn("o")
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = ""
        }
    }
    document.querySelector(".game-result-icon-winner").innerHTML = "<h1 class='game-result-main-text'> takes the round</h1>"
    if (versus == "cpu" && p1Mark != "x") {
        generateMoveRand()
    }
}

document.querySelector(".new-game-menu").classList.add("visible")

document.querySelector(".x-choice").addEventListener("click", function () {
    p1Mark = "x";
})

document.querySelector(".o-choice").addEventListener("click", function () {
    p1Mark = "o";
})

for (let newGame of document.querySelectorAll(".new")) {
    newGame.addEventListener("click", function () {
        if (this.classList.contains("vs-cpu")) {
            versus = "cpu"
        }
        else {
            versus = "player"
        }
        makeBoard(versus)
    })
}


for (let i = 0; i < cells.length; i++) {
    // if (versus == "cpu" || versus == "player") {
    cells[i].addEventListener("click", function () {
        if ((versus == "cpu" && turn == p1Mark) || versus == "player") {
            makeMove(i)
        }
        if (versus == "cpu" && turn != p1Mark && !document.querySelector(".game-over").classList.contains("visible")) {
            // generateMoveRand()
            generateMoveClever()
        }
    })

    cells[i].addEventListener("mouseenter", function () {
        let row = Math.floor(i / 3)
        let col = i % 3
        if (board[row][col] == "") {
            if (turn == "x") {
                this.firstElementChild.src = "./assets/icon-x-outline.svg"
            }
            else {
                this.firstElementChild.src = "./assets/icon-o-outline.svg"
            }
        }
    })

    cells[i].addEventListener("mouseleave", function () {
        let row = Math.floor(i / 3)
        let col = i % 3
        if (board[row][col] == "") {
            this.firstElementChild.src = ""
        }
    })
}

function makeMove(index) {
    let row = Math.floor(index / 3);
    let col = (index % 3);

    // only write in a new value on an empty cell
    if (board[row][col] == "") {
        board[row][col] = turn;
        if (turn == "x") {
            cells[index].firstElementChild.src = "./assets/icon-x.svg";
        }
        else {
            cells[index].firstElementChild.src = "./assets/icon-o.svg";
        }
        setTurn(turn)
    }

    // check for win conditions
    let winner = checkWin();
    if (winner != "") {
        // set up results screen with winner
        console.log("Winner: " + winner + "!")
        gameOverState(winner)
    }
}

function generateMoveRand() {
    let row;
    let col;
    let index;

    do {
        index = Math.floor(Math.random() * 9);
        row = Math.floor(index / 3);
        col = (index % 3);
        console.log("row:" + row + " col: " + col)
    } while (board[row][col] != "")

    // only write in a new value on an empty cell
    if (board[row][col] == "") {
        board[row][col] = turn;
        if (turn == "x") {
            cells[index].firstElementChild.src = "./assets/icon-x.svg";
        }
        else {
            cells[index].firstElementChild.src = "./assets/icon-o.svg";
        }
        setTurn(turn)
    }

    // check for win conditions
    let winner = checkWin();
    if (winner != "") {
        // set up results screen with winner
        console.log("Winner: " + winner + "!")
        gameOverState(winner)
    }
}

function AIcheckBlockRows(coords) {
    for (let i = 0; i < board.length; i++) {
        // object to hold coords once a blank spot is found
        let blank = {
            row: 0,
            col: 0
        };

        // bool - blank spot or not
        let blankBool = 0;

        // count of opponent marks
        let count = 0;

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != turn && board[i][j] != "") {
                count++;
                console.log("count: " + count)
            }
            if (board[i][j] == "") {
                blank.row = i;
                blank.col = j;
                blankBool = 1;
            }
            if (blankBool == 1 && count == 2) {
                coords.row = blank.row;
                coords.col = blank.col;
                return 1;
            }
        }
    }
    return 0;
}

function AIcheckFillRows(coords) {
    for (let i = 0; i < board.length; i++) {
        // object to hold coords once a blank spot is found
        let blank = {
            row: 0,
            col: 0
        };

        // bool - blank spot or not
        let blankBool = 0;

        // count of opponent marks
        let count = 0;

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == turn) {
                count++;
                console.log("count: " + count)
            }
            if (board[i][j] == "") {
                blank.row = i;
                blank.col = j;
                blankBool = 1;
            }
            if (blankBool == 1 && count == 2) {
                coords.row = blank.row;
                coords.col = blank.col;
                return 1;
            }
        }
    }
    return 0;
}

function AIcheckBlockCols(coords) {
    for (let i = 0; i < board.length; i++) {
        // object to hold coords once a blank spot is found
        let blank = {
            row: 0,
            col: 0
        };

        // bool - blank spot or not
        let blankBool = 0;

        // count of opponent marks
        let count = 0;

        for (let j = 0; j < board[i].length; j++) {
            if (board[j][i] != turn && board[j][i] != "") {
                count++;
                console.log("count: " + count)
            }
            if (board[j][i] == "") {
                blank.row = j;
                blank.col = i;
                blankBool = 1;
            }
            if (blankBool == 1 && count == 2) {
                coords.row = blank.row;
                coords.col = blank.col;
                return 1;
            }
        }
    }
    return 0;
}

function AIcheckFillCols(coords) {
    for (let i = 0; i < board.length; i++) {
        // object to hold coords once a blank spot is found
        let blank = {
            row: 0,
            col: 0
        };

        // bool - blank spot or not
        let blankBool = 0;

        // count of opponent marks
        let count = 0;

        for (let j = 0; j < board[i].length; j++) {
            if (board[j][i] == turn) {
                count++;
                console.log("count: " + count)
            }
            if (board[j][i] == "") {
                blank.row = j;
                blank.col = i;
                blankBool = 1;
            }
            if (blankBool == 1 && count == 2) {
                coords.row = blank.row;
                coords.col = blank.col;
                return 1;
            }
        }
    }
    return 0;
}

function AIcheckBlockDiags(coords) {
    // bottom r
    if ((board[0][0] != turn && board[0][0] != "") &&
        (board[1][1] != turn && board[1][1] != "") && board[2][2] == "") {
        coords.row = 2;
        coords.col = 2;
        return 1;
    }
    // top r
    if ((board[2][0] != turn && board[2][0] != "") &&
        (board[1][1] != turn && board[1][1] != "") && board[0][2] == "") {
        coords.row = 0;
        coords.col = 2;
        return 1;
    }
    // bottom l
    if ((board[0][2] != turn && board[0][2] != "") &&
        (board[1][1] != turn && board[1][1] != "") && board[2][0] == "") {
        coords.row = 2;
        coords.col = 0;
        return 1;
    }
    // top l
    if ((board[2][2] != turn && board[2][2] != "") &&
        (board[1][1] != turn && board[1][1] != "") && board[0][0] == "") {
        coords.row = 0;
        coords.col = 0;
        return 1;
    }
    // center1
    if ((board[2][2] != turn && board[2][2] != "") &&
        (board[0][0] != turn && board[0][0] != "") && board[1][1] == "") {
        coords.row = 1;
        coords.col = 1;
        return 1;
    }
    // center2
    if ((board[0][2] != turn && board[0][2] != "") &&
        (board[2][0] != turn && board[2][0] != "") && board[1][1] == "") {
        coords.row = 1;
        coords.col = 1;
        return 1;
    }
    return 0;
}

function AIcheckFillDiags(coords) {
    // bottom r
    if (board[0][0] == turn &&
        board[1][1] == turn && board[2][2] == "") {
        coords.row = 2;
        coords.col = 2;
        return 1;
    }
    // top r
    if (board[2][0] == turn &&
        board[1][1] == turn && board[0][2] == "") {
        coords.row = 0;
        coords.col = 2;
        return 1;
    }
    // bottom l
    if (board[0][2] == turn &&
        board[1][1] == turn && board[2][0] == "") {
        coords.row = 2;
        coords.col = 0;
        return 1;
    }
    // top l
    if (board[2][2] == turn &&
        board[1][1] == turn && board[0][0] == "") {
        coords.row = 0;
        coords.col = 0;
        return 1;
    }
    // center1
    if (board[2][2] == turn &&
        board[0][0] == turn && board[1][1] == "") {
        coords.row = 1;
        coords.col = 1;
        return 1;
    }
    // center2
    if (board[0][2] == turn &&
        board[2][0] == turn && board[1][1] == "") {
        coords.row = 1;
        coords.col = 1;
        return 1;
    }

    return 0;
}


function generateMoveClever() {
    let coords = {
        row: 0,
        col: 0,
    };

    let index;

    // initially set row and col to a random value for an unfilled cell
    do {
        coords.row = Math.floor(Math.random() * 3);
        coords.col = Math.floor(Math.random() * 3);
        // console.log("row:" + row + " col: " + col)
    } while (board[coords.row][coords.col] != "")

    // check rows make 3
    if (AIcheckFillRows(coords) == 0) {
        // check columns make 3
        if (AIcheckFillCols(coords) == 0) {
            // check diagonals make 3
            if (AIcheckFillDiags(coords) == 0) {
                // check block rows
                if (AIcheckBlockRows(coords) == 0) {
                    // check block cols
                    if (AIcheckBlockCols(coords) == 0) {
                        // check block diags
                        if (AIcheckBlockDiags(coords) == 0) {
                            // try and build a chain
                        }
                    }
                }
            }
        }
    }

    index = (coords.row * 3) + coords.col

    console.log("row:" + coords.row + " col: " + coords.col + " index: " + index)

    // only write in a new value on an empty cell
    if (board[coords.row][coords.col] == "") {
        board[coords.row][coords.col] = turn;
        if (turn == "x") {
            cells[index].firstElementChild.src = "./assets/icon-x.svg";
        }
        else {
            cells[index].firstElementChild.src = "./assets/icon-o.svg";
        }
        setTurn(turn)
    }

    // check for win conditions
    let winner = checkWin();
    if (winner != "") {
        // set up results screen with winner
        console.log("Winner: " + winner + "!")
        gameOverState(winner)
    }
}

function setTurn(pturn) {
    if (pturn == "x") {
        turn = "o"
        // change svg up top
        document.querySelector(".x-svg").classList.remove("visible")
        document.querySelector(".o-svg").classList.add("visible")
    }
    else {
        turn = "x"
        // change svg up top
        document.querySelector(".x-svg").classList.add("visible")
        document.querySelector(".o-svg").classList.remove("visible")
    }
}

function gameOverState(winner) {
    //dim the area behind
    document.querySelector("main").classList.add("dimmed")

    // increment score counters
    if (winner == "x") {
        document.querySelector(".x-score").lastElementChild.textContent++
    }
    else if (winner == "o") {
        document.querySelector(".o-score").lastElementChild.textContent++
    }
    else if (winner == "tied") {
        document.querySelector(".ties-score").lastElementChild.textContent++
    }

    // set up game over elements here
    if (versus == "cpu") {
        if (winner == p1Mark) {
            document.querySelector(".game-result-message").textContent = "You Won!"
        }
        else {
            document.querySelector(".game-result-message").textContent = "Oh no, you lost..."
        }
    }
    else {
        if (winner == p1Mark) {
            document.querySelector(".game-result-message").textContent = "Player 1 Wins!"
        }
        else {
            document.querySelector(".game-result-message").textContent = "Player 2 Wins!"
        }
    }

    if (winner == "o") {
        let image = document.createElement("img")
        image.src = "./assets/icon-o.svg"
        document.querySelector(".game-result-icon-winner").insertAdjacentElement("afterbegin", image)
        document.querySelector(".game-result-main-text").style.color = "#F2B137"
    }
    else if (winner == "x") {
        let image = document.createElement("img")
        image.src = "./assets/icon-x.svg"
        document.querySelector(".game-result-icon-winner").insertAdjacentElement("afterbegin", image)
        document.querySelector(".game-result-main-text").style.color = "#31C3BD"
    }

    document.querySelector(".game-result-message").classList.add("visible")

    if (winner == "tied") {
        document.querySelector(".game-result-message").classList.remove("visible")
        document.querySelector(".game-result-main-text").textContent = "Round Tied"
        document.querySelector(".game-result-main-text").style.color = "#A8BFC9"
    }

    if (winner == "restart") {
        document.querySelector(".game-result-message").classList.remove("visible")
        document.querySelector(".game-result-main-text").textContent = "Restart Game?"
        document.querySelector(".game-result-main-text").style.color = "#A8BFC9"
        document.querySelector(".button-next").textContent = "Yes, Restart"
        document.querySelector(".button-quit").textContent = "No, Cancel"
    }
    document.querySelector(".game-over").classList.add("visible")
}

document.querySelector(".button-next").addEventListener("click", function () {
    document.querySelector("main").classList.remove("dimmed")

    // remove game over screen
    document.querySelector(".game-over").classList.remove("visible")

    // clear the game board
    clearBoard()

    if (this.textContent == "Yes, Restart") {
        this.textContent = "Next Round"
        document.querySelector(".button-quit").textContent = "Quit"
    }
})

document.querySelector(".restart").addEventListener("click", function () {
    gameOverState("restart")
})

document.querySelector(".button-quit").addEventListener("click", function () {
    if (this.textContent == "No, Cancel") {
        document.querySelector(".game-over").classList.remove("visible")
        document.querySelector(".button-next").textContent = "Next Round"
        this.textContent = "Quit"
    }
    else {
        clearBoard()
        resetScores()
        document.querySelector(".button-next").textContent = "Next Round"
        this.textContent = "Quit"
        document.querySelector(".game-over").classList.remove("visible")
        document.querySelector(".in-game").classList.remove("visible")
        document.querySelector(".new-game-menu").classList.add("visible")
    }
    document.querySelector("main").classList.remove("dimmed")

})

function checkWin() {
    // svg styling for row highlighting
    let svgObj = {
        pathD: "",
        bgClass: "",
    };
    let tied = 1;

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
                // style the row
                console.log(cells)
                console.log("row: " + i)
                // calculate starting index in cells for styling
                let start = (i * 3)
                console.log(start)

                setPathandBgClass(hval, svgObj)
                colorCells(start, 1, svgObj)

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
                console.log("col: " + i)
                console.log(cells)

                // winners are i, (i + 3), (i + 3 + 3)
                let start = i
                setPathandBgClass(vval, svgObj)
                colorCells(start, 3, svgObj)

                return vval;
            }
        }
    }

    // diagonal wins
    let dval1 = board[0][0]
    if (dval1 != "") {
        if (dval1 == board[1][1] && dval1 == board[2][2]) {
            let start = 0
            // winner is start, start + 4, start + 8
            setPathandBgClass(dval1, svgObj)
            colorCells(start, 4, svgObj)

            return dval1
        }
    }
    let dval2 = board[0][2]
    if (dval2 != "") {
        if (dval2 == board[1][1] && dval2 == board[2][0]) {
            let start = 2
            // winner is start, start + 2, start + 4
            setPathandBgClass(dval2, svgObj)
            colorCells(start, 2, svgObj)

            return dval2
        }
    }

    // check for a tie
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == "") {
                tied = 0;
            }
        }
    }
    if (tied) {
        return ("tied")
    }
    return ("")
}

// requirements: startVal, increment, svgObj
function colorCells(startVal, increment, svgObj) {
    for (let i = startVal; i <= (startVal + (increment * 2)); i += increment) {

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svg.setAttribute("viewBox", "0 0 65 65")
        path.setAttribute("d", svgObj.pathD)
        path.setAttribute("fill", "#1A2A33")
        svg.appendChild(path)

        cells[i].classList.add(svgObj.bgClass)
        cells[i].firstElementChild.classList.add("winner-img")
        cells[i].appendChild(svg)
    }
}

function setPathandBgClass(icon, svg) {
    if (icon == "x") {
        svg.pathD = "M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
        svg.bgClass = "winner-cell-x"
    }
    else {
        svg.pathD = "M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        svg.bgClass = "winner-cell-o"
    }
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
            generateMoveRand()
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
    clearBoard()
}

