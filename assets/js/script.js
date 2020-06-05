

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for(state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      
    }
  } )
}
populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const inputState = document.querySelector("input[name=states]");

  const indexOfSelectedState = event.target.selectedIndex;
  inputState.value = event.target.options[indexOfSelectedState].text;
  const ufValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes
  `
  fetch(url).then(res => res.json()).then(city => {
    for(cities of city){
      citySelect.innerHTML += `<option value="${cities.id}">${cities.nome}</option>`
    }
    citySelect.disabled = false
  })
}
document.querySelector("select[name=uf]").addEventListener("change", getCities)