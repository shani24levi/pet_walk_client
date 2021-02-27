import * as React from 'react'
import { NavLink } from 'react-router-dom'


const Loading = () => {
    return (
        <React.Fragment>
            <div></div>
            <div className="text-center mr-3 w-100">
                <img src="images/loading-dog.gif" width="200" />
            </div>
            <div></div>
        </React.Fragment>
    );
}

export default Loading