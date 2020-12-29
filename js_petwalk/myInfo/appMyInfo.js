import { doApiGet } from "../../services/apiSer.js";
import { auth } from "../../services/authSer.js";
import { createPet } from "./petManager.js";


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
    //let url = "http://localhost:5000/pets/ofUser";
    let data = await doApiGet(url);
    console.log(data);
    console.log(data.length);
    createPet(data, 0, data.length);
  }
}

export const goodJob = () => {
  $("body").prepend(`
  <div class="good">
     <img src="images/good.gif" width="100%" >   
     <img src="images/so-good.gif" width="50%" class="text-center">     
  </div>
  `)
  $(".good").on("click", function () {
    $(".good").addClass("d-none")
  })
}

export const showUpdat = async (updateOne ,updated) => {
  let url = "/pets/ofUser";
  let data = await doApiGet(url);

  createPet(data, updateOne, data.length);
  if(updated==100)
    goodJob();
  //clare:
  localStorage.removeItem('petName');
  localStorage.removeItem('petId');
  localStorage.removeItem('index');
  localStorage.removeItem('update');
}

export const updatMyInfo = async (updateOne) => {
  $("main .my_pets").html(`
  <div></div>
  <div class="text-center mr-3 w-100">
    <img src="images/loading-dog.gif" width="200" >    
    </div>
    <div></div>`);

    let pet = {
      neme: localStorage.getItem('petName'),
      id: localStorage.getItem('petId'),
      update: localStorage.getItem('update'),
      index :localStorage.getItem('index')
  }

    //get pet information:
    let url = `/pets/ofUser/${pet.id}`;
    let data = await doApiGet(url);

    let dataBodyVal = {
      id: pet.id, //requird for edting in server 
      name: data[0].name,
      type: data[0].type,
      dayPlan: data[0].dayPlan,
      dayPlanLevel: data[0].dayPlanLevel,
      activityLevel: data[0].activityLevel,
      foodLevel: data[0].foodLevel
  }

  //set the value to update
  if(pet.update == 'currDayPlanLevel') dataBodyVal.currDayPlanLevel= Number(updateOne);
  else if(pet.update == 'currActivityLevel') dataBodyVal.currActivityLevel= Number(updateOne);
  else if(pet.update== 'currFoodLevel') dataBodyVal.currFoodLevel= Number(updateOne);

  //update
  axios({
    method: 'PUT',
    url: "/pets/",
    data: dataBodyVal,
    headers: {
        "x-auth-token": localStorage["token"],
    }
})
    .then(myData => {
      console.log(myData);
      showUpdat(pet.index, Number(updateOne))
    })
    .catch(error => {
        if (error.response.status == 404) {
            alert(error.response);
        }
        if (error.response.status == 500) {
            alert("Server Error , Try later");
        }
    })
}


