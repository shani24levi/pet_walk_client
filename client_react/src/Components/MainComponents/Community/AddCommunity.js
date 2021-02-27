import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';
import Joi from 'joi-browser';


const AddCommunity = () => {
    const [type, setType] = React.useState('')
    const [title, setTitle] = React.useState('');
    const [file, setFile] = React.useState('');
    const [dog, setDog] = React.useState([]);
    const [selcted, setPetSelcte] = React.useState('');


    const [errors, setError] = React.useState({});
    const joiSchema = {
        img: Joi.any(),
        title: Joi.string().required(),
        type: Joi.string(),
         pet_id: Joi.any()
    }

    const handleClick = (event) => {
        event.preventDefault();
        let our_data = {
            img: file,
            title: title,
            type: type,
            pet_id: selcted
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
                if (err.message === '"img" is not allowed to be empty') {
                    errors["img"] = "* Img is required.";
                }
                if (err.message === '"title" is not allowed to be empty') {
                    errors["title"] = "* title is required.";
                }
                if (err.message === '"type" is not allowed to be empty') {
                    errors["type"] = "* type is required.";
                }
                if (err.message === '"title" is required') {
                    errors["title"] = "* Required.";
                }
                if (err.message === '"title" length must be at least 2 characters long') {
                    errors["title"] = "* Too short.";
                }
            })
            setError(errors);
            return;
        }
        //ok:
        else {
            const dogData = {
                "img": file,
                "title": title,
            }
            //if it's undefined it's not sent for chaks validations 
            if (type !== undefined) dogData.type = type;
            if (selcted !== undefined) dogData.pet_id = selcted;

            const formData = new FormData();
            for(const key of Object.keys(dogData)){
                formData.append(key,dogData[key])
            }

            console.log(dogData);
            axios({
                method: 'post',
                url: 'https://petwalkapp.herokuapp.com/socialNetworks',
                headers: {
                    "x-auth-token": localStorage["token"],
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((data) => {
                    console.log(data.data[0]);
                    window.location.href = "/myCommunity";
                })
                .catch((error) => {
                    console.log(error.response);
                    let errors = {};
                    if (error.response.data[0].message === '"type" is required') {
                        errors["type"] = "* Type is required";
                    }
                    if (error.response.data[0].message === '"title" length must be at least 2 characters long') {
                        errors["title"] = "* title is too short";
                    }
                    if (error.response.status === 500) {
                        alert("Server error, try later");
                    }
                    setError(errors);
                    return;
                })
        }
    }

    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'https://petwalkapp.herokuapp.com/pets/ofUser',
            headers: {
                "x-auth-token": localStorage["token"],
                "Content-Type": "multipart/form-data"
            }
        })
            .then((data) => {
                console.log(data.data);
                setDog(data.data);
                return;
            })
            .catch((err) => {
                console.log(err.response);
                alert('Sorry Something went wrong');
                return;
            })
    }, [])

    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link className="py-4" to="/mycommunity"><ArrowBackIcon style={{ fontSize: 'xx-large', color: 'black' }}></ArrowBackIcon></Link>
                        <h1 className="py-4">Add Community</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="add_form">
                        <div className="text-center">
                            <img src="https://i.pinimg.com/originals/f6/af/e8/f6afe8801e93598525796c47afd9f3c0.png" alt="PetPic" style={{ maxWidth: '30%', borderRadius: '50%', backgroundColor: 'azure' }} />
                        </div>
                    </div>

                    <form>
                        <div className="col-auto text-center">
                            <input className="btn btn-primary btn-lg my-4 w-75" type="file" onChange={(event) => { setFile(event.target.files[0]) }} />
                            <div className="text-danger mb-5">{errors.img}</div>
                        </div>

                        <TextField id="outlined-basic" label="Title" value={title} onChange={(event) => { setTitle(event.target.value) }} variant="outlined" className="w-100 mb-2" />
                        <div className="text-danger mb-5">{errors.title}</div>

                        <Select id="outlined-basic" variant="outlined" label="Type" value={type} onChange={(event) => { setType(event.target.value) }} className="w-100 mb-2">
                            <MenuItem selected value='Amazing day' >Amazing day</MenuItem>
                            <MenuItem value='Friends forever' >Friends forever</MenuItem>
                            <MenuItem value='energies' >Discharges energies</MenuItem>
                            <MenuItem value='Napping' >Napping</MenuItem>
                            <MenuItem value='Fun' >Fun games</MenuItem>
                            <MenuItem value='Happy' >Happy and jolly</MenuItem>
                            <MenuItem value='vacation' >On a vacation</MenuItem>
                        </Select>
                        <div className="text-danger mb-5">{errors.type}</div>

                        <Select className="w-100 mb-5" value={selcted} onClick={(event) => { setPetSelcte(event.target.value) }}
                            id="outlined-basic" variant="outlined" label="dog"
                        >
                            {dog.map((option) => (
                                <MenuItem key={option._id} value={option._id} onClick={(event) => { setPetSelcte(event.target.value) }} >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <button id='id_start' onClick={handleClick} className="col justify-content-center p-2 w-100" style={{ marginBottom: '100px' }}>Add
                        </button>
                    </form>
                </div>
            </main>
            <footer> <Navbar namePage={'community'} /> </footer>

        </React.Fragment >
    );
}

export default AddCommunity