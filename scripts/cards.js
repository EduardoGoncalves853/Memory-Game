function backPage() {
    const playerConfirm = confirm("Deseja realmente sair? Voçê perderá seu progresso");
    if (playerConfirm) {
        window.history.back();// 👈👌 Código TopZeira autofocus //
    }
}
// FAzzz o LLL

function createCards() {
    const cardNames = [
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    "card-6",
    "card-7",
    ];

    const arrayCardsName = cardNames
        .sort(() => Math.random() - 0.5)
        .filter((value, index) => index < 7);
    const sortedCards = [...arrayCardsName,...arrayCardsName].sort(() => Math.random() - 0.5);
    gridCards.innerHTML = "";
    sortedCards.forEach((card) => {
        gridCards.innerHTML += `
        <div class="card" name="${card}">
            <div class="front">
                <img src="../images/${card}.jpg" alt="">
            </div>
            <div class="back">
                <img src="../images/yugioh-card-back.png" alt="">
            </div>
        </div>
        `
    });
}

function clickFlipCard() {
    const arrayCards = document.querySelectorAll(".card");
    arrayCards.forEach((card) => {
        card.addEventListener("click", () => {
            console.log("Da uma apertadinha aq no pai");
            if (card.classList.contains("flipCard")) return;
            new Audio("../audios/flip.wav").play();
            if (firstCard === "") {
                card.classList.add("flipCard");
                firstCard = card;
            } else if (secondCard === "") {
                card.classList.add("flipCard");
                secondCard = card;

                checkMatchCards();
            }   
        })
    })

}

function checkMatchCards() {
    if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
        new Audio("../audios/sci-fi.wav").play();
        setTimeout(() => {
            firstCard.classList.add("disabledCard");
            secondCard.classList.add("disabledCard");
            firstCard = ""; secondCard = "";
        }, 500)
        
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipCard");
            secondCard.classList.remove("flipCard");
            firstCard = ""; secondCard = "";
        }, 500)
        
    }
}

const playerNick = document.querySelector(".playerNick");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");

const storagePlayerNick = localStorage.getItem("@memoryGame:playerName");
playerNick.innerHTML = storagePlayerNick;
backButton.addEventListener("click", backPage);

createCards();

let firstCard = "";
let secondCard = "";
clickFlipCard();