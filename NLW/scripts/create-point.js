//() => {} (Arrow function. Função anonima)

//Pesquisa todos os estados do país e armazena na variável states, depois localiza o estado selecionado e insere no campo state
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( ( res ) => { return res.json() }) //.then( res =>  res.json() ) Pode ser usado dessa forma neste caso
    .then( states => {
        
        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`           
        }
    } )
}

//chama a function de mesmo nome
populateUFs()

// Verifica o estado selecionado e seleciona as suas respectivas cidades. Por fim permite selecionar a cidade no campo city 
function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state")
    
    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( ( res ) => { return res.json() }) //.then( res =>  res.json() ) Pode ser usado dessa forma neste caso
    .then( cities => {

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`           
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change",  getCities)
  
//Itens de coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

 //atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

//array dos itens selecionados
let selectedItems = [ ]

function handleSelectedItem(event){
    const itemLi = event.target


    //adicionar ou remover uma classe com js
   itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id //pega os numeros do id através do evento click

    
     /**
      * verificar se existem items selecionados, se sim
      * pegar os itens selecionados
      * laço de repetição. Nesse caso, será verificado se o "itemId"" é igual ao "item"
      * sendo igual, "itemFound" recebe "item" e retorna "true" ou "itemFound"
      * 
      * forma sinplificada da mesma função
      *  const alreadSelected = selectedItens.findIndex( item => item == itemId)
      */
    const alreadySelected = selectedItems.findIndex( function(item){ 
        const itemFound = item == itemId
        return itemFound
    })

    //se já estiver selecionado, tirar da seleção
    if ( alreadySelected >= 0)  {
        //tirar da seleção
        const filteredItems =selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar  à seleção
        //add a seleção
        selectedItems.push(itemId)

    }

   //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}
