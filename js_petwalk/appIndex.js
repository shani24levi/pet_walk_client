$(() => {
    init();
})
  
const init = () => {
    $("#id_start").on("click",() => {
        window.location.href = "login.html";
    });
}