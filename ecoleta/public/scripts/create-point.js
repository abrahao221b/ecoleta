
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json()})
    .then( (states) => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /* Sem isso não irá atualizar o campo e dará um bug, o qual é que 
       as cidades pelo estado não se modificam. */ 
    citySelect.innerHTML = "<option value>Select the city</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json()})
    .then( (cities) => {

        for( const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    } )
}

// Ouvidor de eventos de mudanças
document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities)



// Items de coleta

const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
// let é igual ao var
let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target
    
    
    // add or remove a class with javascript
    // toggle ele faz o paple de add e remove em relação a classe
    /* O que toggle faz é ele ver se tem uma classe selected, caso não
     ele adciona caso se sim ele remove */
    itemLi.classList.toggle("selected")
    
    
    const itemId = event.target.dataset.id
    // como testar!!!!
    // console.log('ITEM ID: ', itemId)

    // verificar se exitem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound 
        //return boolean se item com ItemsId der metch
        // Como é uma arrow function poderia ser bem mais reduzido 
        // dessa forma return item == ItemsId ou mais ainda item == ItemsId sem o return
        // ficando assim: const alreadySelected = selectedItems.findIndex (item => item == itemId) o return ainda será true ou false
    })

    //se já estiver selecionado, tirar da seleção

    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar a seleção
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems), teste
    // atualizar o campo escondido com os itens selecionados, lá no inputhidden
    collectedItems.value = selectedItems
    
}