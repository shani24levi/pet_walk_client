import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { MenuItem, TextField } from '@material-ui/core';
import '../../App.css'
import { Select } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Joi from 'joi-browser';

const AddPet = (props) => {
    const [dogType, setDogType] = React.useState('none')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState()//was empty now starting with 1
    const [dogWeight, setDogWeight] = React.useState()//was empty now starting with 1
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState()//was number switched to string
    const [foodLevel, setFoodLevel] = React.useState()//was number switched to string
    const [dayPlanLevel, setDayPlanLevel] = React.useState()//was number switched to string
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg, setDogImg] = React.useState("https://icon-library.com/images/dog-icon/dog-icon-16.jpg")

    const [errors, setError] = React.useState({});

    const joiSchema = {
        name: Joi.string().min(2).max(50).required(),
        type: Joi.string().min(2).max(50).required(),
        age: Joi.number(),
        weight: Joi.number().min(1).max(200),
        gender: Joi.string().required(),
        activityLevel: Joi.number().min(1).max(10).required(),
        foodLevel: Joi.number().min(1).max(10).required(),
        dayPlanLevel: Joi.number().min(1).max(10).required(),
        dayPlan: Joi.string().min(2).required(),
        hobbies: Joi.string().max(50),
        bio: Joi.string(),
        img: Joi.any()
    }

    const handleClick = (event) => {
        event.preventDefault();

        let our_data = {
            name: dogName,
            age: dogAge,
            weight: dogWeight,
            type: dogType,
            gender: dogGender,
            activityLevel: activityLevel,
            foodLevel: foodLevel,
            dayPlanLevel: dayPlanLevel,
            dayPlan: dogPlan,
            img: dogImg
        }
        console.log(our_data);
        let errors = {};

        //check valid form inputs
        const valid = Joi.validate(our_data, joiSchema, {
            abortEarly: false
        });
        if (valid.error) {
            valid.error.details.forEach(err => {
                console.log(err.message);
                if (err.message === '"name" is not allowed to be empty' || err.message === '"name" length must be at least 2 characters long') {
                    errors["name"] = "* Name is required.";
                }
                if (err.message === '"activityLevel" is required') {
                    errors["activityLevel"] = "* Required.";
                }
                if (err.message === '"foodLevel" is required') {
                    errors["foodLevel"] = "* Required.";
                }
                if (err.message === '"dayPlanLevel" is required') {
                    errors["dayPlanLevel"] = "* Required.";
                }
                if (err.message === '"dayPlan" is not allowed to be empty') {
                    errors["dayPlan"] = "* Required.";
                }
                if (err.message === '"dayPlan" length must be at least 2 characters long') {
                    errors["dayPlan"] = "* Too short.";
                }
                if (err.message === '"dayPlanLevel" must be larger than or equal to 1') {
                    errors["dayPlanLevel"] = "* Too low.";
                }
                if (err.message === '"foodLevel" must be larger than or equal to 1') {
                    errors["foodLevel"] = "* Too low.";
                }
                if (err.message === '"activityLevel" must be larger than or equal to 1') {
                    errors["activityLevel"] = "* Too low.";
                }
                if (err.message === '"dayPlanLevel" must be less than or equal to 10') {
                    errors["dayPlanLevel"] = "* Limit up to 10.";
                }
                if (err.message === '"activityLevel" must be less than or equal to 10') {
                    errors["activityLevel"] = "* Limit up to 10.";
                }
                if (err.message === '"foodLevel" must be less than or equal to 10') {
                    errors["foodLevel"] = "* Limit up to 10.";
                }
                if (err.message === '"name" length must be at least 2 characters long') {
                    errors["name"] = "* Too short";
                }
            })
            setError(errors);
            return;
        }
        //ok:
        else {
            const activityLevelAsNum = Number(activityLevel);
            const foodLevelAsNum = Number(foodLevel);
            const dayPlanLvlAsNum = Number(dayPlanLevel);

            const dogData = {
                "name": dogName,
                "gender": dogGender,
                "activityLevel": activityLevelAsNum,
                "foodLevel": foodLevelAsNum,
                "dayPlan": dogPlan,
                "dayPlanLevel": dayPlanLvlAsNum,
                "img": dogImg
            }
            //if it's undefined it's not sent for chaks validations 
            if (dogAge !== undefined) dogData.age = dogAge;
            if (dogWeight !== undefined) dogData.weight = dogWeight;
            if (hobbies !== "") dogData.hobbies = hobbies;
            if (bio !== "") dogData.bio = bio;
            if (dogType !== 'none') dogData.type = dogType;

            const formData = new FormData();

            for(const key of Object.keys(dogData)){
                formData.append(key,dogData[key])
            }

            console.log(formData);
            console.log(dogData);
            axios({
                method: 'post',
                url: 'https://petwalkapp.herokuapp.com/pets',
                headers: {
                    "x-auth-token": localStorage["token"],
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((data) => {
                    console.log(data.data[0]);
                    window.location.href = "/myPets";
                })
                .catch((error) => {
                    console.log(error.response);
                    let errors = {};
                    
                    if (error.response.data[0].message === '"type" is required') {
                        errors["type"] = "* Type is required";
                    }
                    if (error.response.status === 500) {
                        alert("Server Error , Try later");
                    }
                    setError(errors);
                    return;
                })
        }
    }

    return (
        <>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link to="/myPets" className="py-2" ><ArrowBackIcon style={{ fontSize: 'xx-large', color: 'black' }}></ArrowBackIcon></Link>
                        <h1 className="py-2">Add Pet</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="add_form">
                        <div className="text-center">
                            <img src={"https://i.pinimg.com/originals/f6/af/e8/f6afe8801e93598525796c47afd9f3c0.png"} alt="PetPic" style={{ maxWidth: '30%', borderRadius: '50%', backgroundColor: 'azure' }} />
                        </div>

                        <div className="col-auto text-center">
                            <input className="btn btn-primary btn-lg my-4 w-75" type="file" onChange={(event) => { setDogImg(event.target.files[0]) }} />
                        </div>
                    </div>

                    <form>
                        <TextField id="outlined-basic" label="Name" variant="outlined" className="w-100" onChange={(event) => { setDogName(event.target.value) }} />
                        <div className="text-danger mb-5">{errors.name}</div>
                        <Select variant="outlined" value={dogType} onChange={(event) => { setDogType(event.target.value) }} className="w-100">
                            <MenuItem selected value='Cute Type' >dog type</MenuItem>
                            <MenuItem value='German Shephard' >German Shephard</MenuItem>
                            <MenuItem value='Bulldog' >Bulldog</MenuItem>
                            <MenuItem value='Golden Retriever' >Golden Retriever</MenuItem>
                            <MenuItem value='Wienner' >Wienner</MenuItem>
                            <MenuItem value='Shitzu' >Shitzu</MenuItem>
                            <MenuItem value='st. bernard' >St. Bernard</MenuItem>
                        </Select>
                        <div className="text-danger mb-5">{errors.type}</div>

                        <Select variant="outlined" className="w-100" value={dogGender} onChange={(event) => { setDogGender(event.target.value) }}>
                            <MenuItem selected value='Male' >Male</MenuItem>
                            <MenuItem value='Female' >Female</MenuItem>
                        </Select>
                        <div className="text-danger mb-5">{errors.gender}</div>


                        <div className="row justify-content-around" >
                            <TextField variant="outlined" label='Age' className="mb-5" type='number' value={dogAge} onChange={(event) => { setDogAge(event.target.value) }} />
                            <div className=" text-danger mb-5 w-50">{errors.age}</div>
                            <TextField variant="outlined" label='Weight' min={1} className="mb-5" type='number' placeholder='KGs' value={dogWeight} onChange={(event) => { setDogWeight(event.target.value) }} />
                            <div className=" text-danger mb-5 w-50">{errors.weight}</div>
                        </div>
                        <TextField variant="outlined" multiline={true} rows={2} className="w-100" type='text' value={dogPlan} label='Daily plan' onChange={(event) => { setDogPlan(event.target.value) }} />
                        <div className="text-danger mb-5">{errors.dayPlan}</div>
                        <div className="row justify-content-around" >
                            <div className="col">
                                <TextField variant="outlined" label='DayPlan Level' max={10} min={1} className="w-100" type='number' value={dayPlanLevel} onChange={(event) => { setDayPlanLevel(event.target.value) }} />
                                <div className="text-danger mb-5">{errors.dayPlanLevel}</div>
                            </div>
                            <div className="col">
                                <TextField variant="outlined" label='Food Level' max={10} min={1} className="w-100" type='number' value={foodLevel} onChange={(event) => { setFoodLevel(event.target.value) }} />
                                <div className="text-danger mb-5">{errors.foodLevel}</div>
                            </div>
                            <div className="col">
                                <TextField variant="outlined" label='Activity Level' max={10} min={1} className="w-100" type='number' value={activityLevel} onChange={(event) => { setActivityLevel(event.target.value) }} />
                                <div className="text-danger mb-5">{errors.activityLevel}</div>
                            </div>
                        </div>
                        <TextField variant="outlined" multiline={true} rows={2} id="plan-textfield" className="w-50 mb-5" type='text' value={hobbies} label='Hobbies...' onChange={(event) => { setHobbies(event.target.value) }} />
                        <div className="text-danger mb-5">{errors.hobbies}</div>
                        <TextField variant="outlined" multiline={true} rows={2} id="plan-textfield" className="w-50 mb-5" type='text' value={bio} label='Bio...' onChange={(event) => { setBio(event.target.value) }} />
                        <div className="text-danger mb-5">{errors.bio}</div>

                        <button id='id_start' onClick={handleClick} className="col justify-content-center p-2 w-100" style={{ marginBottom: '100px' }}>Add Pet</button>
                    </form>
                </div>
            </main>
            <footer> <Navbar namePage={'myPets'} /> </footer>


        </>
    )
}



export default AddPet