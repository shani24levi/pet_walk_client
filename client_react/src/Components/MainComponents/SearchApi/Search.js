import axios from 'axios'
import * as React from 'react'
import Navbar from '../../RepeatingComponents/Navbar';
import SearchIcon from '@material-ui/icons/Search';
import Pet404 from "../Pet404";
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import SearchList from './SearchList';

let dogsImagesArray = [];
let dogsStart = [];
let key = 0


const Search = () => {
    const [dogBreed, setBreed] = React.useState('');
    const [fullArray, setFullArray] = React.useState(false);
    const [dogs, setDogs] = React.useState([]);
    const [err404, setEror404] = React.useState(false);



    React.useEffect(() => {
        if (dogBreed === '') {
            axios({
            method: 'GET',
            url: 'https://dog.ceo/api/breeds/image/random/10',
        })
            .then((data) => {
                if (data.data.status === 'success') {
                    dogsStart = data.data.message;
                    setDogs(data.data.message);
                }
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })
        }
    }, [])

    

    const onClickB = async () => {
        if (dogBreed) {
            await axios({
                method: "GET",
                url: `https://dog.ceo/api/breed/${dogBreed}/images/random/20`
            })
                .then((responseJson) => {
                    if (responseJson.data.status === 'success') {
                        dogsImagesArray = responseJson.data.message;
                        setEror404(false);
                       setFullArray(true);
                    }
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        setEror404(true);
                        setFullArray(false)
                    }
                })
        }
        //if no value is written than don't do anything 
        else return;
    }

    const onClickSelect = async(e) =>{        
        if (e) {
            await axios({
                method: "GET",
                url: `https://dog.ceo/api/breed/${e}/images/random/20`
            })
                .then((responseJson) => {
                    if (responseJson.data.status === 'success') {
                        dogsImagesArray = responseJson.data.message;
                        setEror404(false);
                       setFullArray(true);
                    }
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        setEror404(true);
                        setFullArray(false)
                    }
                })
        }
        //if no value is written than don't do anything 
        else return;

    }

    return (
        <>
            <header className="container-fluid">
                <div className="container">
                    <h1 className="py-4">Pets in the World</h1>
                    <div className="row">
                        <div className="col-8">
                            <form className="search-box my-2">
                                <input type='text' className="search-txt" placeholder="Search types" onChange={(event) => { setBreed(event.currentTarget.value) }} />
                                <SearchIcon onClick={onClickB} className="search-btn" />
                            </form>
                        </div>
                        <div className="col-4 align-self-center">
                            <Select variant="outlined" className="w-100" value={dogBreed} onChange={(event) => { setBreed(event.target.value) }}>
                                <MenuItem selected value='wolfhound' onClick={() => onClickSelect('wolfhound')}  >wolfhound</MenuItem>
                                <MenuItem value='bulldog' onClick={() => onClickSelect('bulldog')} >bulldog</MenuItem>
                                <MenuItem value='setter' onClick={() => onClickSelect('setter')} >setter</MenuItem>
                                <MenuItem value='spaniel' onClick={() => onClickSelect('spaniel')} >spaniel</MenuItem>
                                <MenuItem value='terrier' onClick={() => onClickSelect('terrier')} >terrier</MenuItem>
                                <MenuItem value='hound' onClick={() => onClickSelect('hound')} >hound</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div id="id_gallery" class="row text-center text-lg-left">
                        {
                            err404 ?
                                <Pet404 dogBreed={dogBreed} /> :

                                (!fullArray ?
                                    <SearchList searchList={dogsStart} i={0} />
                                    : 
                                    <SearchList searchList={dogsImagesArray} i={0} />
                                )
                        }

                        
                    </div>
                </div>
            </main>

            <footer> <Navbar namePage={'search'} /> </footer>
        </>
    )
}

export default Search



