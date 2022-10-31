document.addEventListener('DOMContentLoaded',()=>{
    let idUser = 25801;

    getJSONData(CART_INFO_URL + idUser + EXT_TYPE)
        .then(function(resultObj){
            if (resultObj.status === "ok"){
                cart = resultObj.data;
                carrito(cart);
            }
    })

    let btn = document.getElementById('finalizarcompra');
    btn.addEventListener('click',(e)=>{
        validar()
        console.log('hola')
    })

    
    // Leer localstorage
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
    
})

function carrito (cart) {
    
    let imgProduct = document.getElementById('imgProduct');
    let img = document.createElement('img');
    img.setAttribute('src',cart.articles[0].image);
    img.setAttribute('height','80px')
    imgProduct.appendChild(img);

    let nameProductCart = document.getElementById('nameProductCart');
    nameProductCart.innerHTML = cart.articles[0].name;

    let currency = document.getElementById('currency');
    let unitCost = document.getElementById('unitCost');
    currency.innerHTML = cart.articles[0].currency;
    unitCost.innerHTML = cart.articles[0].unitCost;

    let inputCantCart = document.getElementById('inputCantCart');
    inputCantCart.value = parseInt(cart.articles[0].count);
    let totalProductCart = document.getElementById('totalProductCart');
    totalProductCart.innerHTML = `<b id="price">${cart.articles[0].currency} ${cart.articles[0].unitCost}</b>`
        cant ();
        costos()
        
    }

function cant () {
    let inputCantCart = document.getElementById('inputCantCart');

    inputCantCart.addEventListener('change',()=>{
    multiplicar()
    costos()
    checkear()


    })
}
function multiplicar() {
    let unitCost = document.getElementById('unitCost').textContent;
    let inputCantCart = document.getElementById('inputCantCart');
    let totalProductCart = document.getElementById('totalProductCart');
    let currency = document.getElementById('currency').textContent;
    totalProductCart.innerHTML = `<b id="price">${currency} ${parseInt(unitCost) * parseInt(inputCantCart.value)}</b>`; 

}


function costos() {
    let subtotal = document.getElementById('subtotal');
    price = document.getElementById('price');
    subtotal.innerHTML = `USD ${parseInt(price.textContent.slice(4))}`;
    
}

function checkear () {
    let total = document.getElementById('totalcompra');
    let costo = document.getElementById('costoEnvio');
    let subtotal = document.getElementById('subtotal').textContent;
    let parseSub = parseInt(subtotal.slice(4))
    
    let premium = document.getElementById('premium');
    let premiumCost = parseSub * 0.15;

    let express = document.getElementById('express');
    let expressCost = parseSub * 0.07;

    let standar = document.getElementById('standar');
    let standarCost = parseSub * 0.05;


    if(premium.checked == true) {
        costo.innerHTML = premiumCost;
    }else if (express.checked == true) {
        costo.innerHTML = expressCost;
    }else if (standar.checked == true) {
        costo.innerHTML = standarCost;
    }
    parseCost = parseInt(costo.textContent)

    total.innerHTML = parseCost + parseSub;
}



function validar () {
    let premium = document.getElementById('premium');
    let express = document.getElementById('express');
    let standar = document.getElementById('standar');

    let calle = document.getElementById('calle');
    let esquina = document.getElementById('esquina');
    let numero = document.getElementById('numero')

    if (premium.checked || express.checked || standar.checked ) {
        premium.classList.remove('is-invalid');
        premium.classList.remove('link-danger');
    } else {
        premium.classList.add('is-invalid');
        premium.classList.add('link-danger');
    };

    if (calle.value === "") {
        calle.classList.add('is-invalid');
    }else {
        calle.classList.remove('is-invalid');
    }

    if(esquina.value === "") {
        esquina.classList.add('is-invalid');
    }else{
        esquina.classList.remove('is-invalid');
    }

    if(numero.value === "") {
        numero.classList.add('is-invalid');
    }else{
        numero.classList.remove('is-invalid');
    }
}


