const memories = [
  {
    eyebrow: "A little trip through us",
    title: "Before the big wish...",
    message: "I wanted to give you a few small moments first. The kind that stay warm long after the day is over.",
    caption: "chapter one",
    image: ""
  },
  {
    eyebrow: "One bright memory",
    title: "You make ordinary days glow.",
    message: "Every shared laugh, every late conversation, every tiny adventure has become one of my favorite places to return to.",
    caption: "the good parts",
    image: ""
  },
  {
    eyebrow: "A note for today",
    title: "More magic looks good on you.",
    message: "I hope this year brings you surprising joy, soft mornings, and exactly the kind of beautiful chaos you deserve.",
    caption: "another year, brighter",
    image: ""
  },
  {
    eyebrow: "A note for today",
    title: "More magic looks good on you.",
    message: "I hope this year brings you surprising joy, soft mornings, and exactly the kind of beautiful chaos you deserve.",
    caption: "another year, brighter",
    image: ""
  },
  {
    eyebrow: "A note for today",
    title: "More magic looks good on you.",
    message: "I hope this year brings you surprising joy, soft mornings, and exactly the kind of beautiful chaos you deserve.",
    caption: "another year, brighter",
    image: ""
  },
  {
    eyebrow: "A note for today",
    title: "More magic looks good on you.",
    message: "I hope this year brings you surprising joy, soft mornings, and exactly the kind of beautiful chaos you deserve.",
    caption: "another year, brighter",
    image: ""
  },
  {
    eyebrow: "The final reveal",
    title: "Happy Birthday, superstar.",
    message: "May this next chapter be full of everything that makes you feel most alive. I am so lucky to celebrate you today.",
    caption: "make a wish",
    image: ""
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
