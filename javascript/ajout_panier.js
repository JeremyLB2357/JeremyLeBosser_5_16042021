// on veut récupérer l'ID du produit
function recuperationId(){
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('id');
    if (idProduit == null) {
        alert("l'article sélectionné est impossible à trouver");
    } else {
        return idProduit;
    }
}

class objectColorQuantity {
    constructor(color, quantity){
        this.color = color;
        this.quantity = quantity;
    }
}

function verificationQuantity(input) {
    //regex vérifie les nombres de 1 à 100
    const regexQuantity = new RegExp(/^[1-9]?[0-9]{1}$|^100$/);
    if (regexQuantity.test(input)) {
        return(true);
    } else {
        return(false);
    }
}
// on veut récupérer la couleur choisie et la quantité
function createObjectColorQuantity(){
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const color = document.getElementById('style').value;
    const object = new objectColorQuantity(color, quantity);
    return object;
}

// on veut ajouter les éléments au panier (=localstorage)
    //le produit est-il déjà dans le panier ?
function isInCart(idProduit){
    for (let i=0; i < window.localStorage.length; i++){
        if (idProduit === window.localStorage.key(i)){
            return true;
        }
    }
    return false;
}
    //l'ID est dans le panier, la couleur a-t'elle déjà été choisie ?
function isColorAlreadyChosen(color, idProduit){
    //on récupère les élements du panier correspondant à l'ID choisie
    let declinaisonOurson = JSON.parse(window.localStorage.getItem(idProduit));
    for (let elem of declinaisonOurson){
        if (elem.color === color){
            return true;
        }
    }
    return false;
}
//on ajoute la sélection au panier
function addToCart(idProduit){
    if (isInCart(idProduit)){
        let colorSelected = document.getElementById('style').value;
        let arrayQuantityAndColor = JSON.parse(window.localStorage.getItem(idProduit));
        if (isColorAlreadyChosen(colorSelected, idProduit)){
            for (let elem of arrayQuantityAndColor){
                if (elem.color === colorSelected){
                    elem.quantity = parseInt(elem.quantity) + parseInt(document.getElementById('quantity').value);
                }
            }
        }else {
            arrayQuantityAndColor.push(createObjectColorQuantity());
        }
        window.localStorage.removeItem(idProduit);
        window.localStorage.setItem(idProduit, JSON.stringify(arrayQuantityAndColor));

    } else{
        let arrayQuantityAndColor = [createObjectColorQuantity()];
        window.localStorage.setItem(idProduit, JSON.stringify(arrayQuantityAndColor));
    }
}
//on créé un ensemble d'Id pour vérifier que l'ajout au panier est possible
let ensembleId = [];

function putAllIdInArray(responseAPI) {
    for (let i in responseAPI) {
        ensembleId.push(responseAPI[i]._id)
    }
}

async function fillIdProduct(){
    await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((ids) => putAllIdInArray(ids))
};

function IsRealId (idTested) {
    for (let i in ensembleId) {
        if (idTested == ensembleId[i]) {
            return true;
        }
    }
    return false;
}

fillIdProduct();

const buttonAddToCart = document.getElementById('btn-addtocart');
buttonAddToCart.addEventListener('click', function(){
    const quantityInput = document.getElementById('quantity').value;
    if (verificationQuantity(quantityInput) && IsRealId(recuperationId())) {
        addToCart(recuperationId());
        alert("L'article a bien été ajouté au panier!");
    } else {
        alert("La quantité renseignée n'est pas valide");
    }
    
})
