import { Button } from '@material-ui/core'
import * as React from 'react';
import '../../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import Joi from 'joi-browser';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState(null);
    const [errors, setError] = React.useState({});


    const joiSchema = {
        email: Joi.string().email().required(),
        pass: Joi.string().required()
    }

    const handleClick = (event) => {
        event.preventDefault();

        const our_data = {
            email: email,
            pass: pass,
        }
        let errors = {};

        //check valid form inputs
        const valid = Joi.validate(our_data, joiSchema, {
            abortEarly: false
        });
        if (valid.error) {
            valid.error.details.forEach(err => {
                console.log(err.message);
                if (err.message === '"email" is not allowed to be empty') {
                    errors["email"] = "* Email is required.";
                }
                else if (err.message === '"email" must be a valid email') {
                    errors["email"] = "* Invalid Email";
                }
                if (err.message === '"pass" is not allowed to be empty') {
                    errors["pass"] = "* Password is required.";
                }
            })
            setError(errors);
            return;
        }
        //ok:
        else {
            axios({
                method: 'POST',
                url: 'https://petwalkapp.herokuapp.com/users/login',
                data: {
                    "email": email,
                    "pass": pass
                }
            })
                .then((data) => {
                    console.log(data.data.token);
                    localStorage.setItem("token", data.data.token);
                    window.location.href = "/myInfo";
                })
                .catch((error) => {
                    console.log(error.response);
                    let errors = {};
                    if (error.response.status === Number(401)) {
                        errors["email"] = "* Email not found";
                    }
                    if (error.response.status === Number(400)) {
                        console.log(error.response.status);
                        errors["psss"] = "* Password incorrect";
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
        <main className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="text-center">
                            <h1 className=" m-4 pt-4">Login</h1>
                            <div style={{ maxWidth: '50px', maxheight: '50px', backgroundColor: '#ffffff', borderRadius: '50%' }}>
                            </div>
                            <img src="https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg"
                                alt="Avatar" style={{ maxWidth: '30%', borderRadius: '50%' }} />
                        </div>

                        <form>
                            <div className="form_div pb-4 pt-4">
                                <label>Email:</label>
                                <input type="text" id="id_email" className="form-control form-control-lg" onChange={(event) => { setEmail(event.target.value) }}
                                    style={{ borderColor: '#ffffff' }} />
                                <div className="text-danger">{errors.email}</div>
                            </div>
                            <div className="form_div pb-2">
                                <label>Password:</label>
                                <input type="password" id="id_pass" className="form-control form-control-lg" onChange={(event) => { setPass(event.target.value) }}
                                    style={{ bordercolor: '#ffffff' }} />
                                <div className="text-danger">{errors.pass}</div>
                            </div>
                            <Button onClick={handleClick} className="btn btn-lg btn-block btns my-4 w-100">Login</Button>
                        </form>

                        <div className="pt-4 justify-content-center text-center">
                            <div className="row p-3 justify-content-center">
                                <div className="col-4" style={{ backgroundColor: '#727377', height: '3px' }}> </div>
                            </div>
                            <p className="pt-2">Don't have an Account! <NavLink to='/register'>Sign Up Here</NavLink></p>
                            <p>Forgot <NavLink to='/helpPage'>Password?</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login
