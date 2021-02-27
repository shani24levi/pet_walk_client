import * as React from 'react';
import '../../../App.css';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const FooterCommunity = () => {
    return (
        <React.Fragment>
            <Link to="#" ><StarIcon /></Link>
            <ChatBubbleOutlineIcon className="fafaIcons"/>
            <FacebookIcon className="fafaIcons2"/>
            <TwitterIcon className="fafaIcons3"/>
            <InstagramIcon className="fafaIcons4"/>
        </React.Fragment>
    );
}

export default FooterCommunity