function financial(number){
    return Number.parseFloat(number).toFixed(2);
}

function recupererPrixEtId() {
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('idcommande');
    const total = urlParams.get('total');
    const array = [idProduit, total];
    const contenantRefCommande = document.getElementById('ref-commande');
    const contenantTotal = document.getElementById('prix-total');
    contenantRefCommande.innerText = array[0];
    contenantTotal.innerText = financial(array[1] / 100);
}

recupererPrixEtId();
window.localStorage.clear();
