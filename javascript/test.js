function creerElement(IdContenant, tag, classe, classe2) {
    const contenant = document.getElementsByClassName(IdContenant);
    const newTag = document.createElement(tag);
    let lastElem = contenant.length - 1;
    contenant[lastElem].appendChild(newTag);
    newTag.classList.add(classe, classe2);
}
function creerStructureArticle() {
    creerElement('liste-articles', 'div', 'article', 'row');
    creerElement('article', 'div', 'col-3', 'article_description');
    creerElement('article_description', 'h2', 'article_titre');
    creerElement('article_description', 'p', 'article_style');
    creerElement('article', 'div', 'col-1', 'article_image');
    creerElement('article_image', 'img', 'image_ourson');
    creerElement('article', 'div', 'col-2', 'article_choix');
    creerElement('article_choix', 'p', 'article_quantite');
    creerElement('article_choix', 'p', 'article_prix');
}
function remplirStructureArticle(objetAPI, infoPanier) {
    let titre = objetAPI.name;
    let image = objetAPI.imageUrl;
    let prix = objetAPI.price;
    let style = infoPanier[0].color;
    let nombre = infoPanier[0].quantity;
    const contenantTitre = document.getElementsByClassName('article_titre');
    contenantTitre[0].textContent = titre;
    const contenantStyle = document.getElementsByClassName('article_style');
    contenantStyle[0].textContent = style;
    const contenantImage = document.getElementsByClassName('image_ourson');
    contenantImage[0].setAttribute('src', image);
    const contenantQuantite = document.getElementsByClassName('article_quantite');
    contenantQuantite[0].textContent = 'Quantité: ' + nombre;
    const contenantPrix = document.getElementsByClassName('article_prix');
    contenantPrix[0].textContent = 'Prix: ' + prix + '€';
}
//on veut remplir la structure d'article que nous avons créé
//titre, style, nombre et prix sachant que 
//      on a dans localstorage : id = {style et nombre}
//      on a dans l'API : id = {nom, image et prix}
//on sépare les 2 recherches d'info
//
//  1)récupérer les id du localStorage
let arrayIdPanier =['5be9c8541c9d440000665243'];
function recuperationIdLocalStorage(){
    for (let i=0; i < window.localStorage.length; i++) {
        arrayIdPanier.push(window.localStorage.key(i));
    }
}

async function collectInfoPanier(idPanier) {
    //on récupère les info du localstorage
    let infoPanier = JSON.parse(window.localStorage.getItem(idPanier));
    //on récupère les info de l'API
    await fetch('http://localhost:3000/api/teddies/'+ idPanier)
    .then((response) => response.json())
    //on créé un article avec toutes les infos
    .then((infoAPI) => remplirStructureArticle(infoAPI, infoPanier))
}


//idée générale
//on récupère l'ID d'un produit dans le localstorage
//on créé une structure globale
creerStructureArticle();
//on va chercher les éléments 1 à 1
collectInfoPanier(arrayIdPanier);

