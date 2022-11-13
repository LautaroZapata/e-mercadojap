let usuario = localStorage.getItem('user');

if (usuario == null) {
    this.location.href = "login.html";
    alert("No iniciaste sesión");
}else{
    document.getElementById('usuario').innerHTML = 'Bienvenid@! ' + '<b>' + usuario + '</b>';
}
    
// Cerrar sesion
    
document.getElementById('btnExit').addEventListener('click', ()=> {
    alert('Cerraste la sesión');
    localStorage.clear();
    this.location.href = "login.html"
});

let email = document.getElementById('email');
let btnGuardarCambios = document.getElementById('btnGuardarCambios');

let primerNombre = document.getElementById('primerNombre'); 

let primerApellido = document.getElementById('primerApellido');

let telefono = document.getElementById('telefono');


document.addEventListener('DOMContentLoaded',()=> {
    email.value = localStorage.getItem('user');

    btnGuardarCambios.addEventListener('click',()=>{
        if (primerNombre.value && primerApellido.value && email.value !== "") {
            localStorage.setItem('user',email.value);
            localStorage.setItem('nombre',primerNombre.value);
            localStorage.setItem('apellido',primerApellido.value);
        }else{
            showAlertError()
        }
    });

    primerNombre.value = localStorage.getItem('nombre');
    primerApellido.value = localStorage.getItem('apellido')
})


function showAlertError() {
    document.getElementById("alert-error").classList.add("show");
} 