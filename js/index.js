
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

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
    })
});