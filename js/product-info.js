let idProd = localStorage.getItem('prodID');



document.addEventListener('DOMContentLoaded',(e)=> {
    getJSONData(PRODUCT_INFO_URL + idProd + EXT_TYPE)
        .then (function(resultObj){
        if (resultObj.status === "ok"){
            prodInfo = resultObj.data

            let prodTitle = document.getElementById('prodTitle');
            let prodCost = document.getElementById('prodCost');
            let prodDesc = document.getElementById('prodDesc');
            let prodCat = document.getElementById('prodCat');
            let prodCant = document.getElementById('prodCant');

            prodTitle.innerHTML = prodInfo.name;
            prodCost.innerHTML = prodInfo.currency + " " + prodInfo.cost;
            prodDesc.innerHTML = prodInfo.description;
            prodCant.innerHTML = prodInfo.soldCount;
            prodCat.innerHTML = prodInfo.category;

            imagesGallery (prodInfo.images);
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL + idProd + EXT_TYPE)
        .then (function(resultObj){
            if (resultObj.status === 'ok'){
                comment = resultObj.data;
                let contentHTML = '';
                if (comment.length > 0) {
                    comment.forEach(function(comment){
                        let prodStars = comment.score;
                        let star = '';
                        for (let i = 1; i <= prodStars; i++) {
                            star += '<i class="fas fa-star checked"></i>'
                        }

                        for (let i = prodStars + 1; i <= 5; i++) {
                            star += '<i class="far fa-star"></i>'
                        }

                        contentHTML += `
                            <li class="media border list-group-item">
                                <div class="media-body">
                                    <p><b>${comment.user}</b> - ${comment.dateTime} - ${star}</p>
                                    <p>${comment.description}</p>
                                </div>
                            </li>
                        `
                    })
                }
                document.getElementById('comments').innerHTML += contentHTML;
            }
        })
    
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

        document.getElementById('sendComment').addEventListener('click',()=>{
            commentText()
        });
        
        
});



function imagesGallery (arrayImg) {
    for(let i = 0; i < arrayImg.length; i++ ){
        let prodImgDiv = document.getElementById('prodImg');
        let prodInfo = arrayImg[i];
        prodImgDiv.innerHTML += `<img src="${prodInfo}" height="150px" class="mx-3">`
    }
}


const time = new Date();

let timeToday =`${time.getFullYear()} - ${time.getMonth()} - ${time.getDate()} - ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

let starsCant = document.getElementById('starsCant')

function setScore(){
    let stars = "";
    for (let i = 1; i <= 5; i++){
        if (i <= starsCant.value){
            stars += '<i class="fas fa-star checked"></i>';
        }else{
            stars += '<i class="far fa-star "></i>'
        }
    }
    return stars
};


function commentText() {
    let user = {}
    user.name = localStorage.getItem('user');
    user.comment = document.getElementById('comment').value;
    let li = `
        <li class="media border list-group-item">
            <div class="media-body">
                <p><b>${user.name}</b> - ${timeToday} - ${setScore()} </p>
                <p>${user.comment}</p>
            </div>
        </li>
    `
    document.getElementById('comments').innerHTML += li;
}




