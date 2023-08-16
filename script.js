const accessKey = "Vrfamh08Ahu03Qph9MeMB4o7C9pOuL1mUc5mbauXvUo";
const formEI = document.querySelector("form");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("so_on_button");
const inputEI = document.getElementById("search-input");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEI.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    if(page === 1){
        searchResults.innerHTML = "";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });
    page = page + 1;
    if(page > 1){
        showMore.style.display = "block";
    }
}
formEI.addEventListener("submit",(event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click",(event) =>{
    searchImages();
})