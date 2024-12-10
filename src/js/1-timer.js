import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("button[data-start]")
const daysValue = document.querySelector("[data-days]")
const hoursValue = document.querySelector("[data-hours]")
const minutesValue = document.querySelector("[data-minutes]")
const secondsValue = document.querySelector("[data-seconds]")
startBtn.addEventListener("click", handleStart)
let timerId = null;
let userSelectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
          iziToast.error({ title: "Error", message: "Please choose a date in the future" });
          startBtn.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          startBtn.disabled = false;
      }
  },
};

flatpickr(datetimePicker, options);

function handleStart() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;
    timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        const convertTime = convertMs(deltaTime);
        

        if (deltaTime <= 0) {
            clearInterval(timerId);
            datetimePicker.disabled = false;
            iziToast.success({ title: "Success", message: "Time is up!" })
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            userSelectedDate = null;
        return;
        }
        
        updateTimerDisplay(convertTime);
    }, 1000)
    
    
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2,"0")
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}

