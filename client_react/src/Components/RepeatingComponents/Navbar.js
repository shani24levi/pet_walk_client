import * as React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

const Navbar = (props) => {
    const {namePage} = props;
    return (
        <div id="bottom-nav">
            {namePage === 'myInfo' 
            ? <NavLink to='/myInfo'><HomeIcon color='primary' /></NavLink>
            : <NavLink to='/myInfo'><HomeIcon color="disabled" /></NavLink>
            }
            {namePage === 'myPets' 
            ? <NavLink to='/myPets'><PetsIcon color='primary' /></NavLink>
            : <NavLink to='/myPets'><PetsIcon color='disabled' /></NavLink>
            }
            {namePage === 'community' 
            ? <NavLink to='/community'><AccountCircleIcon color='primary' /></NavLink>
            : <NavLink to='/community'><AccountCircleIcon color='disabled' /></NavLink>
            }
            {namePage === 'search' 
            ? <NavLink to='/search'><SearchIcon color='primary' /></NavLink>
            : <NavLink to='/search'><SearchIcon color='disabled' /></NavLink>
            }
            {namePage === 'settings' 
            ? <NavLink to='/settings'><SettingsIcon color='primary' /></NavLink>
            : <NavLink to='/settings'><SettingsIcon color='disabled' /></NavLink>
            }
        </div>
    );
}

export default Navbar