// Cuidado não utilizar querySelectorAll, pois ele vai retornar uma lista
// o que pode dar problema com addEventListener que só recebe uma variável
// , enquanto o querySelector só retorna 1 elemento
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const buttonclose = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

buttonclose.addEventListener("click", () => {
    modal.classList.add("hide")
})