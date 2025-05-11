describe('Mother\'s Day Love Game', () => {
  beforeEach(() => {
    // Reset game state
    document.getElementById('children-container').innerHTML = '';
    document.getElementById('message-display').innerHTML = '';
    document.getElementById('heart-count').textContent = '0';
    
    // Initialize game
    createChildren();
  });

  test('initializes with correct number of children', () => {
    const children = document.querySelectorAll('.child');
    expect(children.length).toBe(4);
  });

  test('displays message when child is clicked', () => {
    const firstChild = document.querySelector('.child');
    firstChild.click();
    
    const messageDisplay = document.getElementById('message-display');
    expect(messageDisplay.textContent).toBeTruthy();
  });

  test('increments heart count when new child is clicked', () => {
    const firstChild = document.querySelector('.child');
    firstChild.click();
    
    const heartCount = document.getElementById('heart-count');
    expect(heartCount.textContent).toBe('1');
  });

  test('does not increment heart count when same child is clicked twice', () => {
    const firstChild = document.querySelector('.child');
    firstChild.click();
    firstChild.click();
    
    const heartCount = document.getElementById('heart-count');
    expect(heartCount.textContent).toBe('1');
  });

  test('shows completion message when all hearts are collected', () => {
    const children = document.querySelectorAll('.child');
    children.forEach(child => child.click());
    
    const messageDisplay = document.getElementById('message-display');
    expect(messageDisplay.textContent).toContain('Congratulations');
  });
}); 