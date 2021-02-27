import * as React from 'react';
import '../../../App.css';

const SearchItem = (props) => {
    const { i } = props;

    return (
        <React.Fragment>
            <div key={i} className="col-lg-3 col-md-4 col-6 d-block mb-4 h-100 gallery">
                <img className="img-fluid img-thumbnail" style={{ marginTop: '10px', width: 200, height: 200 }} src={i} alt='dog image' />
            </div>
        </React.Fragment>
    )
}

export default SearchItem