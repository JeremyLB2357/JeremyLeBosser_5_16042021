//on créé des constantes type regex pour tester les inputs
//on créé une fonction qui fait le test et qui retourne un booléen
//en réponse à la fonction test, il y a 2 actions faire ou message d'erreur

const input1 = 'jeremy';
const input2 = 18;

const regexQuantity = new RegExp(/^[1-9]$|[1-9]{1,3}/);
const regexNom = new RegExp(/[a-zA-Zéèçï-]+/);
const regexMail = new RegExp(/\S+@\S+\.\S+/);
const regexPostal = new RegExp(/[a-zA-Z0-9\s]*/);
const regexVille = new RegExp(/[a-zA-Z\s-]*/);


function verificationQuantity(input) {
    if (regexQuantity.test(input)) {
        console.log("l'input est une quantité");
    } else {
        console.log("l'input n'est pas un nombre valide");
    }
}

function verificationNomPrenom(input) {
    if (regexNom.test(input)) {
        console.log("l'input est valide")
    } else {
        console.log("l'input n'est pas valide")
    }
}

const bouton = document.getElementById('btn');
bouton.addEventListener('click', function() {
    const container = document.getElementById('quantity');
    const valeurTest = container.value;
    console.log(valeurTest);
    verificationQuantity(valeurTest);
})


const boutonModifPage = document.getElementById('btn-page');
boutonModifPage.addEventListener('click', function() {
    console.log(window.location.origin);
    const newUrl = window.location.origin + '/pagesHTML/page_confirmation.html?idcommande=' + '45709' + '&total=' + '14500';
    console.log(newUrl);
    debugger;
    window.location = newUrl;
})