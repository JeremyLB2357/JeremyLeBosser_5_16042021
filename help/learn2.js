//fonction fetch
async function fillProducts(){
    await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounourses) => afficherDivAvecNomEtPrixNounours(nounourses))
};

fillProducts();

// 1) afficher les noms des nounours sous forme de paragraphes dans la page
function afficherNounoursNameParagraphe(produits) {
    //on va chercher le contenant
    let contenant = document.getElementById('display_name');
    //on créé un paragraphe
    const newParagraph = document.createElement("p");
    //on ajoute ce paragraphe comme enfant du contenant
    contenant.appendChild(newParagraph);
    //on ajoute une classe à ce nouveau paragraphe
    newParagraph.classList.add("product_name");
    //on rempli le paragraphe avec le texte attendu
    let contenuParagraphe = 'Voici le nom des produits disponibles:';
    for (let i in produits){
        contenuParagraphe = contenuParagraphe + ', ' + produits[i].name;
    }
    newParagraph.textContent = contenuParagraphe;
}

// 2) pour chaque nounours, creer division et a l'interieur, ajoute nom + prix du nounours
function afficherDivAvecNomEtPrixNounours(produits) {
    //on va chercher le contenant
    let contenant = document.getElementById('display_name');
    // pour chaque produit, donc on fait une boucle
    for (let i in produits){
        //on créé une div
        const newDiv = document.createElement("div");
        //on ajoute cette div comme enfant du contenant
        contenant.appendChild(newDiv);
        //on ajoute une classe à cette div
        newDiv.classList.add("product_div");
        //on rempli la div avec le texte attendu
        let contenuDiv = 'Voici ' + produits[i].name + '. Il coute ' + produits[i].price + '€';
        newDiv.textContent = contenuDiv;
    }
} 

// 3) reussir a integrer les liens dans la balise src de tag <img>
function afficherPhotoDesNounours(produits){
    //on va chercher les contenant des produits
    const contenant = document.getElementsByClassName("product_div")
    //pour chaque contenant, on ajoute les images
    for (let i = 0; i < contenant.length; i++){
        //on lui ajoute à l'intérieur une balise img
        const image = document.createElement("img");
        contenant[i].appendChild(image);
        //on modifie l'attribut de cette image pour aller chercher la bonne image
        image.setAttribute("src", produits[i].imageUrl);
    }
}

// 4) combiner tout et faire un apercu du produit (image, nom, prix + bouton "voir produit")
function afficherLeToutSousFormeDeDivisions(nounours) {} 

/* 5) reussir a faire la page des produit 
(il ne s'agit plus de faire un apercu des produits comme sur la page d'accueil,
 mais bien de remplir les informations sur un template de page HTML)*/