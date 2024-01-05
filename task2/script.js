let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        changeBackgroundColor('#7FFF7F'); // Light green when started
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        isRunning = false;
        changeBackgroundColor('#FF6347'); // Light coral when paused
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    isRunning = false;
    startTime = Date.now(); // Set startTime to the current time
    updateDisplay();
    lapTimes = [];
    updateLapTimes();
    changeBackgroundColor('#82C4F8');
}

function recordLapTime() {
    if (isRunning) {
        const lapTime = elapsedTime;
        lapTimes.unshift(lapTime);
        updateLapTimes();
        changeBackgroundColor('#FFEC8B'); // Light goldenrod for a brief moment on lap
        setTimeout(() => {
            if (isRunning) {
                changeBackgroundColor('#7FFF7F'); // Change back to green if still running
            }
        }, 200);
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").innerText = formattedTime;
}

function updateLapTimes() {
    const lapTimesList = document.getElementById("lapTimes");
    lapTimesList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapTimesList.appendChild(listItem);
    });
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(centiseconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    document.getElementById('watch').style.backgroundColor = color;
}
