// Get States for IBGE Api
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json())
    .then( states => {
        states.forEach(value => {
            ufSelect.innerHTML += `<option value=${value.id}>${value.nome}</option>`
        });
    });
}

populateUFs();

// Get Cities for IBGE Api
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        cities.forEach(value => {
            citySelect.innerHTML += `<option value="${value.nome}">${value.nome}</option>`
        });

        citySelect.disabled = false;
    });
}

// Change state
document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Variables of DOM
let selectedItems = [];
const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");

itemsToCollect.forEach(item => {
    item.addEventListener("click", handleSelectedItem);
});

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    const alreadySelected = selectedItems.findIndex(item => item === itemId);

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId);
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId); 
    }

    collectedItems.value = selectedItems;
}