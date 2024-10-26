let body = document.querySelector('body');
let audio = document.querySelector('#audio');
let counterDisplay = document.getElementById('counter');
let startBtn = document.getElementById('startBtn');
let counter = 1000; // Set initial counter to 1,000
let interval; // For counting up
let countdownInterval; // For the countdown
let countdownTime = 21600; // 6 hours in seconds (21600 seconds)

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${h}h ${m < 10 ? '0' + m : m}m ${s < 10 ? '0' + s : s}s`;
}

function startCountdown() {
    body.classList.add('on'); // Turn on the light
    audio.play();
    startBtn.disabled = true; // Disable the button while counting down

    countdownInterval = setInterval(() => {
        countdownTime--;
        startBtn.innerText = formatTime(countdownTime); // Update button text with formatted time

        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            startBtn.innerText = '0h 00m 00s'; // Final display when countdown ends
            body.classList.remove('on'); // Turn off the light when countdown ends
            startBtn.disabled = false; // Enable the button again
            clearInterval(interval); // Stop the counter incrementing
        }
    }, 1000);
}

startBtn.onclick = function() {
    if (!body.classList.contains('on')) {
        // Start the countdown
        countdownTime = 21600; // Reset to 6 hours
        startBtn.innerText = formatTime(countdownTime); // Reset button text
        startCountdown();
        
        // Start the counter at the top
        interval = setInterval(() => {
            counter++;
            counterDisplay.innerText = counter; // Update display with the new counter value
        }, 1000);
    }
}
