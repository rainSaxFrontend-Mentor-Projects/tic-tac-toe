// by default set p1 mark as x
var p1Mark = "x";

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

function makeBoard() {
    document.querySelector(".new-game-menu").classList.remove("visible")
    document.querySelector(".in-game").classList.add("visible")
}