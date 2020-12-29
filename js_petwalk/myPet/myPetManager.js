import MyPetClass from "./myPetClass.js";

export const createMyPets = (_arr) => {
  $("main .my_pets").html("");

  _arr.map(item => {
    let pet = new MyPetClass("main .my_pets",item.img ,item.type ,item.name ,item.age, item._id);
    pet.render();
  })
}
