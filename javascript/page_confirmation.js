const contenantRefCommande = document.getElementById('ref-commande');
const contenantTotal = document.getElementById('prix-total');

function financial(number){
    return Number.parseFloat(number).toFixed(2);
}

function afficherPrixEtId() {
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('idcommande');
    const total = urlParams.get('total');
    contenantRefCommande.innerText = idProduit;
    contenantTotal.innerText = financial(total / 100);
}



