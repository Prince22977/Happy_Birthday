const countdownDate = new Date().getTime() + 10000;

setTimeout(() => {
  document.getElementById("screen1").classList.remove("active");
  document.getElementById("screen2").classList.add("active");
}, 3000);

const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("screen2").classList.remove("active");
    document.getElementById("screen3").classList.add("active");

    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 70%)`;
      confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
      confetti.style.width = confetti.style.height = Math.random() * 8 + 6 + "px";
      document.body.appendChild(confetti);
    }
  }
}, 1000);

function openCard() {
  document.getElementById("tabs").style.display = "block";
  showTab('messageTab');
  document.getElementById("bgMusic").play();
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';

  if (tabId === 'emojiGameTab') {
    createEmojiGame();
  }
}

const emojis = ['🐥','😘','💑','💖','💕','💗','💓','💘','🌸','🎁'];
let cards = [], flippedCards = [], lockBoard = false;

function shuffleEmojis() {
  const doubled = [...emojis, ...emojis];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled;
}

function createEmojiGame() {
  const board = document.getElementById('game-board');
  const winMessage = document.getElementById('winMessage');
  board.innerHTML = '';
  winMessage.style.display = 'none';
  cards = [];
  flippedCards = [];
  lockBoard = false;

  const shuffled = shuffleEmojis();

  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '60px';
    card.style.height = '60px';
    card.style.background = '#fff';
    card.style.borderRadius = '10px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.fontSize = '24px';
    card.style.cursor = 'pointer';
    card.style.boxShadow = '0 0 5px rgba(0,0,0,0.1)';
    card.innerHTML = '❓';
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipEmojiCard);
    board.appendChild(card);
    cards.push(card);
  });
}

function flipEmojiCard() {
  if (lockBoard || this.classList.contains('matched') || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.innerHTML = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add('matched');
      second.classList.add('matched');
      flippedCards = [];
      lockBoard = false;

      if (cards.every(card => card.classList.contains('matched'))) {
        setTimeout(() => {
          document.getElementById("winMessage").style.display = "block";
        }, 500);
      }
    } else {
      setTimeout(() => {
        first.innerHTML = '❓';
        second.innerHTML = '❓';
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
      }, 700);
    }
  }
}
