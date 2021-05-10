function recuperationPanier() {
    let arrayIdPanier = [];
    for (let i=0; i < window.localStorage.length; i++) {
        arrayIdPanier.push(window.localStorage.key(i));
    }
    return arrayIdPanier;
}

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

function formatageDesInfoPourAPI(personne, idsPanier) {
    let infoAEnvoyer = {
        contact: personne,
        products: idsPanier
    }
    let infoFormatee = JSON.stringify(infoAEnvoyer);
    return infoFormatee;
}


//il faut réaliser une requete post pour transmettre la réponse de L'API à la page de confirmation
//pour cela, il faut créer un input invisible et y ajouter comme valeur la réponse de l'API
//du coup le formulaire doit pointer vers la page de confirmation (cf: article journal du net)

//on récupère l'ID dans le retour de l'API
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

/*function ajoutInputFormulaire(name, value) {
    const form = document.getElementById('formulaire-test');
    const newInput = document.createElement('input');
    form.appendChild(newInput);
    newInput.setAttribute('type', 'hidden');
    newInput.setAttribute('name', name);
    newInput.setAttribute('value', value);
}*/

function setInputFormulaire(value) {
    const input = document.getElementById('idcommande');
    input.setAttribute('value', value)
}

function remplirInputFormulaire(reponseAPI) {
    const infoAEnvoyer = extraireIdCommande(reponseAPI);
    //ajoutInputFormulaire('idcommande', infoAEnvoyer[0]);
    //ajoutInputFormulaire('total', infoAEnvoyer[1]);
    const input1 = document.getElementById('idcommande');
    input1.setAttribute('value', infoAEnvoyer[0]);
    const input2 = document.getElementById('total');
    input2.setAttribute('value', infoAEnvoyer[1]);
    console.log('formulaire rempli');
}

async function validerFormulaire() {
    await envoyerCommande()
    .then(document.getElementById('formulaire-test').submit())
}
//on envoie le tout dans l'URL de la page de confirmation.


//on envoie le tout à l'API

async function requetePost(info) {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: info
    })
    .then(response => response.json())
    .then((newResponse) => remplirInputFormulaire(newResponse))
}

async function envoyerCommande() {
    const panier = recuperationPanier();
    const contact = recuperationCoordonnees();
    const info = formatageDesInfoPourAPI(contact, panier);
    requetePost(info);
}

const buttonValider = document.getElementById('btn-valide-commande');
buttonValider.addEventListener('click', function(event) {
    event.preventDefault();
    validerFormulaire();
    alert('la commande a été envoyée!')
    }
);
