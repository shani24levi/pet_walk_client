import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { MenuItem, TextField } from '@material-ui/core';
import '../../App.css'
import { Select } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';



const EditPet = (props) => {
    console.log(props.location.state);
    if (props.location.state !== null) {
        console.log(props.location.state.pet_id);
    }
    const [dogType, setDogType] = React.useState('none')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState('')
    const [dogWeight, setDogWeight] = React.useState('')
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState(null)
    const [foodLevel, setFoodLevel] = React.useState(null)
    const [dayPlanLevel, setDayPlanLevel] = React.useState(null)
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg, setDogImg] = React.useState("")
    const [dogImgUpdate, setUpdateImg] = React.useState("")


    React.useEffect(() => {
        axios({
            method: 'GET',
            url: `https://petwalkapp.herokuapp.com/pets/ofUser/${props.location.state.pet_id}`,
            headers: {
                "x-auth-token": localStorage["token"],
                "Content-Type": "multipart/form-data"
            }
        })
            .then((data) => {
                const dogInfo = data.data[0]
                console.log(dogInfo)
                setDogName(dogInfo.name)
                setDogType(dogInfo.type)
                setDogAge(dogInfo.age)
                setDogWeight(dogInfo.weight)
                setDogGender(dogInfo.gender)
                setDogPlan(dogInfo.dayPlan)
                setActivityLevel(dogInfo.activityLevel)
                setFoodLevel(dogInfo.foodLevel)
                setDayPlanLevel(dogInfo.dayPlanLevel)
                setHobbies(dogInfo.hobbies)
                setBio(dogInfo.bio)
                setDogImg(dogInfo.img)

                return
            })
            .catch((err) => {
                if (err)
                    console.log(err)

            })
    }, [])

    const [errors, setError] = React.useState({});

    const joiSchema = {
        id: Joi.string().required(),
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


    let dogData = {};
    const editPet = async (event) => {
        // event.preventDefault();

        dogData = {
            id: props.location.state.pet_id,
            name: dogName,
            type: dogType,
            age: dogAge,
            weight: dogWeight,
            gender: dogGender,
            activityLevel: activityLevel,
            foodLevel: foodLevel,
            dayPlan: dogPlan,
            dayPlanLevel: dayPlanLevel,
            hobbies: hobbies,
            bio: bio,
            img: dogImgUpdate
        }

        console.log(dogData);
        let errors = {};

        //chack valid form inputs
        const valid = Joi.validate(dogData, joiSchema, {
            abortEarly: false
        });

        if (valid.error) {
            valid.error.details.forEach(err => {
                console.log(err.message);
                if (err.message === '"name" is not allowed to be empty' || err.message === '"name" length must be at least 2 characters long') {
                    errors["name"] = "* Name is required.";
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
                "id": props.location.state.pet_id,
                "name": dogName,
                "gender": dogGender,
                "type": dogType,
                "activityLevel": activityLevelAsNum,
                "foodLevel": foodLevelAsNum,
                "dayPlan": dogPlan,
                "dayPlanLevel": dayPlanLvlAsNum,
                "img": dogImgUpdate
            }
            //if it's undefined it's not sent for chaks validations 
            if (dogAge !== undefined) dogData.age = dogAge;
            if (dogWeight !== undefined) dogData.weight = dogWeight;

            const formData = new FormData();
            for (const key of Object.keys(dogData)) {
                formData.append(key, dogData[key])
            }


            console.log(dogData);
            await axios({
                method: 'PUT',
                url: 'https://petwalkapp.herokuapp.com/pets',
                headers: {
                    "x-auth-token": localStorage["token"],
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err.response);

                    if (err)
                        console.log("problem with updating the dog's info: " + err)
                })
        }
    }

    const setImgShow = async (event) => {
        const dogData = {
            "name": "new img",
            "img": event.target.files[0],
        }

        const formData = new FormData();
        for (const key of Object.keys(dogData)) {
            formData.append(key, dogData[key])
        }

        console.log(dogData);
        await axios({
            method: 'post',
            url: 'https://petwalkapp.herokuapp.com/pets/file',
            headers: {
                "x-auth-token": localStorage["token"],
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
            .then((data) => {
                console.log(data);
                let myIMG = `https://petwalkapp.herokuapp.com/${data.data}`;
                setDogImg(myIMG);
                setUpdateImg(event.target.files[0]);
            })
            .catch((err) => {
                console.log(err.response);
                if (err)
                    console.log("problem with updating the dog's info: " + err)
            })

    }

    return (
        <>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <h1 className="py-2">Edit Pet</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="add_form">
                        <div className="text-center">
                            <img src={dogImg} alt="PetPic" style={{ maxWidth: '30%', borderRadius: '50%', backgroundColor: 'azure' }} />
                        </div>

                        <div className="col-auto text-center">
                            <input className="btn btn-primary btn-lg my-4 w-75" type="file" onChange={setImgShow} />
                        </div>
                    </div>

                    <form>
                        <TextField id="outlined-basic" value={dogName} label="Name" variant="outlined" className="w-100" onChange={(event) => { setDogName(event.target.value) }} />
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
                            <TextField variant="outlined" label='Age' className="mb-5" type='number' value={Number(dogAge)} onChange={(event) => { setDogAge(event.target.value) }} />
                            <div className="text-danger mb-5">{errors.age}</div>
                            <TextField variant="outlined" label='Weight' min={1} className="mb-5" type='number' placeholder='KGs' value={dogWeight} onChange={(event) => { setDogWeight(event.target.value) }} />
                            <div className="text-danger mb-5">{errors.weight}</div>
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
                        <TextField variant="outlined" multiline={true} rows={2} id="plan-textfield" className="w-50 mb-5" type='text' value={bio} label='Bio...' onChange={(event) => { setBio(event.target.value) }} />
                        <Link to={{ pathname: "/petProfile", state: { edited: true, pet_id: props.location.state.pet_id, name: dogName, type: dogType, gender: dogGender, age: dogAge, bio: bio, hobbies: hobbies, weight: dogWeight, dogWeight, dogPlan: dogPlan, activityLevel: activityLevel, foodLevel: foodLevel, dayPlanLevel: dayPlanLevel, dogImg: dogImg } }} >
                            <button id='id_start' onClick={editPet} className="col justify-content-center p-2 w-100" style={{ marginBottom: '100px' }}>Edit Pet</button>
                        </Link>
                    </form>
                </div>
            </main>
            <footer> <Navbar namePage={'myPets'} /> </footer>
        </>
    )
}



export default EditPet