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

function handleSelectedItem(event){

    
}
