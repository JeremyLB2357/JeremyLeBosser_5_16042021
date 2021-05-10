
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

async function envoyerCommande(test2) {
    await fetch('http://localhost:3000/api/teddies/order', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: test2
    })
    .then(async response =>console.log(await response.json()))
}

const buttonEnvoyer = document.getElementById('btn-envoyer');
buttonEnvoyer.addEventListener('click', function() {
    envoyerCommande(test);
    }
);

//zone de test de l'affichage de la page de confirmation

const form = document.getElementById('formulaire-test')
const buttonTest = document.getElementById('btn-valider-form');
buttonTest.addEventListener('click', function() {
    form.submit();
})