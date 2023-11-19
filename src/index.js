import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common["x-api-key"] = "live_faQJYOh33sXzDrbJt3EMSFgKA9PyehrNGi9F5NtQEdbAKwlSD8Cd727SwRWQbx9r";

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const arrBreedsId = [];

const { breedSelect, catInfo, loader, error } = refs;

breedSelect.addEventListener('change', changeCatBreed);

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: breedSelect,
      placeholder: 'Select a breed',
      data: arrBreedsId,
    });
  })
  .catch((err) => {
        Notiflix.Notify.failure(
          `Oops! Something went wrong! Try reloading the page!`
        );
      });

function changeCatBreed(event) {

  event.preventDefault();
  loader.classList.remove('is-hidden');
  const breedId = event.currentTarget;
  fetchCatByBreed(breedId)
    .then(data => { catInfo.innerHTML = createMarkup(data.breedId); })
    .catch((err) => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    });
}

function createMarkup(arr) {
  //const { url, breeds } = data[0];
  return arr.map(
    ({ url, breeds: {
      name,
      description,
      temperament,
    }, }) => `<div class="cat-img">
                  <img src="${url}" alt="${name}" width="400"/>
              </div>
              <div class="cat-description">
                  <h1>${name}</h1>
                  <p>${description}</p>
                  <p><b>Temperament:</b>${temperament}</p>
              </div>`
  ).join("");
}


