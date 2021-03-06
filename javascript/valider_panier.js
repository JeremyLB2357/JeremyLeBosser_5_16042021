// 1ere partie avant l'envoi de la commande à l'API
//on récupère tous les ids présents dans le localstorage
function recuperationPanier() {
    let arrayIdPanier = [];
    for (let i=0; i < window.localStorage.length; i++) {
        const product = window.localStorage.key(i);
        const quantityProduct = JSON.parse(window.localStorage.getItem(product))[0].quantity;
        for (let x=0; x < quantityProduct; x++) {
           arrayIdPanier.push(product); 
        }
    }
    return arrayIdPanier;
}

//on récupère les coordonnées notées dans le formulaire
function recuperationCoordonnees() {
    const prenom = document.getElementById('firstname').value;
    const nom = document.getElementById('lastname').value;
    const adresseMail = document.getElementById('email').value;
    const adressePostale = document.getElementById('adresse').value;
    const ville = document.getElementById('ville').value;
    const personne = {
        firstName: prenom,
        lastName: nom,
        email: adresseMail,
        address: adressePostale,
        city: ville
    }
    return personne;
}

//on met les données que l'on doit envoyer à l'API dans le bon format
function formatageDesInfoPourAPI(personne, idsPanier) {
    let infoAEnvoyer = {
        contact: personne,
        products: idsPanier
    }
    let infoFormatee = JSON.stringify(infoAEnvoyer);
    return infoFormatee;
}

// 2eme partie : une fois que l'API nous a renvoyé un numéro de commande
//on récupère l'ID dans le retour de l'API ainsi que le prix total
function extraireIdCommande(reponseAPI) {
    const idCommande = reponseAPI.orderId;
    const produitsCommande = reponseAPI.products;
    let total = 0;
    for (let i in produitsCommande) {
        total += produitsCommande[i].price;
    }
    let array = [idCommande, total];
    return array;
}

function redirectionPageConfirmation(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    const newUrl = window.location.origin + '/pagesHTML/page_confirmation.html?idcommande=' + infoAEnvoyer[0] + '&total=' + infoAEnvoyer[1];
    window.location = newUrl;
}
//on envoie le tout à l'API

async function requeteNouvelleCommandeAPI(info) {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: info
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('il y a une erreur');
        }})
    .then(ApiResponse => redirectionPageConfirmation(ApiResponse))
    .catch(error => console.log(error))
}

function envoyerCommande() {
    const panier = recuperationPanier();
    const contact = recuperationCoordonnees();
    const info = formatageDesInfoPourAPI(contact, panier);
    requeteNouvelleCommandeAPI(info);
}

//vérification du formulaire
function checkFormulaire(classe, test) {
    const inputAChecker = document.getElementById(classe);
    const regexTesteur = test;
    if (regexTesteur.test(inputAChecker.value)) {
        inputAChecker.style.color = '#000000';
        return true;
    } else {
        inputAChecker.style.color = '#FF0000';
    }
}

const buttonValider = document.getElementById('btn-valide-commande');
buttonValider.addEventListener('click', function(event) {
    event.preventDefault();
    if (window.localStorage.key(0) == null){
        alert('votre panier est vide');
    } else {
        const regexNom = new RegExp(/^[A-Z][A-Za-zÀ-ÿ-]*$/);
        const regexMail = new RegExp(/^\S*[^\.\s]@[^\.\s]+\.{1}[^\.\s]\S+[^\.\s]$/);
        const regexPostal = new RegExp(/^[\wÀ-ÿ][\s\wÀ-ÿ,-]*[\wÀ-ÿ]$/);
        const regexVille = new RegExp(/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s-]*[a-zA-ZÀ-ÿ]$/);
        const classeFormulaire = ['firstname', 'lastname', 'email', 'adresse', 'ville'];
        if (!checkFormulaire(classeFormulaire[0], regexNom) ||
            !checkFormulaire(classeFormulaire[1], regexNom) ||
            !checkFormulaire(classeFormulaire[2], regexMail) ||
            !checkFormulaire(classeFormulaire[3], regexPostal) ||
            !checkFormulaire(classeFormulaire[4], regexVille)) {
            alert('le formulaire est faux');
        } else {
            console.log('le formulaire est valide');
            envoyerCommande();
        }
    }
});
