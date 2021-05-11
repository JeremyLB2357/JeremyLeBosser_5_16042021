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


function remplirInputFormulaire(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    const input1 = document.getElementById('idcommande');
    input1.setAttribute('value', infoAEnvoyer[0]);
    const input2 = document.getElementById('total');
    input2.setAttribute('value', infoAEnvoyer[1]);
    console.log('formulaire rempli');
}

function remplirFormulaireFantome(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    const Input = document.getElementById('idcommande');
    const Input2 = document.getElementById('total');
    Input.setAttribute('value', infoAEnvoyer[0]);
    Input2.setAttribute('value', infoAEnvoyer[1]);
    console.log('le formulaire est rempli');
    return true;
}

function validerFormulaireFantome(booleen) {
    if (booleen) {
        const form = document.getElementById('form-fantome');
        console.log(form);
        form.submit();
    } else {
        console.log('le formulaire est vide')
    }
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
    .then(async response => response.json())
    .then(ApiResponse => remplirFormulaireFantome(ApiResponse))
    .then(newResponse => validerFormulaireFantome(newResponse))
}

function envoyerCommande() {
    const panier = recuperationPanier();
    const contact = recuperationCoordonnees();
    const info = formatageDesInfoPourAPI(contact, panier);
    requeteNouvelleCommandeAPI(info);
    console.log('requete POST effectuée');
    debugger;
}

/*lors du click sur le bouton valider la commande on lance le tout :
*   on récupère les infos à envoyer
*   on formate les info à envoyer
*   on envoye les info à l'API
*   une fois que l'on a une réponse, on extrait l'ID de commande de la réponse
*   on rempli le formulaire fantome avec l'ID obtenu et le prix total
*   une fois le formulaire rempli, on l'envoi en GET à la page de confirmation
*/

const buttonValider = document.getElementById('btn-valide-commande');
buttonValider.addEventListener('click', function(event) {
    event.preventDefault();
    envoyerCommande()
    }
);
