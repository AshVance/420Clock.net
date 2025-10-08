window.toggleNavPanel = function toggleNavPanel() {
    const navPanel = document.getElementById('navpanel-container');
    const navButton = document.getElementById('navpanel-button');
    if (navPanel.style.display === 'block') {
        navPanel.style.display = 'none';
        navButton.style.display = 'block';
    } else {
        navPanel.style.display = 'block';
        navButton.style.display = 'none';
    }
}