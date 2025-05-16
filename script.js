const countdownDate = new Date().getTime() + 10000; // 10 seconds from now

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
  document.getElementById("birthdayMessage").style.display = "block";
  document.getElementById("bgMusic").play();
  }