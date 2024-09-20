const gameBoard = document.getElementById('gameBoard');
const cardImages = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png'];
let flippedCards = [];

function createCards() {
    const cards = [];
    for (let i = 0; i < cardImages.length; i++) {
        cards.push({ image: cardImages[i], isFlipped: false });
        cards.push({ image: cardImages[i], isFlipped: false });
    }

    cards.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = i;
        card.style.backgroundImage = `url(${cards[i].image})`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

function flipCard(event) {
    const card = event.target;
    const index = card.dataset.index;

    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const card1 = document.querySelector(`.card[data-index="${flippedCards[0]}"]`);
    const card2 = document.querySelector(`.card[data-index="${flippedCards[1]}"]`);

    if (card1.style.backgroundImage === card2.style.backgroundImage) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

createCards();