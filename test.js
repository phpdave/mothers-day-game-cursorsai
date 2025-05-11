// Test suite for Mother's Day Love Game
describe('Mother\'s Day Love Game', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="game-container">
                <div class="children-container"></div>
                <div class="message-display">
                    <p id="message"></p>
                </div>
                <div class="hearts-collected">
                    <span id="heart-count">0</span>
                </div>
            </div>
        `;
        
        // Reset game state
        collectedHearts = 0;
        visitedChildren = new Set();
        isAnimating = false;
        
        // Initialize game
        createChildren();
    });

    test('should initialize with correct number of children', () => {
        const childElements = document.querySelectorAll('.child');
        expect(childElements.length).toBe(children.length);
    });

    test('should show message when child is clicked', () => {
        const firstChild = document.querySelector('.child');
        const messageDisplay = document.getElementById('message');
        
        firstChild.click();
        
        expect(messageDisplay.textContent).toBe(children[0].message);
    });

    test('should increment heart count when new child is clicked', () => {
        const firstChild = document.querySelector('.child');
        const heartCount = document.getElementById('heart-count');
        
        firstChild.click();
        
        expect(heartCount.textContent).toBe('1');
    });

    test('should not increment heart count when same child is clicked twice', () => {
        const firstChild = document.querySelector('.child');
        const heartCount = document.getElementById('heart-count');
        
        firstChild.click();
        firstChild.click();
        
        expect(heartCount.textContent).toBe('1');
    });

    test('should show completion message when all hearts are collected', () => {
        const childElements = document.querySelectorAll('.child');
        const messageDisplay = document.getElementById('message');
        
        childElements.forEach(child => child.click());
        
        expect(messageDisplay.innerHTML).toContain('Happy Mother\'s Day!');
    });
}); 