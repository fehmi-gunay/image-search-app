const form = document.querySelector("#form");
const input = document.querySelector("#input");
const message = document.querySelector("#message");
const imageWrapper = document.querySelector(".image-wrapper");
const clearButton = document.querySelector("#clearButton");

addEventListeners();

function addEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}


function clear() {
    imageWrapper.classList.remove("active");
    message.textContent = "";
    input.value = "";
    imageWrapper.innerHTML = "";
}

function search(e) {
    imageWrapper.classList.remove("active");
    e.preventDefault();
    imageWrapper.innerHTML = "";
    const value = input.value.trim();

    if (value === "") {
        message.style.color = "red";
        message.textContent = "Lütfen bir şey giriniz";
        return;
    }

    message.style.color = "green";
    message.textContent = "Yükleniyor...";
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID 8ViWxwDPGVzWYujGxBXiPgd9tgoT6hVTLiMXT0XmSYg"
        }
    })
        .then((response) => {
            if (!response.ok)
                throw new Error("Sunucuya bağlanılamadı");
            return response.json();
        })
        .then((data) => {
            message.textContent = "";
            if (data.results.length === 0) {
                message.style.color = "orange";
                message.textContent = "Sonuç bulunamadı";
            }
            else {
                data.results.forEach((image) => {
                    addImageToUI(image.urls.small);
                })
            }
        })
        .catch((err) => {
            message.style.color = "red";
            message.textContent = err.message;
        })


}

function addImageToUI(url) {
    const div = document.createElement("div")
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", "Arama sonucu görseli");

    div.appendChild(img);
    imageWrapper.appendChild(div);
    imageWrapper.classList.add("active");
}
