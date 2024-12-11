import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const promiseState = event.target.elements.state.value;
    const delay = event.target.elements.delay.value;
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (promiseState === "fulfilled") {
                resolve(delay)
            } else if (promiseState === "rejected") {
                reject(delay)  
        }
    },delay)
    })
    result
        .then((delay) => {
        iziToast.success({ title: "✅", message: `Fulfilled promise in ${delay}ms` })
        })
        .catch((delay) => {
        iziToast.error({ title: "❌", message: `Rejected promise in ${delay}ms` })
    })
}
