const inputName = document.querySelector(".inputName");
const newGameButton = document.querySelector(".newGameButton");
const newGameForm = document.querySelector(".newGameForm");
console.log(inputName);

function validateInput (event) {
    console.log(event.target.value);
    if (event.target.value.length >= 3){
        newGameButton.removeAttribute("disabled");
    } else {
        newGameButton.setAttribute("disabled", "true");
    }
}

function handleSubmitNewGame (event) {
    event.preventDefault();
    console.log(inputName.value);
    localStorage.setItem("@memoryGame:playerName", inputName.value);
    inputName.value = "";
    window.location.href = "pages/cards.html";
}

// Verifica se algum evento aconteceu
inputName.addEventListener("input", validateInput);
newGameForm.addEventListener("submit", handleSubmitNewGame);



// localStorage.setItem("hhhh", "lllll");
// localStorage.getItem();
// console.log(password);