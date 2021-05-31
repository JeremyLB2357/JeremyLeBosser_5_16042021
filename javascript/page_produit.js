function adresseIdUnique(){
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('id');
    if (idProduit == null) {
        console.log("l'id n'est pas valide");
        return false;
    } else {
        const adresseOursonUnique = 'http://localhost:3000/api/teddies/' + idProduit;
        return adresseOursonUnique;
    }
}

//fonctions pour afficher les nombres avec 2 décimales
function financial(number){
    return Number.parseFloat(number).toFixed(2);
}

//fonctions pour afficher les informations du produit
function afficherNom(produits){
    const contenant = document.getElementById('titre_ourson');
    let titre = produits.name;
    contenant.textContent = titre;
}

function afficherPrix(produits){
    const contenant = document.getElementById('prix_ourson');
    let prix = produits.price / 100;
    contenant.textContent = 'Prix unitaire: ' + financial(prix) + '€';
}

function afficherDescription(produits){
    const contenant = document.getElementById('description_ourson');
    let description = produits.description;
    contenant.textContent = description;
}

function afficherPhotoDesNounours(produits){
    const image = document.getElementById('image_ourson');
    image.setAttribute("src", produits.imageUrl);
}

function listerStyleNounours(produits){
    const styleDispo = produits.colors;
    const contenant = document.getElementById('style');
    for (let i in styleDispo){
        const newOption = document.createElement("option");
        contenant.appendChild(newOption);
        newOption.setAttribute("value", styleDispo[i]);
        newOption.textContent = styleDispo[i];
    }
}
//on regroupe le tout
function extraireUnOursonDeLaBDD(produits){
    if (produits == null) {
        alert('le produit sélectionné est inconnu au bataillon');
    } else {
        afficherNom(produits);
        afficherPrix(produits);
        afficherDescription(produits);
        afficherPhotoDesNounours(produits);
        listerStyleNounours(produits);
    }
}

async function fillProducts(){
    await fetch(adresseIdUnique())
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("le produit sélectionné est inconnu au bataillon, veuillez retourner à la page d'accueil");
            throw new Error('il y a une erreur');
        }
    })
    .then((nounours) => extraireUnOursonDeLaBDD(nounours))
    .catch(error => console.log(error))
};
//Et on déclenche le tout:
fillProducts();

//fonctionnement des boutons :
const boutonModifierChoix = document.getElementById('btn-otherchoice');
boutonModifierChoix.addEventListener('click', function() {
    let newUrl = window.location.origin;
    window.location = newUrl;
})