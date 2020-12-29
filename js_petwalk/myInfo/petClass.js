import { createPet } from "./petManager.js";
import { } from '../../plugs/lightBox.js';
import { } from '../../plugs/lightBox2.js';
import { } from '../../plugs/lightBox3.js';
import { updatMyInfo } from './appMyInfo.js';

class PetClass {
    constructor(_parent, _img, _type, _name, _age, _dayPlan, _activityLevel, _foodLevel, _dayPlanLevel, _currDayPlanLevel, _currActivityLevel, _currFoodLevel, _i, _ar, _dataLength, _id) {
        this.parent = _parent;
        this.img = (_img == undefined) ? "https://icon-library.com/images/dog-icon/dog-icon-16.jpg" : _img;
        this.type = _type;
        this.name = _name;
        this.age = (!_age) ? "Forever Young" : _age;
        this.dayPlan = _dayPlan;
        this.activityLevel = _activityLevel;
        this.foodLevel = _foodLevel;
        this.dayPlanLevel = _dayPlanLevel;
        this.id = _id;


        this.currDayPlanLevel = (_currDayPlanLevel == undefined) ? 0 : _currDayPlanLevel;
        this.currActivityLevel = (_currActivityLevel == undefined) ? 0 : _currActivityLevel;
        this.currFoodLevel = (_currFoodLevel == undefined) ? 0 : _currFoodLevel;

        this.i = _i;
        this.lenthData = _dataLength - 1;
        this.ar = _ar;

        this.complitDayPlan = this.currDayPlanLevel == 0 ? this.currDayPlanLevel : Math.ceil(this.currDayPlanLevel / (100 / this.dayPlanLevel));
        this.complitActivity = this.currActivityLevel == 0 ? this.currActivityLevel : Math.ceil(this.currActivityLevel / (100 / this.activityLevel));
        this.complitFood = this.currFoodLevel == 0 ? this.currFoodLevel : Math.ceil(this.currFoodLevel / (100 / this.foodLevel));
    }

    render() {
        let newDiv = $("<div class='row p-3 justify-content-between btn_section'></div>");
        $(this.parent).append(newDiv);

        //left btn 
        let btnLeft = $(`<div class="col-1 align-self-center">
            <i class="fa fa-chevron-left" style="font-size: 200%; color: #6EA8FF; cursor:pointer" aria-hidden="true"></i>
            </div>`);
        $(newDiv).append(btnLeft);

        $(btnLeft).on("click", () => {
            if (this.i <= this.lenthData && this.i != 0) {
                console.log(this.ar);
                createPet(this.ar, this.i - 1, this.lenthData + 1);
            }
            if (this.i == 0) {
                createPet(this.ar, this.lenthData, this.lenthData + 1);
            }
            //else dose nothing 
        })

        $(newDiv).append(`
            <div class="col d-flex justify-content-center align-items-center">
                <img src="${this.img}"
                alt="Avatar" class="img_pet" style="border: #fff solid; border-radius: 50%; padding: 5%;">
            </div>
            <div class="col justify-content-end">
                <h5 class="pt-4 pl-2" style="color: #727377;"> ${this.type}</h5>
                <h2 class="pl-2">${this.name}</h2>
                <h5 class="pb-2 pl-2" style="color: #727377;"> age ${this.age}</h5>
            </div>
        `)

        //right btn 
        let btnRight = $(` <div class="col-1 align-self-center">
            <i class="fa fa-chevron-right" style="font-size: 200%; color: #6EA8FF; cursor:pointer" aria-hidden="true"></i>
        </div>`);
        $(newDiv).append(btnRight);

        $(btnRight).on("click", () => {
            if (this.i < this.lenthData && this.i != this.lenthData) {
                createPet(this.ar, this.i + 1, this.lenthData + 1);
            }
            if (this.i == this.lenthData) {
                createPet(this.ar, 0, this.lenthData + 1);
            }
            //else dose nothing 
        })


        let secDiv = $(`<div class='secDiv'></div>`);
        $(this.parent).append(secDiv);

        $(secDiv).append(`<h3 class="mt-4 pb-2">State</h3>`)
        //one:
        let insidDiv = $(`<div class='row p-3 justify-content-between btn_section' style='box-shadow:none'></div>`)
        $(secDiv).append(insidDiv);

        $(insidDiv).append(`<div class="col-8 align-self-center p-2">
            <h4><strong>Today's Plans</strong></h4>
            <h5>${this.complitDayPlan} tasks completed</h5>
        </div>`)

        let pricentDiv = $("<div class='col-4 align-self-center text-center demo'></div>");
        $(insidDiv).append(pricentDiv);

        //pricent btn 
        let btnPricent = $(` 
        <div id='data-light' data-id=${this.id} data-this='currDayPlanLevel' data-name=${this.name} data-src=${this.img} data-alt=${this.i} class="demo-1 align-self-center text-center" data-percent="${this.currDayPlanLevel}"></div>
        `);
        $(pricentDiv).append(btnPricent);

        $(btnPricent).on("click", () => {
            localStorage.setItem(`petName`, `${this.name}`);
            localStorage.setItem(`petId`, `${this.id}`);
            localStorage.setItem(`update`, `currDayPlanLevel`);
            localStorage.setItem(`index`, `${this.i}`);
        })

        //two:
        let insidDiv2 = $("<div class='row p-3 my-3 justify-content-between btn_section' style='box-shadow:none'></div>");
        $(secDiv).append(insidDiv2);

        $(insidDiv2).append(`<div class="col-8 align-self-center p-2">
            <h4><strong>Energy avaliable</strong></h4>
            <h5>${this.complitActivity} activities were completed</h5>
        </div>`)

        let pricentDiv2 = $("<div class='col-4 align-self-center text-center demo'></div>");
        $(insidDiv2).append(pricentDiv2);

        //pricent btn 
        let btnPricent2 = $(` 
               <div id='data-light2' data-id=${this.id} data-this='currDayPlanLevel' data-name=${this.name} data-src=${this.img} data-alt=${this.i} class="demo-1 align-self-center text-center" data-percent="${this.currActivityLevel}"></div>
               `);
        $(pricentDiv2).append(btnPricent2);

        $(btnPricent2).on("click", () => {
            localStorage.setItem(`petName`, `${this.name}`);
            localStorage.setItem(`petId`, `${this.id}`);
            localStorage.setItem(`update`, `currActivityLevel`);
            localStorage.setItem(`index`, `${this.i}`);
        })



        //tree:
        let insidDiv3 = $("<div class='row p-3 justify-content-between btn_section' style='box-shadow:none'></div>");
        $(secDiv).append(insidDiv3);


        $(insidDiv3).append(`<div class="col-8 align-self-center p-2">
        <h4><strong>Daily food habits</strong></h4>
        <h5>${this.complitFood} meals were completed</h5>
        </div>`)

        let pricentDiv3 = $(`<div class='col-4 align-self-center text-center demo'></div>`);
        $(insidDiv3).append(pricentDiv3);


        //pricent btn 
        let btnPricent3 = $(` 
               <div id='data-light3' data-id=${this.id} data-this='currDayPlanLevel' data-name=${this.name} data-src=${this.img} data-alt=${this.i} class="demo-1 align-self-center text-center" data-percent="${this.currFoodLevel}"></div>
               `);
        $(pricentDiv3).append(btnPricent3);

        $(btnPricent3).on("click", () => {
            localStorage.setItem(`petName`, `${this.name}`);
            localStorage.setItem(`petId`, `${this.id}`);
            localStorage.setItem(`update`, `currFoodLevel`);
            localStorage.setItem(`index`, `${this.i}`);
        })


        let walkDiv = $("<div class='col-auto text-center'></div>");
        $(this.parent).append(walkDiv);

        //walk btn 
        let walkBtn = $(` 
        <button id="id_start_walk" type="submit" class="btn btn-lg btns_blue my-4 w-75">Start a
        Play</button>        
        `);
        $(walkDiv).append(walkBtn);

        $(walkBtn).on("click", () => {
            Swal.mixin({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            }).queue([
                {
                    title: 'Where we play?',
                    text: 'Garden, park, house, with friends'
                },
                'Playing time',
                'Energy level'
            ]).then((result) => {
                if (result.value) {
                    const answers = JSON.stringify(result.value)
                    Swal.fire({
                        title: 'All done!',
                        html: `
                    Your Day Play:
                    <pre><code>${answers}</code></pre>
                  `,
                        confirmButtonText: 'Lovely!'
                    })
                }
            //update activity level:
            console.log(result.value[2]);
            if (Number(result.value[2]) >= 1) {
                localStorage.setItem(`petName`, `${this.name}`);
                localStorage.setItem(`petId`, `${this.id}`);
                localStorage.setItem(`update`, `currActivityLevel`);
                localStorage.setItem(`index`, `${this.i}`);
                updatMyInfo(result.value[2]);
            }
            })

        })

        // function set in pet_walk_app in Plangs folder-> jquery.circlechart.js
        // sorce:  https://www.jqueryscript.net/loading/Create-Percentage-Circles-with-jQuery-CSS3-percircle-js.html
        $('.demo-1').percentcircle();


        //lightbox
        $('#data-light2').lightBox2();
        $('#data-light').lightBox();
        $('#data-light3').lightBox3();
    }
}

export default PetClass;