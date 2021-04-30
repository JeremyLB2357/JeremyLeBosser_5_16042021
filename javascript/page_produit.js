function adresseIdUnique(){
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('id');
    const adresseOursonUnique = 'http://localhost:3000/api/teddies/' + idProduit;
    return adresseOursonUnique;
}
//fonctions pour afficher les informations du produit
function afficherNom(produits){
    const contenant = document.getElementById('titre_ourson');
    let titre = produits.name;
    contenant.textContent = titre;
}
function financial(number){
    return Number.parseFloat(number).toFixed(2);
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
    afficherNom(produits);
    afficherPrix(produits);
    afficherDescription(produits);
    afficherPhotoDesNounours(produits);
    listerStyleNounours(produits);
}
async function fillProducts(){
    await fetch(adresseIdUnique())
    .then((response) => response.json())
    .then((nounours) => extraireUnOursonDeLaBDD(nounours))
};
//Et on déclenche le tout:
fillProducts();