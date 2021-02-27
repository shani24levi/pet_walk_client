import * as React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import '../../../App.css';
import SearchClass from '../../RepeatingComponents/SearchClass';
import CommunityList from './CommunityList';


const Community = () => {
    const [communities, setCommunities] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [search, setSearch] = React.useState(''); 

    const onSearch = (search) => {
        console.log(search);
        setSearch(search.toLowerCase() );
    };

    React.useEffect(() => {
        //get all 
        axios({
            method: 'GET',
            url: 'https://petwalkapp.herokuapp.com/socialNetworks'
        })
            .then((data) => {
                console.log(data.data);
                setCommunities(data.data);
                setData(true);
                return;
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })

    }, [])

    const communityList = communities.filter(todo => todo.title.toString().toLowerCase().includes(search));
    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="row justify-content-between">
                        <h1 className="col py-4">Community</h1>
                        <Link to="/myCommunity" className="col align-self-center justify-content-end "><button type="button" className="btn btn-outline-info ">MyCommunity</button></Link>
                    </div>
                    <SearchClass onSearch={onSearch}/>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="row justify-content-center" style={{ marginBottom: '100px' }}>
                        {data ? <CommunityList page={'community'} communities={communities} communityList={communityList}/> : <Loading />}
                    </div>
                </div>
            </main>
            <footer> <Navbar namePage={'community'} /> </footer>
        </React.Fragment>
    )
}

export default Community