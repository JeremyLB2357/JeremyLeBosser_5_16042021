function recuperationId (){
    //on récupère les données de l'Url via :
    const queryString = window.location.search;
    //on fragmente les paramètres de l'Url via :
    const urlParams = new URLSearchParams(queryString);
    //on récupère l'ID voulue via :
    const idProduit = urlParams.get('id');
    const adresseOursonUnique = 'http://localhost:3000/api/teddies/' + idProduit;
    console.log(idProduit);
    debugger;
    console.log(adresseOursonUnique);
    debugger;
    return adresseOursonUnique;
}
recuperationId();