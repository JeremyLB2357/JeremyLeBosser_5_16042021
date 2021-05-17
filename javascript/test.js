//on créé des constantes type regex pour tester les inputs
//on créé une fonction qui fait le test et qui retourne un booléen
//en réponse à la fonction test, il y a 2 actions faire ou message d'erreur

const input1 = 'jeremy';
const input2 = 18;

//const regexQuantity = new RegExp(/^[1-9]$|[1-9]{1,3}/);
const regexNom = new RegExp(/^[A-Z][A-Za-zÀ-ÿ-]*$/);
const regexMail = new RegExp(/^\S*[^\.\s]@[^\.\s]+\.{1}[^\.\s]\S+[^\.\s]$/);
const regexPostal = new RegExp(/^[\wÀ-ÿ][\s\wÀ-ÿ,-]*[\wÀ-ÿ]$/);
const regexVille = new RegExp(/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s-]*[a-zA-ZÀ-ÿ]$/);

function verificationQuantity(input) {
    const regexQuantity = new RegExp(/[1-9]{1,2}/);
    console.log(regexQuantity.test(input));
    /*if (regexQuantity.test(input)) {
        console.log("l'input est une quantité");
        return(parseInt(input, 10));
    } else {
        console.log("l'input n'est pas un nombre valide");
    }*/
}

function verificationNomPrenom(input) {
    console.log(regexNom.test(input));
    /*if (regexNom.test(input)) {
        console.log("l'input est valide")
    } else {
        console.log("l'input n'est pas valide")
    }*/
}
function verificationMail(input) {
    console.log(regexMail.test(input));
}
function verificationPostal(input) {
    console.log(regexPostal.test(input));
}

const bouton = document.getElementById('btn');
bouton.addEventListener('click', function() {
    const container = document.getElementById('firstname');
    const valeurTest = container.value;
    console.log(valeurTest);
    verificationPostal(valeurTest);
})


const boutonModifPage = document.getElementById('btn-page');
boutonModifPage.addEventListener('click', function() {
    console.log(window.location.origin);
    const newUrl = window.location.origin + '/pagesHTML/page_confirmation.html?idcommande=' + '45709' + '&total=' + '14500';
    console.log(newUrl);
    debugger;
    window.location = newUrl;
})

const inputFollow = document.getElementById('mail');
inputFollow.addEventListener('change', function() {
    verificationNomPrenom(inputFollow.value);
})

