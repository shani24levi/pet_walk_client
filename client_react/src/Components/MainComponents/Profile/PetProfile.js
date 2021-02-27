import * as React from 'react';
import '../../../App.css';
import axios from 'axios';
import PetsIcon from '@material-ui/icons/Pets';
import WcIcon from '@material-ui/icons/Wc';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import Swal from 'sweetalert2';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AcordionProfile from './AcordionProfile';

const PetProfile = (props) => {
    const [dogId, setDogId] = React.useState("")
    const [dogType, setDogType] = React.useState('')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState('')
    const [dogWeight, setDogWeight] = React.useState('')
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState(null)
    const [foodLevel, setFoodLevel] = React.useState(null)
    const [dayPlanLevel, setDayPlanLevel] = React.useState(null)
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg, setDogImg] = React.useState("")
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)


    React.useEffect(() => {
        axios({
            method: 'GET',
            url: `https://petwalkapp.herokuapp.com/pets/ofUser/${props.location.state.pet_id}`,
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then((data) => {
                //including update 
                const dogInfo = data.data[0];
                console.log(dogInfo);
                setDogId(props.location.state.pet_id);
                setDogName(dogInfo.name);
                setDogType(dogInfo.type);
                setDogType(dogInfo.type);
                setDogWeight(dogInfo.weight);
                setDogAge(dogInfo.age);
                setDogGender(dogInfo.gender);
                setActivityLevel(dogInfo.activityLevel);
                setFoodLevel(dogInfo.foodLevel);
                setDogPlan(dogInfo.dayPlan);
                setDayPlanLevel(dogInfo.dayPlanLevel);
                setHobbies(dogInfo.hobbies);
                setBio(dogInfo.bio);
                setDogImg(dogInfo.img);
                setData(true);
                if (props.location.state.edited){
                    editPet();
                    return;
                }
            })
            .catch((err) => {
                if (err)
                    console.log(err)

            })
    }, [])

    const deletePet = () => {
        //delete from db:
        axios({
            method: 'DELETE',
            url: `https://petwalkapp.herokuapp.com/pets/${dogId}`,
            headers: {
                "x-auth-token": localStorage["token"]
            }
        })
            .then(myData => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deleted Successfuly',
                    showConfirmButton: false,
                    timer: 1500
                })
                //set state in MYPet page:
                //setPets(prevState => prevState.filter(({ _id }) => _id !== dogId));
                //props.location.state.deleted(dogId, true);
                return;
            })
            .catch(err => {
                if (err)
                    console.log("problem with dog deletion:\n" + err);
                return;
            })
    }

    const editPet = () => {
        if(props.location.state.name !== undefined) setDogName(props.location.state.name);
        if(props.location.state.type !== undefined) setDogType(props.location.state.type);
        if(props.location.state.age !== undefined) setDogAge(props.location.state.age);
        if(props.location.state.weight !== undefined) setDogWeight(props.location.state.weight);
        if(props.location.state.gender !== undefined) setDogGender(props.location.state.gender);
        if(props.location.state.activityLevel !== undefined) setActivityLevel(props.location.state.activityLevel);
        if(props.location.state.dogPlan !== undefined) setDogPlan(props.location.state.dogPlan);
        if(props.location.state.dayPlanLevel !== undefined) setDayPlanLevel(props.location.state.dayPlanLevel);
        if(props.location.state.hobbies !== undefined) setHobbies(props.location.state.hobbies);
        if(props.location.state.dogPlan !== undefined) setDogPlan(props.location.state.dogPlan);
        if(props.location.state.bio !== undefined) setBio(props.location.state.bio);
        if(props.location.state.dogImg !== undefined) setDogImg(props.location.state.dogImg);
    }

    const showProfile = () => {
        return (
            <React.Fragment>
                <div className="text-center">
                    <div className="text-center">
                        <img src={dogImg} alt="PetPic"
                            style={{ maxWidth: '30%', borderRadius: '50%', backgroundColor: 'azure' }} />
                    </div>
                    <h1 className="my-2">{dogName}</h1>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="row justify-content-center">
                                        <div className="col">
                                            <Link to={{ pathname: "/editPet", state: { pet_id: dogId } }} ><button className="btn btn-warning p-2 mb-2"><EditIcon style={{ cursor: 'pointer' }} /> Edit</button></Link>
                                        </div>
                                        <div className="col">
                                            <Link to={{ pathname: "/myPets", state: { petDeleted: dogId } }} onClick={deletePet}><button className="btn btn-danger p-2 mb-2"> <DeleteIcon style={{ cursor: 'pointer' }} /> Delete</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3><PetsIcon /> Type: {dogType}</h3>
                    <div className="row justify-content-center">
                        <WcIcon className="col-3" style={{ fontSize: '150%', color: '#6EA8FF' }} />
                        <p className="col-4 text-start"> Gender: {dogGender}</p>
                    </div>
                    <div className="row justify-content-center">
                        <HourglassEmptyIcon className="col-3" style={{ fontSize: '150%', color: '#6EA8FF' }} />
                        <p className="col-4 text-start"> Age: {dogAge}</p>
                    </div>
                    <div className="row justify-content-center">
                        <DirectionsRunIcon className="col-3" style={{ fontSize: '150%', color: '#6EA8FF' }} />
                        <p className="col-4 text-start"> Acrivity Level: {activityLevel}</p>
                    </div>
                    <div className="row justify-content-center">
                        <FastfoodIcon className="col-3" style={{ fontSize: '150%', color: '#6EA8FF' }} />
                        <p className="col-4 text-start"> Food Level: {foodLevel}</p>
                    </div>
                    <div className="row justify-content-center">
                        <FavoriteIcon className="col-3" style={{ fontSize: '150%', color: '#6EA8FF' }} />
                        <p className="col-4 text-start"> Day Plan Level: {dayPlanLevel}</p>
                    </div>

                    <AcordionProfile details={dogPlan} hobis={hobbies} bio={bio} className="mb-5" />
                </div>
            </React.Fragment>
        )
    }

    return (
        <>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link className="py-2" to="/myPets"><ArrowBackIcon style={{ fontSize: 'xx-large', color: 'black' }}></ArrowBackIcon></Link>
                        <h1 className="py-2"> {dogName} Profile</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    {data ? showProfile() : <Loading />}
                </div>
            </main>

            <footer> <Navbar namePage={'myPets'} /> </footer>
        </>



        // <Grid >
        //     <div style={{ display: 'block', position: 'relative', width: '100%', height: '100%', backgroundColor: 'lightgray' }} >
        //         <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
        //             <img alt="my-dog" src={dogImg} style={{ display: 'block', position: 'relative', width: '100px', height: '100px' }} />
        //             <text><b>{dogName}</b></text>
        //         </div>
        //         <div style={{ display: 'flex', position: 'relative', backgroundColor: 'gray' }} >
        //             <div style={{ display: 'flex', position: 'absolute', left: '20%', width: '175px', flexDirection: 'column' }}>
        //                 <div style={{ flexDirection: 'row' }}>
        //                     <NavLink to='/editPet' ><Button style={{ backgroundColor: 'orange', borderRadius: '10px' }}> <CreateIcon /> Edit</Button></NavLink>
        //                     <NavLink to='/myPets' onClick={() => {
        //                         axios({
        //                             method: 'delete',
        //                             url: `https://petwalkapp.herokuapp.com/pets/${dogId}`,
        //                             headers: {
        //                                 "x-auth-token": localStorage["token"]
        //                             }
        //                         })
        //                             .then((data) => {
        //                                 console.log(data)
        //                             })
        //                             .catch((err) => {
        //                                 if (err)
        //                                     console.log("problem with dog deletion:\n" + err)
        //                             })
        //                     }} ><Button style={{ backgroundColor: 'red', borderRadius: '10px' }}> <DeleteIcon /> Delete</Button></NavLink>
        //                 </div>
        //                 <div style={{ display: 'flex', position: 'absolute',top:'1cm', flexDirection: 'column' }}>
        //                     <text className='pet-profile-text'><PetsIcon /> <b>type: {dogType}</b></text>
        //                     <text> <WcIcon style={{ color: 'skyblue' }} /> gender: {dogGender}</text>
        //                     <text> <HourglassEmptyIcon style={{ color: 'skyblue' }} /> age: {dogAge} </text>
        //                     <text> <DirectionsRunIcon style={{ color: 'skyblue' }} /> activity level: {activityLevel} </text>
        //                     <text> <FastfoodIcon style={{ color: 'skyblue' }} /> food level: {foodLevel} </text>
        //                     <text> <FavoriteIcon style={{ color: 'skyblue' }} /> day plan level: {dayPlanLevel} </text>
        //                 </div>
        //             </div>
        //             <div style={{ display: 'flex', position: 'absolute',right: '20%',flexDirection:'column' }} >
        //                 <label>Hobbies:</label>
        //                 <text>{hobbies}</text>
        //                 <label>Bio:</label>
        //                 <text>{bio}</text>
        //                 <label>Day Plan:</label>
        //                 <text>{dogPlan}</text>
        //             </div>
        //         </div>
        //     </div>
        //     <Navbar />
        // </Grid>
    )
}


export default PetProfile