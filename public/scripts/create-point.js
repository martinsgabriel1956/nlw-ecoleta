/* Para listar os cidades*/
const elements = {
  ufSelect: document.querySelector("select[name=uf]"),
  citySelect: document.querySelector("[name=city]"),
  stateInput: document.querySelector("[name=state]"),
  collectItems: document.querySelectorAll(".items-grid li"),
  collectedItems: document.querySelector("input[name=items]"),
};

const getFetch = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then(callback);
}

const features = {
  populateUFs: () => {
    const { ufSelect } = elements;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

    getFetch(url, (states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
  },
  getCities: e => {
    const { citySelect, stateInput } = elements;

    const ufValue = e.target.value;
    const indexOfSelectedState = e.target.selectedIndex;
    stateInput.value = e.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    getFetch(url, (cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
  },
  handleSelectedItem: e => {
    const itemLi = e.target;

  // Adicionar ou remover uma classe com Javascript
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  console.log("Item ID:", itemId);

  //Verificar se existem itens selecionados, se sim
  //pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  //se ja estiver selecionado, tirar da seleção

  if (alreadySelected >= 0) {
    //Tirar da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemDifferent = item != itemId;
      return itemDifferent;
    });

    selectedItems = filteredItems;
  } else {
    //se não tiver selecionado, adicionar á seleção
    //Adicionar à seleção
    selectedItems.push(itemId);
  }

  console.log("selectedItems:", selectedItems);

  //atualizar o campo escondido com os itens selecionado
  collectedItems.value = selectedItems;
  }
};

const { populateUFs, getCities, handleSelectedItem } = features;
const { ufSelect, collectItems, collectedItems } = elements;

populateUFs();

ufSelect.addEventListener("change", getCities);

//Ítens de coleta
//pegar todos os li's
for (let item of collectItems) item.addEventListener("click", handleSelectedItem);

let selectedItems = [];