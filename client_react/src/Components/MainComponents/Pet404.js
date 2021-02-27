import * as React from 'react'
import { Button, Input } from '@material-ui/core';
import '../../App.css';


const Pet404 = (props) => {
    const {dogBreed} = props;
    return (
        <React.Fragment>
            <div class="col text-center d-block mb-4">
                <img src="images/404.PNG" width="300" />
                <h1>Oops, No pet found by type: <strong>{dogBreed}</strong> </h1> 
            </div>
        </React.Fragment>
    );
}
export default Pet404