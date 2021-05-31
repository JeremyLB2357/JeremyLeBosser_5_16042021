let ensembleId = ['test1', 'test2', 'test3'];

function IsRealId (idTested) {
    for (let i in ensembleId) {
        if (idTested == ensembleId[i]) {
            return true;
        }
    }
    return false;
}

const button = document.getElementById('btn');
button.addEventListener('click', function() {
    const valeurTest = document.getElementById('firstname').value;
    console.log(valeurTest);
    console.log(IsRealId(valeurTest));
})

function putAllIdInArray(responseAPI) {
    for (let i in responseAPI) {
        ensembleId.push(responseAPI[i]._id)
    }
    console.log(ensembleId);
}

async function fillIdProduct(){
    await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((ids) => putAllIdInArray(ids))
};

fillIdProduct();