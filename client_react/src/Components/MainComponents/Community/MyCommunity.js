import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import SearchClass from '../../RepeatingComponents/SearchClass';
import CommunityList from './CommunityList';
import Swal from 'sweetalert2';



const MyCommunity = () => {
    const [communities, setCommunities] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [search, setSearch] = React.useState('');
    const [dogImg, setDogImg] = React.useState("https://icon-library.com/images/dog-icon/dog-icon-16.jpg")

    const onSearch = (search) => {
        setSearch(search.toLowerCase());
    };

    React.useEffect(() => {
        //get users only   
        axios({
            method: 'GET',
            url: 'https://petwalkapp.herokuapp.com/socialNetworks/ofUser',
            headers: {
                "x-auth-token": localStorage["token"],
            }
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


    const deleteItem = (deleteId) => {
        console.log(deleteId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //delete from db:
                axios({
                    method: 'DELETE',
                    url: `https://petwalkapp.herokuapp.com/socialNetworks/${deleteId}`,
                    headers: {
                        "x-auth-token": localStorage["token"]
                    }
                })
                    .then(myData => {
                        Swal.fire(
                            'Deleted!',
                            'Your Community has been deleted.',
                            'success'
                        )
                        //set state:
                        setCommunities(prevState => prevState.filter(({ _id }) => _id !== deleteId));
                        return;
                    })
                    .catch(error => {
                        console.log(error.response);
                        if (error.response.status === Number(401)) {
                            alert("Pet is not found");
                        }
                        if (error.response.status === 500) {
                            alert("Server error, try later");
                        }
                        return;
                    })
            }
        })
        
    };


    const editItem = async (editId) => {
        console.log(editId);
        //elements
        let dataBodyVal = {
            img: '',
            type: '',
            title: '',
        }
        //lightbox form :

        const communityItem = communities.filter(item => item._id === editId);
        console.log(communityItem);
        if (communityItem[0].type === undefined) communityItem[0].type = "";

        const { value: formValues } = await Swal.fire({
            title: 'Edit Community',
            html:
                `<input id="swal-input0" type="file" class="swal2-input" value=${communityItem[0].img} >` +
                `<input id="swal-input1" class="swal2-input" value=${communityItem[0].title}>` +
                `<input id="swal-input2" class="swal2-input" placeholder="Type" value=${communityItem[0].type}>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    dataBodyVal.img = document.getElementById('swal-input0').files[0],
                    dataBodyVal.title = document.getElementById('swal-input1').value,
                    dataBodyVal.type = document.getElementById('swal-input2').value
                ]
            }
        })

        //save in db
        if (formValues) {
            const dogData = {
                "id": editId
            };
            if (dataBodyVal.img !== "" || dataBodyVal.img !== undefined) dogData.img = dataBodyVal.img;
            if (dataBodyVal.title !== "" || dataBodyVal.title !== undefined) dogData.title = dataBodyVal.title;
            if (dataBodyVal.type !== "" || dataBodyVal.type !== undefined) dogData.type = dataBodyVal.type;

            const formData = new FormData();
            for (const key of Object.keys(dogData)) {
                formData.append(key, dogData[key])
            }
            axios({
                method: 'PUT',
                url: 'https://petwalkapp.herokuapp.com/socialNetworks',
                headers: {
                    "x-auth-token": localStorage["token"],
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((data) => {
                    console.log(data);
                    let myIMG= `https://petwalkapp.herokuapp.com/${data.data}`;
                   setCommunities(myPets => myPets.map(data => data._id !== editId ? data : { ...data, title: dogData.title  , img: myIMG , type: dogData.type }));

                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 500) {
                        alert("Server Error , Try later");
                    }
                    return;
                })
        }
    };

    const communityList = communities.filter(todo => todo.title.toString().toLowerCase().includes(search));
    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link className="py-4" to="/community"><ArrowBackIcon style={{ fontSize: 'xx-large', color: 'black' }}></ArrowBackIcon></Link>
                        <h1 className="py-4">My Community</h1>
                    </div>
                    <SearchClass onSearch={onSearch} />
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="col-auto text-center mt-3">
                        <Link to='/myCommunity/new' style={{ borderRadius: '50%' }} className="btn-lg btns_blue"><AddIcon /></Link>
                    </div>
                    <div className="row justify-content-center" style={{ marginBottom: '100px' }}>
                        {data ? <CommunityList page={'myCommunity'} communities={communities} communityList={communityList} deleteItem={deleteItem} editItem={editItem} /> : <Loading />}
                    </div>
                </div>
            </main>
            <footer> <Navbar namePage={'community'} /> </footer>
        </React.Fragment>
    )
}

export default MyCommunity