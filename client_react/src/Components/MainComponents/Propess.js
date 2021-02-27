import * as React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import Navbar from '../RepeatingComponents/Navbar';




const Propess = () => {
    return (
        <React.Fragment>
            <div class="col text-center d-block mb-4">
                <img src="images/404.PNG" width="400" alt="404" />
                <h1><strong>SORRY</strong> </h1> 
                <h4><strong>In Process....</strong> </h4> 

                <Link to="\myInfo" ><div className='col-auto text-center' style={{ marginBottom: '100px' }}>
                    <button className="btnStyle btn-lg btns_blue mt-4 w-75">Back to HomePage</button>
                </div>
                </Link>
            </div>

            <footer> <Navbar namePage={'settings'} /> </footer>

        </React.Fragment>
    );
}
export default Propess