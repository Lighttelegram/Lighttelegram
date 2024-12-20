<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Make Your World Bright</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Loading screen styles */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: #222; /* Dark background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10; /* Ensure it's above other content */
        }
        .loading-image {
            width: 200px; /* Adjust size as needed */
            height: auto;
        }
    </style>
</head>
<body style="display: none;"> <!-- Initially hidden to show loading screen first -->
    <!-- Loading screen -->
    <div class="loading-screen" id="loadingScreen">
        <img src="ad.jpeg" alt="Loading Lightbulb" class="loading-image"> <!-- Replace with the actual path if different -->
    </div>

    <!-- Main content -->
    <div class="light">
        <div class="wire"></div>
        <div class="bulb">
            <span></span>
            <span></span>
        </div>
    </div>
    
    <div class="counter" id="counter">1000</div> <!-- Counter display -->
    <button class="btn" id="startBtn">6h 00m 00s</button> <!-- Button to start countdown -->

    <div class="menu-bar">
        <div class="menu-item">Home</div>
        <div class="menu-item">Task</div>
        <div class="menu-item">Friend</div>
        <div class="menu-item">Earn</div>
        <div class="menu-item">Wallet</div>
    </div>

    <script>
        // Show loading screen and then reveal main content
        window.onload = function() {
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen
                document.body.style.display = 'flex'; // Show main content

                // Restore counter and countdown on load
                restoreCounter();
                restoreCountdown();
            }, 2000); // Wait for 2 seconds before showing content
        };

        // Initialize variables
        let body = document.querySelector('body');
        let counterDisplay = document.getElementById('counter');
        let startBtn = document.getElementById('startBtn');
        let counter = parseInt(localStorage.getItem('counter')) || 1000; // Default starting counter
        let countdownInterval; // For countdown
        let countdownTime = parseInt(localStorage.getItem('countdownTime')) || 21600; // 6 hours in seconds (21600 seconds)

        // Format time for display
        function formatTime(seconds) {
            let h = Math.floor(seconds / 3600);
            let m = Math.floor((seconds % 3600) / 60);
            let s = seconds % 60;
            return `${h}h ${m < 10 ? '0' + m : m}m ${s < 10 ? '0' + s : s}s`;
        }

        // Start the countdown and counter increment
        function startCountdown() {
            body.classList.add('on');
            startBtn.disabled = true;
            localStorage.setItem('counter', counter); // Save counter when countdown starts

            countdownInterval = setInterval(() => {
                if (countdownTime > 0) {
                    countdownTime--;
                    startBtn.innerText = formatTime(countdownTime);
                    localStorage.setItem('countdownTime', countdownTime); // Save updated countdown time
                } else {
                    endCountdown();
                }
            }, 1000);

            // Increment counter
            setInterval(() => {
                if (countdownTime < 21600) { // Only increment if countdown is active
                    counter++;
                    counterDisplay.innerText = counter;
                    localStorage.setItem('counter', counter); // Save updated counter
                }
            }, 1000);
        }

        // Restore counter from localStorage
        function restoreCounter() {
            counterDisplay.innerText = counter;
        }

        function restoreCountdown() {
            const savedCountdownTime = localStorage.getItem('countdownTime');
            if (savedCountdownTime) {
                countdownTime = parseInt(savedCountdownTime, 10);

                if (countdownTime > 0) {
                    startBtn.innerText = formatTime(countdownTime);
                    startCountdown();
                } else {
                    endCountdown(); // If time has elapsed, reset
                }
            } else {
                startBtn.innerText = formatTime(countdownTime);
            }
        }

        // End countdown and reset state
        function endCountdown() {
            clearInterval(countdownInterval);
            startBtn.innerText = '0h 00m 00s';
            body.classList.remove('on');
            startBtn.disabled = false;
            localStorage.removeItem('countdownTime'); // Remove countdown from localStorage when done
        }

        // Button click to start countdown and counter
        startBtn.onclick = function() {
            if (!body.classList.contains('on')) {
                countdownTime = 21600; // Reset to 6 hours
                startBtn.innerText = formatTime(countdownTime);
                startCountdown();
            }
        };
    </script>
</body>
</html>
