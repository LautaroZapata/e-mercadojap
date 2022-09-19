

let productsArray = [];

function setIdProd(prod) {
    localStorage.setItem("prodID",prod);
    window.location = "product-info.html"
}

function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div onclick="setIdProd(${products.id})" class="list-group-item list-group-item-action">
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

function filter(array){
    let min = parseInt(document.getElementById('minCost').value);
    let max = parseInt(document.getElementById('maxCost').value);
    let filterMinMax = array.filter(producto => producto.cost >= min && producto.cost <= max);
    showProductsList(filterMinMax)
}


let minPrice = undefined;
let maxPrice = undefined;
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_SELLS = "";
let currentProductsArray = [];
let currentSortCriteria = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort((a, b)=> {
            return a.cost - b.cost;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE)
    {
        result = array.sort((a,b)=> {
            return b.cost - a.cost;
        });
    }else if (criteria === ORDER_BY_PROD_SELLS)
    {
        result = array.sort((a,b)=> {
            return b.soldCount - a.soldCount;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList(currentProductsArray);
}


document.addEventListener("DOMContentLoaded", function(e){
    let getId = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + getId + EXT_TYPE)
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
            let catN = resultObj.data.catName;
            function mostrarCategoria(){
                document.getElementById("prodcat").innerHTML += "Verás aquí todos los productos de la categoría " + catN;
            };
            mostrarCategoria();
        }
        document.getElementById('filterBtn').addEventListener('click', () => {
            filter(productsArray)
        })

        document.getElementById('clearFilterBtn').addEventListener('click', () => {
            let min = document.getElementById('minCost');
            let max = document.getElementById('maxCost');
            min.value = "";
            max.value = "";
            showProductsList(productsArray)
        })

        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_SELLS);
        });
        
    });

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
});
