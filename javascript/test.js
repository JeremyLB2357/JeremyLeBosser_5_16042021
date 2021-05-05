//on récupère les informations du panier
function recuperationPanier() {
    let arrayIdPanier = [];
    for (let i=0; i < window.localStorage.length; i++) {
        arrayIdPanier.push(window.localStorage.key(i));
    }
    return arrayIdPanier;
}
//on récupère les coordonnées du formulaire
function recuperationCoordonnees() {
    const prenom = document.getElementById('firstname').value;
    const nom = document.getElementById('lastname').value;
    personne.firstName = prenom;
    personne.lastName = nom;
}
const buttonValider = document.getElementById('btn-valider-form');
buttonValider.addEventListener('click', function() {
    recuperationCoordonnees();
    console.log(personne)
    }
);

//on envoie le tout à l'API
let infoFormulaire = {
        firstName: 'Jérémy',
        lastName: 'LB',
        email: 'test@jlb.fr',
        address: '4 rue du test',
        city: 'Rennes'
    }
    let arrayProducts = ['5be9c8541c9d440000665243', '5beaa8bf1c9d440000a57d94'];
    let infoAEnvoyer = {
        contact: infoFormulaire,
        products: arrayProducts
    }
console.log(infoAEnvoyer);
let test = JSON.stringify(infoAEnvoyer);

async function envoyerCommande() {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: test
    })
    .then(async response =>console.log(await response.json()))
}

const buttonEnvoyer = document.getElementById('btn-envoyer');
buttonEnvoyer.addEventListener('click', function() {
    envoyerCommande();
    }
);