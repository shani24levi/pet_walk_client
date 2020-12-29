import { doApiGet } from "../services/apiSer.js";
import { getLocalStorag } from "./petProfile/appProfile.js";


$(() => {
    init()
})

const setFormVals = (data) => {
    let dataBody = {
        name: $("#id_name").val(data[0].name),
        img: (data[0].img==undefined) ? $(".edit_form img").attr("src", "https://icon-library.com/images/dog-icon/dog-icon-16.jpg") : $(".edit_form img").attr("src", `${data[0].img}`),
        type: $("#id_type option:selected").val(data[0].type),
        gender: $("#id_gender option:selected").val(data[0].gender),
        age: $("#id_age").val(data[0].age),
        weight: $("#id_weight").val(data[0].weight),
        dayPlan: $("#id_dayPlan").val(data[0].dayPlan),
        dayPlanLevel: $("#id_dayPlanLevel").val(data[0].dayPlanLevel),
        activityLevel: $("#id_activityLevel").val(data[0].activityLevel),
        foodLevel: $("#id_foodLevel").val(data[0].foodLevel),
        hobbies: $("#id_hobbies").val(data[0].hobbies),
        bio: $("#id_bio").val(data[0].bio)
    }
}


const init = async () => {
    $("main #loading").html(`
    <div></div>
    <div class="text-center mr-3 w-100">
      <img src="images/loading-dog.gif" width="200" >    
      </div>
      <div></div>`);

    let pet = getLocalStorag();
    //set val from db into form vals:
    let url = `/pets/ofUser/${pet.id}`;
    // let url = `http://localhost:5000/pets/ofUser/${pet.id}`;
    let data = await doApiGet(url);
    console.log(data);
    setFormVals(data);

    $("main #loading").html(``);


    $("#id_form").on("submit", (evt) => {
        console.log("works");
        evt.preventDefault();
        let myUrl = "/pets";
        let ifSend = true;

        //required only set in object:
        let dataBodyVal = {
            id: pet.id, //requird for edting in server 
            name: $("#id_name").val(),
            type: $("#id_type").val(),
            dayPlan: $("#id_dayPlan").val(),
            dayPlanLevel: $("#id_dayPlanLevel").val(),
            activityLevel: $("#id_activityLevel").val(),
            foodLevel: $("#id_foodLevel").val()
        }

        //section 1 - if has value add element to object
        if (!$("#formFile").val() == '')
            dataBodyVal.img = $("#formFile").val();

        if (!$("#id_gender").val() == '')
            dataBodyVal.gender = $("#id_gender").val();

        if (!$("#id_age").val() == '')
            dataBodyVal.age = $("#id_age").val();

        if (!$("#id_weight").val() == '')
            dataBodyVal.weight = $("#id_weight").val();

        if (!$("#id_hobbies").val() == '')
            dataBodyVal.hobbies = $("#id_hobbies").val();

        if (!$("#id_bio").val() == '')
            dataBodyVal.bio = $("#id_bio").val();
        //end section 1 


        //section 2- chacks valus for reqired elements
        if (dataBodyVal.name == '') {
            $("#id_name").next().removeClass("d-none");
            ifSend = false ;
        }

        if (dataBodyVal.name < 2) {
            $("#id_name").next().next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.type == '') {
            $("#id_type").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.weight < 2) {
            $("#id_weight").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.dayPlan == '') {
            $("#id_dayPlan").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.dayPlan < 2) {
            $("#id_dayPlan").next().next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.dayPlanLevel == '') {
            $("#id_dayPlanLevel").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.dayPlanLevel < 1) {
            $("#id_dayPlanLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        if (dataBodyVal.dayPlanLevel > 10) {
            $("#id_dayPlanLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.activityLevel == '') {
            $("#id_activityLevel").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.activityLevel < 1) {
            $("#id_activityLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        if (dataBodyVal.activityLevel > 10) {
            $("#id_activityLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.foodLevel == '') {
            $("#id_foodLevel").next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.foodLevel < 1) {
            $("#id_foodLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        if (dataBodyVal.foodLevel > 10) {
            $("#id_foodLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (dataBodyVal.hobbies > 50) {
            $("#id_hobbies").next().removeClass("d-none");
            ifSend = false;
        }
        //end section 2 


        if (ifSend) {
            axios({
                method: 'PUT',
                url: myUrl,
                data: dataBodyVal,
                headers: {
                    "x-auth-token": localStorage["token"],
                }
            })
                .then(myData => {
                    window.location.href = "petProfile.html";
                })
                .catch(error => {
                    console.log(dataBodyVal);
                    console.log(error.response);

                    if (error.response.status == 401) {
                        alert('ser is not the pets owner,Unauthorized to edit');
                    }
                    if (error.response.data[0].message == '"type" must be a string') {
                        $("#id_type").next().removeClass("d-none");
                    }
                    if (error.response.status == 500) {
                        alert("Server Error , Try later");
                    }
                })
        }
    })

    $("#id_form .form_div input").on("focus", function () {
        $(this).next().next().next().addClass("d-none");
        $(this).next().next().addClass("d-none");
        $(this).next().addClass("d-none");
    })
}