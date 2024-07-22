
const accessKey = "EHkd_SMDkcFJc_EC0YHrKAMIIJduQ779m2Sw9PFf1YQ";
// this is my personal api key PLease do not use it 
// get your own api from unplash.com
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button");


let inputData = "";//Your text that you  going to input 
let page = 1;
async function searchImage() {
    inputData = inputEl.value;
    const url = ` https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&orientation=landscape&client_id=${accessKey}`;
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);//whole responced data will be printout at console
    const results = data.results; //extracting results of 10 image array  from the responce
    //see  the documentation of this Api:https://unsplash.com/documentation#search-photos
    
    if (page === 1) {
        searchResults.innerHTML = '';
    }
    // for every result this function will be called
    results.map((result) => {
        const imageWrapper = document.createElement('div');//creating search-Result (div)box
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small;
        image.alt = result.alt_description
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}
formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImage();

});
showMore.addEventListener("click",()=>{
    searchImage();
});


