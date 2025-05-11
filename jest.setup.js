// Mock DOM elements and functions
document.body.innerHTML = `
  <div id="game-container">
    <div id="children-container"></div>
    <div id="message-display"></div>
    <div id="heart-count">0</div>
  </div>
`;

// Mock window.requestAnimationFrame
window.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Mock Math.random for consistent testing
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath; 