// UI elements
const clock = document.getElementById('clock');
const audioPrompt = document.getElementById('audioPrompt');
const debugCheckbox = document.getElementById('debug420');           // Force 420 mode
const debugFridayCheckbox = document.getElementById('debugFriday');  // Force Friday
const debug422Checkbox = document.getElementById('debug422');

// Audio elements
// Silent audio added to fix bug where UnlockAudioOnce() stops the music if 420 mode is already active.
const silentAudio = document.getElementById('silentButDeadly');
const audio420 = document.getElementById('audio420');
const audio420friday = document.getElementById('audio420friday');

// 420 mode variables
let flashing = false;
let flashInterval = null;
let leafInterval = null;
const leafImage = 'img/weedleaf.png';

// Debug variables
let debugForce420Mode = false;
let debugForceTodayToBeFriday = false;
let debugForce422FlagTrue = false;

// Add event listeners to unlock audio on user interaction
document.addEventListener("mouseenter", unlockAudioOnce, { once: true });
document.addEventListener("click", unlockAudioOnce, { once: true });

// Initialize time variables
let now;
let hours;
let minutes;
let seconds;
let isFriday;
let is422;
let isPM;
let in420Window;

// Clock display variables
let displayHours;
let timeStr = null;

function unlockAudioOnce() {
    silentAudio.play().then(() => {
        silentAudio.pause();
        silentAudio.currentTime = 0;
        console.log("Attempting to unlock audio silently.");
        audioPrompt.style.display = 'none';
    }).catch((err) => {
        console.warn("Audio Still Blocked:", err);
    });
}

function spawnLeaf() {
    const leaf = document.createElement('img');
    leaf.src = leafImage;
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = (Math.random() * 3 + 3) + 's';
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}

function enter420Mode(isFriday) {
    if (!flashing) {
        flashing = true;
        if (isFriday) {
            audio420friday.play().catch(() => { });
        } else {
            audio420.play().catch(() => { });
        }
        flashInterval = setInterval(() => {
            document.body.style.backgroundColor =
                document.body.style.backgroundColor === 'black' ? '#00ff00' : 'black';
            clock.style.color = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
        }, 500);
        leafInterval = setInterval(spawnLeaf, 300);
    }
    is422 = ((hours === 4 && minutes === 22) || debugForce422FlagTrue);
    if (is422) {
        clock.textContent = 'HAPPY 4:22!!!';
    }
    else if (!is422) {
        clock.textContent = 'HAPPY 4:20!!!';
    }
}

function exit420Mode(isFriday) {
    if (flashing) {
        flashing = false;
        if (isFriday) {
            audio420friday.pause();
            audio420friday.currentTime = 0;
        } else {
            audio420.pause();
            audio420.currentTime = 0;
        }
        clearInterval(flashInterval);
        clearInterval(leafInterval);
        document.body.style.backgroundColor = 'black';
        clock.style.color = 'white';
    }
}

function updateClock() {
    now = new Date();
    debugForceTodayToBeFriday = debugFridayCheckbox?.checked || false;
    debugForce422FlagTrue = debug422Checkbox?.checked || false;
    debugForce420Mode = debugCheckbox?.checked || false;

    // real functions
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    // temp debug test for 4:22 debugging (making SURE it works this time)
    //hours = 4;
    //minutes = 22;
    //seconds = now.getSeconds();

    // GITHUB DEMONSTRATION FOR PUPPY!!!!

    isFriday = (now.getDay() === 5) || debugForceTodayToBeFriday;
    is422 = (hours === 4 && minutes === 22 && seconds < 60) || debugForce422FlagTrue;
    isPM = hours >= 12;
    in420Window =
        ((hours === 4 || hours === 16) &&
            ((minutes === 20 && seconds < 60) ||
                (minutes === 22 && seconds < 60)));


    if (debugForce420Mode || in420Window) {
        enter420Mode(isFriday);
    } else {
        exit420Mode(isFriday);
        displayHours = hours % 12 || 12;
        timeStr = `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
        clock.textContent = timeStr;
    }
}
setInterval(updateClock, 1000);
updateClock();