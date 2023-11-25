export var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

export var turn = "x";

// required to modify imported variable turn
export function changeTurn(val) {
    turn = val;
}

export function AIcheckBlockRows(coords) {
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

export function AIcheckFillRows(coords) {
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

export function AIcheckBlockCols(coords) {
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

export function AIcheckFillCols(coords) {
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

export function AIcheckBlockDiags(coords) {
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

export function AIcheckFillDiags(coords) {
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

export function AImakeChain(coords) {
    let blank = {
        coord1: [-1, -1],
        coord2: [-1, -1]
    };
    let blankBool;
    let icon;
    // look for row / col / diag with 2 free spaces & icon of turn
    for (let i = 0; i < board.length; i++) {
        blankBool = 0;
        icon = 0;
        blank.coord1[0] = -1
        blank.coord1[1] = -1
        blank.coord2[0] = -1
        blank.coord2[1] = -1
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == "") {
                blankBool++;
                if (blank.coord1[0] == -1) {
                    blank.coord1[0] = i;
                    blank.coord1[1] = j;
                }
                else {
                    blank.coord2[0] = i;
                    blank.coord2[1] = j;
                }
            }
            if (board[i][j] == turn) {
                icon = 1;
                console.log("turn: " + turn)
            }
        }
        if (blankBool == 2 && icon == 1) {
            let blankChoice = Math.floor(Math.random() * 2)
            if (blankChoice == 0) {
                coords.row = blank.coord1[0];
                coords.col = blank.coord1[1];
            }
            else {
                coords.row = blank.coord2[0];
                coords.col = blank.coord2[1];
            }
            console.log("setting chain row " + "turn: " + turn)
            return 1;
        }
    }
    return 0;
}

export function AImakeChainCol(coords) {
    let blank = {
        coord1: [-1, -1],
        coord2: [-1, -1]
    };
    let blankBool;
    let icon;
    // look for row / col / diag with 2 free spaces & icon of turn
    for (let i = 0; i < board.length; i++) {
        blankBool = 0;
        icon = 0;
        blank.coord1[0] = -1
        blank.coord1[1] = -1
        blank.coord2[0] = -1
        blank.coord2[1] = -1
        for (let j = 0; j < board[i].length; j++) {
            if (board[j][i] == "") {
                blankBool++;
                if (blank.coord1[0] == -1) {
                    blank.coord1[0] = j;
                    blank.coord1[1] = i;
                }
                else {
                    blank.coord2[0] = j;
                    blank.coord2[1] = i;
                }
            }
            if (board[j][i] == turn) {
                icon = 1;
            }
        }
        if (blankBool == 2 && icon == 1) {
            let blankChoice = Math.floor(Math.random() * 2)
            if (blankChoice == 0) {
                coords.row = blank.coord1[0];
                coords.col = blank.coord1[1];
            }
            else {
                coords.row = blank.coord2[0];
                coords.col = blank.coord2[1];
            }
            console.log("setting chain col")
            return 1;
        }
    }
    return 0;
}