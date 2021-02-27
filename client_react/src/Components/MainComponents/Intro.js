import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../App.css';


const Intro = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row justify-content-center">
                    <img className="d-flex justify-content-center p-4" style={{maxWidth: '100%'}} src="images/logo.PNG" alt="pet walk logo" />
                </div>
                <div className="row justify-content-center">
                    <img className="col-10 justify-content-center p-4" src="images/dogWalker.PNG" alt="dog walker girl" />
                </div>

                <button id='id_start' className="col-10 justify-content-center p-2 m-4 w-100 " ><NavLink to='/login'>
                    Let's Go
                </NavLink>
                </button>
            </div>
        </div>
    )
}

export default Intro