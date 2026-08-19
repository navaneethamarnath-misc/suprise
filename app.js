const memories = [
  {
    eyebrow: "For the girl with the kindest eyes",
    title: "You make warmth look easy.",
    message: "You have a way of making even the quietest moments feel special.",
    caption: "just you",
    image: "assets/animated/animated-72698.png"
  },
  {
    eyebrow: "Still a little kid at heart",
    title: "Never lose that spark.",
    message: "Your silly little expressions and big soft heart are some of my favourite things about you.",
    caption: "the playful you",
    image: "assets/animated/animated-72650.png"
  },
  {
    eyebrow: "Small adventures, loud playlists",
    title: "Every ride needs an Anirudh banger.",
    message: "May life keep giving you reasons to sing along, laugh too hard, and enjoy the ride.",
    caption: "on the way",
    image: "assets/animated/animated-72702.png"
  },
  {
    eyebrow: "A Demon Slayer kind of heart",
    title: "Soft, brave, unstoppable.",
    message: "Keep chasing what you love with the same fire you bring to every story you care and mindlessly speak about.",
    caption: "main-character energy",
    image: "assets/animated/animated-72703.png"
  },
  {
    eyebrow: "A little pause in the chaos",
    title: "You deserve soft days too.",
    message: "I hope this year gives you more peaceful corners, more good chai, and more reasons to smile like this.",
    caption: "your calm",
    image: "assets/animated/animated-72704.png"
  },
  {
    eyebrow: "My favourite kind of company",
    title: "Us, out in the world.",
    message: "To cherishing yours and my special moments together, and to many more to come.",
    caption: "sunny days",
    image: "assets/animated/animated-72705.png"
  },
  {
    eyebrow: "The little things",
    title: "You keep life fun.",
    message: "From long nights to tiny jokes, you make the ordinary feel worth remembering.",
    caption: "our kind of fun",
    image: "assets/animated/animated-72699.png"
  },
  {
    eyebrow: "One more for the memories",
    title: "Here is to every next adventure.",
    message: "More dates, more stories, and more photos that make us laugh when we look back.",
    caption: "always us",
    image: "assets/animated/animated-72701.png"
  },
  {
    eyebrow: "The wish behind every wish",
    title: "Make them proud, always.",
    message: "I know how much your family means to you. You are already becoming everything they will be proud of. Keep chasing your dreams and making them proud.",
    caption: "your biggest dreams",
    image: "assets/animated/animated-72700.png"
  },
  {
    eyebrow: "The final reveal",
    title: "Happy Birthday, love.",
    message: "Stay soft, stay fearless, keep dreaming big, and never stop being exactly you. I will always be here to cheer you on.",
    caption: "make a wish",
    image: "assets/final-reveal.png"
  }
];

let activeIndex = 0;
let isTransitioning = false;
const card = document.querySelector("#memoryCard");
const photo = document.querySelector("#photo");
const title = document.querySelector("#title");
const eyebrow = document.querySelector("#eyebrow");
const message = document.querySelector("#message");
const caption = document.querySelector("#caption");
const count = document.querySelector("#memoryCount");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progress = document.querySelector("#progress");

function createRain(selector, amount, lengthRange, durationRange) {
  const layer = document.querySelector(selector);
  for (let index = 0; index < amount; index += 1) {
    const drop = document.createElement("i");
    const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
    drop.className = "drop";
    drop.style.left = `${Math.random() * 125 - 10}%`;
    drop.style.setProperty("--length", `${lengthRange[0] + Math.random() * (lengthRange[1] - lengthRange[0])}px`);
    drop.style.setProperty("--duration", `${duration.toFixed(2)}s`);
    drop.style.setProperty("--delay", `${(-Math.random() * duration).toFixed(2)}s`);
    layer.append(drop);
  }
}

createRain(".rain-back", 85, [22, 50], [1.1, 1.8]);
createRain(".rain-front", 52, [45, 100], [.55, 1.05]);

function render(index, direction = "next", animate = true) {
  const memory = memories[index];
  const paint = () => {
    eyebrow.textContent = memory.eyebrow;
    title.textContent = memory.title;
    message.textContent = memory.message;
    caption.textContent = memory.caption;
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
    previous.disabled = index === 0;
    next.disabled = index === memories.length - 1;
    next.setAttribute("aria-label", index === memories.length - 1 ? "Final birthday message shown" : "Next memory");
    photo.innerHTML = memory.image ? `<img src="${memory.image}" alt="${memory.caption}" />` : "<span>your photo<br />goes here</span>";
    photo.classList.toggle("placeholder-photo", !memory.image);
    [...progress.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
  };
  if (!animate) { paint(); return; }
  isTransitioning = true;
  card.classList.add(`leaving-${direction}`);
  window.setTimeout(() => {
    paint();
    card.classList.remove(`leaving-${direction}`);
    card.classList.add(`entering-${direction}`);
    window.setTimeout(() => {
      card.classList.remove(`entering-${direction}`);
      isTransitioning = false;
    }, 500);
  }, 300);
}

function goTo(index) {
  if (isTransitioning || index < 0 || index >= memories.length || index === activeIndex) return;
  const direction = index > activeIndex ? "next" : "previous";
  activeIndex = index;
  render(activeIndex, direction);
}

memories.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Go to memory ${index + 1}`);
  dot.addEventListener("click", () => goTo(index));
  progress.append(dot);
});

previous.addEventListener("click", () => goTo(activeIndex - 1));
next.addEventListener("click", () => goTo(activeIndex + 1));

let startX = 0;
document.querySelector("#stage").addEventListener("pointerdown", event => { startX = event.clientX; });
document.querySelector("#stage").addEventListener("pointerup", event => {
  const delta = event.clientX - startX;
  if (Math.abs(delta) < 45) return;
  if (delta < 0) goTo(activeIndex + 1);
  if (delta > 0) goTo(activeIndex - 1);
});
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") goTo(activeIndex + 1);
  if (event.key === "ArrowLeft") goTo(activeIndex - 1);
});

render(activeIndex, "next", false);
