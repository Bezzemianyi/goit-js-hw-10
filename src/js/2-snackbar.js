import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const promiseState = event.target.elements.state.value;
    const delay = event.target.elements.delay.value;
    const result = new Promice((resolve, reject) => {
        setTimeout(() => {
            if (promiseState = resolve) {
            iziToast.success({ title: "✅", message: `Fulfilled promise in ${delay}ms` })
            } else if (promiseState = reject) {
            iziToast.success({ title: "❌", message: `Rejected promise in ${delay}ms` })
        }
    },delay)
    })
    
}
