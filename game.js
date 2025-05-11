// Game data
const children = [
    
    {
        name: "Sammy",
        message: "Mom I love you! 🌟",
        image: "assets/child1.svg",
        color: "#87CEEB"
    },
    {
        name: "Billy",
        message: "You are the best mom ever 💖",
        image: "assets/child2.svg",
        color: "#FFB6C1"
    }
];

// ------------------------------
// Game state
// ------------------------------
let collectedHearts = 0;
const totalHearts    = children.length;
const visited        = new Set();
let isAnimating      = false;

// ------------------------------
// DOM references
// ------------------------------
const $children = document.querySelector('.children-container');
const $message  = document.getElementById('message');
const $counter  = document.getElementById('heart-count');

if (!$children) console.error('Missing .children-container in the DOM');

// ------------------------------
// Audio helper
// ------------------------------
function safeAudio(src) {
  try {
    const a = new Audio(src);
    a.addEventListener('error', () => console.warn('Audio missing:', src));
    return a;
  } catch { return { play() {} }; }
}
const sound = {
  click:   safeAudio('assets/click.mp3'),
  collect: safeAudio('assets/collect.mp3'),
  win:     safeAudio('assets/complete.mp3')
};

// ------------------------------
// Utility – create transient nodes
// ------------------------------
function spawn(tag, className, styles, life = 1500) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.assign(el.style, styles);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), life);
  return el;
}

// ------------------------------
// Particle & heart effects
// ------------------------------
function particles(x, y, color) {
  for (let i = 0; i < 10; i++) {
    spawn('div', 'particle', {
      backgroundColor: color,
      left: `${x}px`,
      top:  `${y}px`,
      transform: `rotate(${Math.random()*360}deg)`,
      animationDuration: `${Math.random() + 0.5}s`
    });
  }
}
function floatingHearts(x, y, color) {
  const emojis = ['💖','💝','💕','💗','💓'];
  const sizes  = [20, 24, 28, 32];
  for (let i = 0; i < 8; i++) {
    spawn('div', 'heart', {
      left: `${x + (Math.random() - 0.5) * 100}px`,
      top:  `${y}px`,
      color,
      fontSize: `${sizes[Math.floor(Math.random()*sizes.length)]}px`,
      animationDelay: `${i * 0.15}s`,
      transform: `rotate(${Math.random()*360}deg)`
    }).textContent = emojis[Math.floor(Math.random()*emojis.length)];
  }
}

// ------------------------------
// Main click / tap handler
// ------------------------------
function handleSelect(child, idx, evt) {
  if (isAnimating) return;
  isAnimating = true;

  // geometry for fx
  const rect = evt.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;

  sound.click.currentTime = 0;
  sound.click.play();
  particles(x, y, child.color);

  if (!visited.has(idx)) {
    visited.add(idx);
    collectedHearts++;
    $counter.textContent = collectedHearts;

    evt.currentTarget.classList.add('visited');
    floatingHearts(x, y, child.color);

    sound.collect.currentTime = 0;
    sound.collect.play();
  }

  // --- Update & reveal message ---
  $message.style.opacity = 0;
  $message.style.transform = 'translateY(20px)';
  setTimeout(() => {
    $message.textContent = child.message;
    $message.style.opacity = 1;
    $message.style.transform = 'translateY(0)';

    // 🚀 Ensure the message is in view on mobile/tablet
    $message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 250);

  if (collectedHearts === totalHearts) setTimeout(win, 900);
  setTimeout(() => (isAnimating = false), 450);
}

// ------------------------------
// Build the child grid
// ------------------------------
function buildGrid() {
  $children.innerHTML = '';
  children.forEach((child, i) => {
    const box = document.createElement('div');
    box.className = 'child';
    box.innerHTML  = `<img src="${child.image}" alt="${child.name}" onerror="this.src='assets/default-child.svg'">
                      <h3>${child.name}</h3>`;

    // Pointer events – light & universal (mouse, touch, pen)
    box.addEventListener('pointerdown', e => e.pointerDownY = e.clientY);
    box.addEventListener('pointerup',   e => {
      const move = Math.abs(e.clientY - (e.pointerDownY || e.clientY));
      if (move < 10) handleSelect(child, i, e);
    });

    $children.appendChild(box);
    void box.offsetWidth; // trigger reflow for transition
    box.classList.add('appear');
  });
}

// ------------------------------
// Win state
// ------------------------------
function win() {
  sound.win.play();
  let idx = 0;
  const msgs = [
    "Happy Mother's Day! 💖",
    "You've collected all the love from your children!",
    "You're the best mom in the world! 🌟",
    "Your children adore you! 💝",
    "You make the world a better place! 🌈"
  ];
  win.timer = setInterval(() => {
    $message.innerHTML = `<div class="completion-message"><h2>${msgs[idx]}</h2><p>${msgs[(idx+1)%msgs.length]}</p></div>`;
    idx = (idx + 1) % msgs.length;
  }, 5000);
  celebration();
}
function celebration() {
  const colors = ['#FF69B4','#87CEEB','#DDA0DD','#98FB98'];
  const emojis = ['💖','💝','💕','💗','💓'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      spawn('div','heart',{
        left: `${Math.random()*innerWidth}px`,
        top:  `${Math.random()*innerHeight}px`,
        color: colors[Math.floor(Math.random()*colors.length)],
        fontSize: `${Math.random()*20 + 20}px`,
        transform:`rotate(${Math.random()*360}deg)`
      }, 2000).textContent = emojis[Math.floor(Math.random()*emojis.length)];
    }, i * 80);
  }
}

// ------------------------------
// Background floating hearts (decorative)
// ------------------------------
function bgHearts() {
  const emojis = ['💖','💝','💕','💗','💓'];
  const colors = ['#FFB6C1','#87CEEB','#DDA0DD','#98FB98'];
  for (let i = 0; i < 12; i++) {
    spawn('div','floating-heart',{
      left:`${Math.random()*100}vw`,
      top:`${Math.random()*100}vh`,
      color: colors[Math.floor(Math.random()*colors.length)],
      fontSize:'20px',
      animationDuration:`${Math.random()*10 + 10}s`,
      animationDelay:`${Math.random()*5}s`
    }).textContent = emojis[Math.floor(Math.random()*emojis.length)];
  }
}

// ------------------------------
// Styles injected for scrolling fix & a11y
// ------------------------------
const style = document.createElement('style');
style.textContent = `
  /* Let vertical swipes scroll; taps still register */
  .child, .children-container { touch-action: pan-y; }
  /* Prevent decorative nodes from capturing screen reader focus */
  .heart, .particle, .sparkle, .floating-heart { aria-hidden: true; }
`;
document.head.appendChild(style);

// ------------------------------
// Boot
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  bgHearts();
  document.documentElement.style.overflowY = 'auto';
  document.body.style.overflowY        = 'auto';
});
