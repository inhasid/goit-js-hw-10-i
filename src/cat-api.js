import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_faQJYOh33sXzDrbJt3EMSFgKA9PyehrNGi9F5NtQEdbAKwlSD8Cd727SwRWQbx9r";

const BASE_URL = 'https://api.thecatapi.com/v1';

// const API_KEY =
//     'live_faQJYOh33sXzDrbJt3EMSFgKA9PyehrNGi9F5NtQEdbAKwlSD8Cd727SwRWQbx9r';
// const ENDPOINT1 = "breeds.json";
// const ENDPOINT2 = "images/search.json";

export function fetchBreeds() {

    //   return fetch(`${BASE_URL}/${ENDPOINT1}?api_key=${API_KEY}`).then(response => {
    //     if (!response.ok) {
    //       throw new Error("Error");
    //     }
    //     return response.json();
    //   });

    return axios
    .get(`${BASE_URL}/breeds`)
    .then(({data}) => data)
    .catch(error => { throw error; });
}

export function fetchCatByBreed(breedId) {

    // return fetch(`${BASE_URL}/${ENDPOINT2}?api_key=${API_KEY}&breed_ids=${breedId}`).then(response => {
    //     if (!response.ok) {
    //         throw new Error("Error");
    //     }
    //     return response.json();
    // });

    return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(({data}) => data)
    .catch(error => { throw error; });
}

