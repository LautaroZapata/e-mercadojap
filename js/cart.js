document.addEventListener('DOMContentLoaded',()=>{
    let idUser = 25801;

    getJSONData(CART_INFO_URL + idUser + EXT_TYPE)
        .then(function(resultObj){
            if (resultObj.status === "ok"){
                cart = resultObj.data;
                carrito(cart);
            }
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
    addCart();
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
    totalProductCart.innerHTML = `<b>${cart.articles[0].currency} ${cart.articles[0].unitCost}</b>`
        cant ();
    }

    function cant () {
        let inputCantCart = document.getElementById('inputCantCart');
        inputCantCart.addEventListener('change',()=>{
        multiplicar()
        })
    }
    function multiplicar() {
        let unitCost = document.getElementById('unitCost').textContent;
        let inputCantCart = document.getElementById('inputCantCart');
        let totalProductCart = document.getElementById('totalProductCart');
        let currency = document.getElementById('currency').textContent;
        totalProductCart.innerHTML = `<b>${currency} ${parseInt(unitCost) * parseInt(inputCantCart.value)}</b>`; 
        
        
    }
