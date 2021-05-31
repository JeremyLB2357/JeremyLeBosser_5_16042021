// 1) une fonction qui créé la structure voulue
function creerCarteProduit() {
    const contenant = document.getElementById('liste_produits');
    //on créé le contenant "carte_porduit"
    const newDiv = document.createElement("div");
    contenant.appendChild(newDiv);
    newDiv.classList.add("col-xs-12", "col-sm-6", "col-md-4", "carte_produit");
    //à l'intérieur, on créé le contenant de l'image
    const newLink = document.createElement("a");
    newDiv.appendChild(newLink);
    newLink.classList.add("row", "carte_image");
    //ensuite on créé le paragraphe contenant le titre et le prix
    const newParagraph = document.createElement("p");
    newDiv.appendChild(newParagraph);
    newParagraph.classList.add("row", "carte_text");
    //pour finir on créé le span titre et le span prix
    const newTitle = document.createElement("span");
    newParagraph.appendChild(newTitle);
    newTitle.classList.add("col", "h4", "carte_text_titre");
    const newPrice = document.createElement("span");
    newParagraph.appendChild(newPrice);
    newPrice.classList.add("col-3", "carte_text_prix");
}
// 2) une fonction pour afficher les nombres avec 2 chiffres après la virgule
function financial(number){
    return Number.parseFloat(number).toFixed(2);
}

function afficherNomEtPrixNounours(produits) {
    // pour chaque produit, donc on fait une boucle
    let x = 0;
    for (let i in produits){
        creerCarteProduit();
        let Titre = produits[i].name;
        let contenantTitre = document.getElementsByClassName('carte_text_titre');
        contenantTitre[x].textContent = Titre;
        let prix = produits[i].price / 100;
        let contenantPrix = document.getElementsByClassName('carte_text_prix');
        contenantPrix[x].textContent = financial(prix) + '€';
        x++;
    }
}

function afficherPhotoLienNounours(produits){
    //on va chercher les contenant des produits
    const contenantImage = document.getElementsByClassName('carte_image');
    //pour chaque contenant, on ajoute les images
    for (let i = 0; i < contenantImage.length; i++){
        //on lui ajoute à l'intérieur une balise img
        const image = document.createElement("img");
        contenantImage[i].appendChild(image);
        //on modifie l'attribut de cette image pour aller chercher la bonne image
        image.setAttribute("src", produits[i].imageUrl);
        //on définit le lien vers la page produit
        const lienPageProduit = './pagesHTML/page_produit.html?id=' + produits[i]._id;
        //on assigne un lien au contenant de l'image
        contenantImage[i].setAttribute("href", lienPageProduit);
    }
}

function afficherListeProduits(produits){
    afficherNomEtPrixNounours(produits);
    afficherPhotoLienNounours(produits);
}

async function fillProducts(){
    await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounourses) => afficherListeProduits(nounourses))
};

fillProducts();