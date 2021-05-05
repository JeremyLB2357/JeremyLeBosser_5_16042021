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

//on envoie le tout à l'API

async function requetePost(info) {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: info
    })
    .then(async response =>console.log(await response.json()))
}

function envoyerCommande() {
    const panier = recuperationPanier();
    const contact = recuperationCoordonnees();
    const info = formatageDesInfoPourAPI(contact, panier);
    console.log(panier);
    console.log(contact);
    console.log(info);
    debugger;
    requetePost(info);
}

const buttonValider = document.getElementById('btn-valide-commande');
buttonValider.addEventListener('click', function(event) {
    console.log('bouton envoyer clické !');
    event.preventDefault();
    envoyerCommande();
    alert('la commande a été envoyée!')
    }
);
