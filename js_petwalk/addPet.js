$(() => {
    init();
});

const init = async () => {
    $("#id_form").on("submit", (evt) => {
        evt.preventDefault();
        let myUrl = "/pets";
        let ifSend = true;

        //required element in object:
        let newPet = {
            name: $("#id_name").val(),
            type: $("#id_type option:selected").val(),
            dayPlan: $("#id_dayPlan").val(),
            dayPlanLevel: $("#id_dayPlanLevel").val(),
            activityLevel: $("#id_activityLevel").val(),
            foodLevel: $("#id_foodLevel").val()
        }


        //section 1 - if has value add element to object
        if (!$("#formFile").val() == '')
            newPet.img = $("#formFile").val();

        if (!$("#id_gender").val() == '')
            newPet.gender = $("#id_gender option:selected").val();

        if (!$("#id_age").val() == '')
            dataBodyVal.age = $("#id_age").val();

        if (!$("#id_weight").val() == '')
            newPet.weight = $("#id_weight").val();

        if (!$("#id_hobbies").val() == '')
            newPet.hobbies = $("#id_hobbies").val();

        if (!$("#id_bio").val() == '')
            newPet.bio = $("#id_bio").val();
        //end section 1 

        //section 2- chacks valus for reqired elements 
        if (newPet.name == '') {
            $("#id_name").next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.name < 2) {
            $("#id_name").next().next().removeClass("d-none");
            ifSend = false;
        }
        console.log(newPet.type);
        if (newPet.type == 'none') {
            $("#id_type_small").removeClass("d-none");
            ifSend = false;
        }

        if (newPet.weight < 2) {
            $("#id_weight").next().removeClass("d-none");
            ifSend = false;
        }

        if (newPet.dayPlan == '') {
            $("#id_dayPlan").next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.dayPlan < 2) {
            $("#id_dayPlan").next().next().removeClass("d-none");
            ifSend = false;
        }

        if (newPet.dayPlanLevel == '') {
            $("#id_dayPlanLevel").next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.dayPlanLevel < 1) {
            $("#id_dayPlanLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.dayPlanLevel > 10) {
            $("#id_dayPlanLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (newPet.activityLevel == '') {
            $("#id_activityLevel").next().removeClass("d-none");
            ifSend = false;
        }

        else if (newPet.activityLevel < 1) {
            $("#id_activityLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.activityLevel > 10) {
            $("#id_activityLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (newPet.foodLevel == '') {
            $("#id_foodLevel").next().removeClass("d-none");
            ifSend = false;
        }

        else if (newPet.foodLevel < 1) {
            $("#id_foodLevel").next().next().removeClass("d-none");
            ifSend = false;
        }
        else if (newPet.foodLevel > 10) {
            $("#id_foodLevel").next().next().next().removeClass("d-none");
            ifSend = false;
        }

        if (newPet.hobbies > 50) {
            $("#id_hobbies").next().removeClass("d-none");
            ifSend = false;
        }
        //end section 2 


        if (ifSend) {
            axios({
                method: 'POST',
                url: myUrl,
                data: newPet,
                headers: {
                    "x-auth-token": localStorage["token"],
                }
            })
                .then(myData => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${newPet.name} added`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.href = "myPets.html";
                })
                .catch(error => {
                    console.log(error.response);

                    if (error.response.status == 402) {
                        $("#id_name").next().next().next().removeClass("d-none");
                    }
                    if (error.response.data[0].message == '"activityLevel" must be a number') {
                        $("#id_activityLevel").next().next().next().next().removeClass("d-none");
                    }
                    if (error.response.data[0].message == '"foodLevel" must be a number') {
                        $("#id_foodLevel").next().next().next().next().removeClass("d-none");
                    }
                    if (error.response.data[0].message == '"dayPlanLevel" must be a number') {
                        $("#id_dayPlanLevel").next().next().next().next().removeClass("d-none");
                    }
                    if (error.response.status == 400) {
                        alert("400")
                    }
                    if (error.response.status == 500) {
                        alert("Server Error , Try later");
                    }
                })
        }
    })

    $("#id_form .form_div input").on("focus", function () {
        $(this).next().next().next().next().addClass("d-none");
        $(this).next().next().next().addClass("d-none");
        $(this).next().next().addClass("d-none");
        $(this).next().addClass("d-none");
        $("#id_type_small").addClass("d-none");
    })
}


