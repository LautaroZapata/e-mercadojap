let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let products = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name +' - ' + products.currency + ' ' + products.cost+ `</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("items-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    let getId = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + getId + EXT_TYPE)
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
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
