function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUfs ()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options [indexOfSelectedState].text 


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => { 

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
};


const colectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => item == itemId );


    // se ja estiver selecionado
    if( alreadySelected >= 0 ) {
        selectedItems.splice(alreadySelected, 1);
    } else {
        selectedItems.push(itemId); // isso sera true ou false
    };

    // if( alreadySelected >= 0 ) {
    //     const filteredItems = selectedItems.filter( item => item != itemId );
    // } else {
    //     selectedItems.push(itemId);
    // }


    // atualizar o campo escondido com os itens selecionados
    colectedItems.value = selectedItems;

    console.log(selectedItems);
    
};