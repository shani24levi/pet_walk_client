class MyPetClass {
    constructor(_parent, _img, _type, _name, _age, _id) {
        this.parent = _parent;
        this.img = (_img == undefined) ? "https://icon-library.com/images/dog-icon/dog-icon-16.jpg" : _img;
        this.type = _type;
        this.name = _name;
        this.age = (!_age) ? "Live For Ever" : _age;
        this.id = _id;
    }

    render() {
        let newDiv = $("<div class='row p-3 mt-4 justify-content-between btn_section'></div>");
        $(this.parent).append(newDiv);

        $(newDiv).append(`
        <div class="col d-flex justify-content-center align-items-center">
        <img src="${this.img}"
            alt="${this.name}" class="img_pet" style="border: #fff solid; border-radius: 50%; padding: 5%;">
    </div>
    <div class="col-6 justify-content-start">
        <h5 class="pt-4 ml-2" style="color: #727377;">${this.type}</h5>
        <h2 class="ml-2">${this.name}</h2>
        <h5 class="pb-2 ml-2" style="color: #727377;">age : ${this.age}</h5>
    </div>
        `)

        //right btn 
        let btnRight = $(` <div class="col-1 align-self-center">
            <i class="fa fa-chevron-right" style="font-size: 200%; color: #6EA8FF; cursor:pointer" aria-hidden="true"></i>
        </div>`);
        $(newDiv).append(btnRight);

        $(btnRight).on("click", () => {
            localStorage.setItem(`petName`, `${this.name}`);
            localStorage.setItem(`petId`, `${this.id}`);
            window.location.href = "petProfile.html";
        })
    }
}

export default MyPetClass;