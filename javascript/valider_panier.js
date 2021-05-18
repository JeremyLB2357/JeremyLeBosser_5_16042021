// 1ere partie avant l'envoi de la commande à l'API
//on récupère tous les ids présents dans le localstorage
function recuperationPanier() {
    let arrayIdPanier = [];
    for (let i=0; i < window.localStorage.length; i++) {
        arrayIdPanier.push(window.localStorage.key(i));
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

//avec les info de l'API, on rempli un formulaire invisible
function remplirFormulaireFantome(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    const Input = document.getElementById('idcommande');
    const Input2 = document.getElementById('total');
    Input.setAttribute('value', infoAEnvoyer[0]);
    Input2.setAttribute('value', infoAEnvoyer[1]);
    console.log('le formulaire est rempli');
    return true;
}

//on transmet avec la method GET les info à la page de confirmation
function validerFormulaireFantome(booleen) {
    if (booleen) {
        const form = document.getElementById('form-fantome');
        console.log(form);
        form.submit();
    } else {
        console.log('le formulaire est vide')
    }
}
//a la place du formulaire fantome on fait plus propre :
function redirectionPageConfirmation(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    const newUrl = window.location.origin + '/pagesHTML/page_confirmation.html?idcommande=' + infoAEnvoyer[0] + '&total=' + infoAEnvoyer[1];
    console.log(newUrl);
    debugger;
    window.location = newUrl;
}
//on envoie le tout à l'API

async function requeteNouvelleCommandeAPI(info) {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: false
    })
    .then(async response => response.json())
    .then(ApiResponse => redirectionPageConfirmation(ApiResponse))
}

function envoyerCommande() {
    const panier = recuperationPanier();
    const contact = recuperationCoordonnees();
    const info = formatageDesInfoPourAPI(contact, panier);
    requeteNouvelleCommandeAPI(info);
}

//vérification du formulaire
const regexNom = new RegExp(/^[A-Z][A-Za-zÀ-ÿ-]*$/);
const regexMail = new RegExp(/^\S*[^\.\s]@[^\.\s]+\.{1}[^\.\s]\S+[^\.\s]$/);
const regexPostal = new RegExp(/^[\wÀ-ÿ][\s\wÀ-ÿ,-]*[\wÀ-ÿ]$/);
const regexVille = new RegExp(/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s-]*[a-zA-ZÀ-ÿ]$/);

const classeFormulaire = ['firstname', 'lastname', 'email', 'adresse', 'ville'];

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
});
