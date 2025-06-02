const pomodoroTimer = document.querySelector('.pomodoro-timer');
const mainStartBtn = document.querySelector('#main-start-pomodoro');
const startBtn = document.querySelector('#start-pomodoro');
const pauseBtn = document.querySelector('#pause-pomodoro');
const resetBtn = document.querySelector('#reset-pomodoro');

let pomodoroInterval;

function startPomodoro() {
    if (pomodoroInterval) return;
    toggleButtonToPause();
    pomodoroInterval = setInterval(() => {
        updateTimer();
    }, 1000);
}

function updateTimer() {
    let [min, sec] = pomodoroTimer.textContent.split(':');

    if (min === 0 && sec === 0) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        toggleButtonToStart();
        console.log('Pomodoro finalizado');
        return;
    }

    if (sec-- === 0) {
        min--;
        sec = 59;
    }

    pomodoroTimer.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function togglePomodoro() {
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        toggleButtonToStart();
    } else {
        pomodoroInterval = setInterval(updateTimer, 1000);
        toggleButtonToPause();
    }
}

function toggleButtonToStart() {
    mainStartBtn.id = 'start-pomodoro';
    mainStartBtn.innerHTML = '<span class="material-icons">play_arrow</span> Start';
}

function toggleButtonToPause() {
    mainStartBtn.id = 'pause-pomodoro';
    mainStartBtn.innerHTML = '<span class="material-icons">pause</span> Pause';
}

function pomodoro() {

    mainStartBtn.addEventListener('click', togglePomodoro);

    startBtn?.addEventListener('click', startPomodoro);

    resetBtn.addEventListener('click', () => {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        pomodoroTimer.textContent = '25:00';
        toggleButtonToStart();
    });

}

pomodoro();