let emailInput = document.getElementById('floatingInput');
let passInput = document.getElementById('floatingPassword');
let signIn = document.getElementById('signIn');
let divEmail = document.getElementById('divEmail');
let divPass = document.getElementById('divPass');


document.addEventListener('DOMContentLoaded', () => {
    signIn.addEventListener('click', () => {
        if (emailInput.value && passInput.value !== "") {
            window.location.href = "index.html"
        } else {
            divEmail.classList.add("border");
            divEmail.classList.add("border-danger");
            divPass.classList.add("border");
            divPass.classList.add("border-danger");
            alert('Ingresa tu usuario nuevamente.')
            emailInput.value = "";
            passInput.value = "";
            
        }
    })
})

