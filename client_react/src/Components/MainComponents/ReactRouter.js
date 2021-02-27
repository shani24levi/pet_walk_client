import * as React from 'react'
import { Route } from 'react-router-dom'
import '../../App.css'
import AddPet from './AddPet'
import MyInfo from './MyInfo'
import Search from './SearchApi/Search'
import Intro from './Intro'
import EditPet from './EditPet'
import MyPets from './MyPets'
import Login from './Login'
import PetProfile from './Profile/PetProfile'
import Community from './Community/Community'
import MyCommunity from './Community/MyCommunity'
import AddCommunity from './Community/AddCommunity'
import Propess from './Propess';





const ReactRouter = () => {
    return (
        <React.Fragment>
            <Route exact path="/" component={Intro} />
            <Route exact path="/myInfo" component={MyInfo} />
            <Route exact path="/search" component={Search} />
            <Route exact path='/addPet' component={AddPet} />
            <Route exact path='/editPet' component={EditPet} />
            <Route exact path='/myPets' component={MyPets} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/petProfile' component={PetProfile} />
            <Route exact path='/community' component={Community} />
            <Route exact path='/myCommunity' component={MyCommunity} />
            <Route exact path='/myCommunity/new' component={AddCommunity} />
            <Route exact path='/settings' component={Propess} />
        </React.Fragment>
    )
}

export default ReactRouter