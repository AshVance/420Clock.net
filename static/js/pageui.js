global_isDebugMode = false;

let navPanel, navButton, debugPanel, debugModeButton, debugClockPanelToggle = null;

window.initMenu = function initMenu()
{
    console.log('initMenu() called');
    navPanel = document.getElementById('navpanel-container');
    navButton = document.getElementById('navpanel-button');
    debugPanel = document.getElementById('debug-container');
    debugModeButton = document.getElementById('np-link-debugmodetoggle');
    debugClockPanelToggle = document.getElementById('np-link-debugclockpaneltoggle');
    if (global_isDebugMode === true)
    {
        debugClockPanelToggle.style.display = 'block';
        console.log('Debug mode is ON');
    }
    else
    {
        debugClockPanelToggle.style.display = 'none';
        debugPanel.style.display = 'none';
        console.log('Debug mode is OFF');
    }
}
window.toggleDebugMode = function toggleDebugMode()
{
    global_isDebugMode = !global_isDebugMode;
    initMenu();
}

window.setNavPanelEnabled = function setNavPanelEnabled() {
    if (navPanel.style.display === 'none') {
        navPanel.style.display = 'block';
        navButton.style.display = 'none';
    }
}
window.setNavPanelDisabled = function setNavPanelDisabled() {
    if (navPanel.style.display === 'block')
    {
        debugClockPanelToggle.style.display = 'none';
        navPanel.style.display = 'none';
        navButton.style.display = 'block';
    }
}

window.toggleNavPanel = function toggleNavPanel() {
    initMenu();
    if (navPanel.style.display === 'block') {
        navPanel.style.display = 'none';
        navButton.style.display = 'block';
    } else {
        navPanel.style.display = 'block';
        navButton.style.display = 'none';
    }
}
window.toggleDebugPanel = function toggleDebugPanel() {
    if (debugPanel.style.display === 'block') {
        debugPanel.style.display = 'none';
    } else {
        debugPanel.style.display = 'block';
    }
}
document.addEventListener('DOMContentLoaded', initMenu);
