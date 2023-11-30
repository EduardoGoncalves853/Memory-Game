function backPage() {
  const playerConfirm = confirm(
    "Deseja realmente sair? Voçê perderá seu progresso"
  );
  if (playerConfirm) {
    window.history.back();
  }
}

function createCards() {
  const cardNames = [
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    "card-6",
    "card-7",
    "card-8",
    "card-9",
    "card-10",
    "card-11",
    "card-12",
    "card-13",
    "card-14",
    "card-15",
    "card-16",
    "card-17",
  ];

  const arrayCardsName = cardNames
    .sort(() => Math.random() - 0.5)
    .filter((value, index) => index < 10);
  const sortedCards = [...arrayCardsName, ...arrayCardsName].sort(
    () => Math.random() - 0.5
  );
  
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
            `;
          });
        }

function checkGamewin() {
          const disabledCards = document.querySelectorAll(".disabledCard");
        
          if (disabledCards.length === 16) {
            clearInterval(finishTimerInterval);
        
            const userData = {
              name: storagePlayerNick,
              time: timer.textContent,
            };
        
            // usamos JSON parse para transformar a string em algo que JS possa trabalhar, ou seja, object.
        
            const storageRank = JSON.parse(
              localStorage.setItem("@memoryGame:rank", userData)
            );
        
            if (storageRank) {
              const rankData = [...storageRank, userData];
              localStorage.setItem("@memoryGame:rank", JSON.stringify([rankData]));
            } else {
              localStorage.setItem("@memoryGame:rank", JSON.stringify([userData]));
            }
        
            alert(`Parabéns ${storagePlayerNick}, você ganhou com o tempo de: 00:00!`);
          }
}

function checkMatchCards() {
  // se ambas as cartas tiverem o mesmo atributo ou imagem
  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    // O aúdio funciona

    new Audio("../audios/sci-fi.wav").play();
    setTimeout(() => {
      firstCard.classList.add("disabledCard");
      secondCard.classList.add("disabledCard");
      firstCard = "";
      secondCard = "";
      checkGamewin();
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipCard");
      secondCard.classList.remove("flipCard");
      firstCard = "";
      secondCard = "";

      // pode checar nâo só para vencer o jogo, mas tambèm
      // para checar se o player teve um numéro X de cartas,
      // no caso 20
    }, 500);
  }
}

function clickFlipCard() {
  const arrayCards = document.querySelectorAll(".card");
  arrayCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Audio play
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
    });
  });
}

function setStartTimer() {
  finishTimerInterval = setInterval(() => {
    const dateNow = new Date();
    const dateDiff = new Date(dateNow - initialDateTimer);

    const minutes = String(dateDiff.getMinutes()).padStart("2", "0");
    const seconds = String(dateDiff.getSeconds()).padStart("2", "0");

    console.log(`${String(minutes)}:${seconds}`);

    timer.innerHTML = `${minutes} : ${seconds}`;
  }, 1000);
}





const playerNick = document.querySelector(".playerNick");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");
const timer = document.querySelector(".playerTimer");

const storagePlayerNick = localStorage.getItem("@memoryGame:playerName");
playerNick.innerHTML = storagePlayerNick;
backButton.addEventListener("click", backPage);

createCards();

let firstCard = "";
let secondCard = "";
clickFlipCard();

const initialDateTimer = new Date();
let finishTimerInterval;
setStartTimer();

