function creerElement(IdContenant, tag, classe, classe2, classe3) {
    const contenant = document.getElementsByClassName(IdContenant);
    const newTag = document.createElement(tag);
    let lastElem = contenant.length - 1;
    contenant[lastElem].appendChild(newTag);
    newTag.classList.add(classe, classe2, classe3);
}

function afficherPanierVide() {
    let panier = window.localStorage.key(0);
    if(panier === null){
        console.log('le panier est vide');
        const contenantMessage = document.getElementById('paragraph-prix-total');
        contenantMessage.innerText = 'Votre panier est vide';
    }
}
function creerStructureArticle() {
    creerElement('liste-articles', 'div', 'article', 'row', 'm-2');
    creerElement('article', 'div', 'col', 'article_description');
    creerElement('article_description', 'h2', 'article_titre');
    creerElement('article_description', 'p', 'article_style');
    creerElement('article', 'div', 'col', 'article_image');
    creerElement('article_image', 'img', 'image_ourson');
    creerElement('article', 'div', 'col', 'article_choix');
    creerElement('article_choix', 'p', 'article_quantite');
    creerElement('article_choix', 'p', 'article_prix');
}
let prixTotal = 0;

function financial(number){
    return Number.parseFloat(number).toFixed(2);
}

function afficherPrixTotal(prix) {
    prixTotal += prix;
    let contenantPrixTotal = document.getElementById('prix-total');
    contenantPrixTotal.textContent = financial(prixTotal / 100);
}

function remplirStructureArticle(objetAPI, infoPanier, iteration) {
    let titre = objetAPI.name;
    let image = objetAPI.imageUrl;
    let prix = objetAPI.price;
    let style = infoPanier.color;
    let nombre = infoPanier.quantity;
    let prixTotal = prix * nombre;
    const contenantTitre = document.getElementsByClassName('article_titre');
    contenantTitre[iteration].textContent = titre;
    const contenantStyle = document.getElementsByClassName('article_style');
    contenantStyle[iteration].textContent = style;
    const contenantImage = document.getElementsByClassName('image_ourson');
    contenantImage[iteration].setAttribute('src', image);
    const contenantQuantite = document.getElementsByClassName('article_quantite');
    contenantQuantite[iteration].textContent = 'Quantité : ' + nombre;
    const contenantPrix = document.getElementsByClassName('article_prix');
    contenantPrix[iteration].textContent = 'Prix : ' + financial(prix / 100) + '€';
    afficherPrixTotal(prixTotal);
}

function recuperationIdLocalStorage(){
    let arrayIdPanier = [];
    for (let i=0; i < window.localStorage.length; i++) {
        arrayIdPanier.push(window.localStorage.key(i));
    }
    return arrayIdPanier;
}

async function collectInfoPanier(idPanier, infoPanier, iteration) {
    //on récupère les info du localstorage
    //let infoPanier = JSON.parse(window.localStorage.getItem(idPanier));
    //on récupère les info de l'API
    await fetch('http://localhost:3000/api/teddies/'+ idPanier)
    .then((response) => response.json())
    //on créé un article avec toutes les infos
    .then((infoAPI) => remplirStructureArticle(infoAPI, infoPanier, iteration))
}

//pour chaque element du panier
function affichageArticlesDuPanier() {
    let arrayIdPanier = recuperationIdLocalStorage();
    //on créé une variable qui sert d'itération pour remplir la dernière structure créée
    let x = 0;
    for (let elem of arrayIdPanier) {
        let ensembleStyle = JSON.parse(window.localStorage.getItem(elem));
        for (let i in ensembleStyle) {
            creerStructureArticle();
            collectInfoPanier(elem, ensembleStyle[i], x);
            x++;
        }
    }
}

afficherPanierVide();
affichageArticlesDuPanier();

//fonctionnalité des boutons
const buttonClearPanier = document.getElementById('btn-clearcart');
buttonClearPanier.addEventListener('click', function(){
    window.localStorage.clear();
    alert('le panier a été vider');
    window.location.reload();
})

const boutonContinuerAchat = document.getElementById('btn-continushopping');
boutonContinuerAchat.addEventListener('click', function() {
    let newUrl = window.location.origin;
    window.location = newUrl;
})

const boutonCommander = document.getElementById('btn-commander');
boutonCommander.addEventListener('click', function() {
    const formulaireDeCommande = document.getElementById('formulaire-commande');
    formulaireDeCommande.classList.replace('display-off', 'display-on');
})

