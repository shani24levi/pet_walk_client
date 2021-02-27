import { doApiGet } from "../../services/apiSer.js";
import { auth } from "../../services/authSer.js";
import { createMyPets } from "./myPetManager.js";


$(() => {
    init();
})

const init = async () => {
    $("main .my_pets").html(`
    <div></div>
    <div class="text-center mr-3 w-100">
      <img src="images/loading-dog.gif" width="200" >    
      </div>
      <div></div>`);

    let data = await auth();
    console.log(data);
    if (data.status == "ok") {
        let url = "/pets/ofUser";
        let data = await doApiGet(url);
        console.log(data);
        console.log(data.length);
        createMyPets(data);
    }
}