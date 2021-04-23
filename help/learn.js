const nounourses = []
// copier/coller ici le contenu de la première requpete GET
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for (let i in response) {
            let newLenght = nounourses.push(response[i]);
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
//-----------------------------------------------------------------------------------
// utiliser une BOUCLE (for) !
function afficherNomDesNounours(array){
    for (let i in array) {
        console.log(array[i].name);
    }
}
//-----------------------------------------------------------------------------------
function afficherPrixTotal(array){
    let prixTotal = 0;
    for (let i in array) {
        prixTotal += array[i].price;
    }
    console.log(prixTotal)
}
function financial(number){
    return Number.parseFloat(number).toFixed(2);
}
//-----------------------------------------------------------------------------------
// si tu peux, essaye aussi d'afficher celui à -20%
function afficherMoitiePrix(array, pourcentage){
    for (let i in array) {
        let prix = financial((array[i].price - array[i].price * pourcentage / 100) / 100);
        console.log(array[i].name + ' à -' + pourcentage + '% est à ' + prix + '€')
    }
}
//-----------------------------------------------------------------------------------
function afficherColorisDisponibles(array) {
    for (let i in array) {
        let couleurs = 'couleurs';
        if ( array[i].colors.length < 2) {
            couleurs = 'couleur';
        }
        else {
            couleurs = 'couleurs';
        }
        console.log(array[i].name + ' est disponible en ' + array[i].colors.length + ' ' + couleurs);
    }
}
//-----------------------------------------------------------------------------------
function afficherSuperieurA(array, number){
    let prixLimite = financial(number)
    console.log('Les produits suivants coûtent plus que ' + prixLimite + '€ :');
    for (let i in array){
        
        if (array[i].price > (number * 100)){
            let prix = financial(array[i].price / 100)
            console.log(array[i].name + ' coûte ' + prix + '€')
        }
    }
}
// essayer une VARIANTE en affichant "abordable" si le prix est en dessous
function afficherAbordableA(array, number){
    let prixLimite = financial(number)
    console.log('Les produits abordables par rapport à ' + prixLimite + '€ sont:');
    for (let i in array){
        if (array[i].price < (number * 100)){
            let prix = financial(array[i].price / 100)
            console.log(array[i].name + ' coûte ' + prix + '€')
        }
    }
}
//-----------------------------------------------------------------------------------
function afficherSommeDescriptions(array) {
    let sommeDescription = '';
    for (let i in array){
        sommeDescription += array[i].description;
    }
     console.log(sommeDescription);
}
// Attention, c'est bien la SOMME des descriptions qu'il faut afficher, pas les unes après les autres

//-----------------------------------------------------------------------------------
function afficherNiemeCouleurDispo(array, number) {
    let niemeCouleur = number - 1;
    for (let i in array){
        if (array[i].colors.length >= number){
            console.log(array[i].name + ' est disponible en ' + array[i].colors[niemeCouleur]);
        } else {
            let colorisDispo = '';
            for (let x = 0; x < array[i].colors.length; x++){
                colorisDispo = colorisDispo + array[i].colors[x] + ' ';
            }
            console.log(array[i].name + ' est disponible uniquement en ' + colorisDispo);
        }
    }
}
// Attention: gérer les cas où aucune troisième couleur n'existe

//-----------------------------------------------------------------------------------
function addTenToAge(age) {
    age = age + 10;
    return (age);
}
// should increase age passed as argument by 10.
// Ex:
let ageJulie = 12
let agePaul = 24
console.log(addTenToAge(ageJulie)) // should display 22
console.log(addTenToAge(agePaul)) // should display 34
// Help: use the note "What's an argument ?" to really get how arguments work