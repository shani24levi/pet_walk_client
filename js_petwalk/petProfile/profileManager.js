
export const createPetProfile = (item) => {
  $("main .my_pet").html("");
  (item[0].img == undefined) ?  $("#PetPic").attr("src", "https://icon-library.com/images/dog-icon/dog-icon-16.jpg") : $("#PetPic").attr("src", `${item[0].img}`);

  $("#id_name").html(`${item[0].name}`);
  $("#type").html(`${item[0].type}`);

  (item[0].gender == undefined) ? $("#gender").html(`Bout`) :$("#gender").html(`${item[0].gender}`);
  (item[0].age == undefined) ? $("#age").html(`Forever Young`):$("#age").html(`${item[0].age}`);

  $("#foodLevel").html(`${item[0].foodLevel}`);
  $("#activityLevel").html(`${item[0].activityLevel}`);
  $("#daylyLevel").html(`${item[0].dayPlanLevel}`);

  $("#collapseOne .card-body").html(`${item[0].dayPlan}`);
  (item[0].hobbies == undefined) ? $("#collapseThree .card-body").html('') :  $("#collapseTwo .card-body").html(`${item[0].hobbies}`);
  (item[0].bio == undefined) ? $("#collapseThree .card-body").html('') : $("#collapseThree .card-body").html(`${item[0].bio}`);
}
