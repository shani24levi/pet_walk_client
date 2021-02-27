import * as React from 'react';
import '../../../App.css';
import CommunityItem from './CommunityItem';


const CommunityList = (props) => {
    const {communityList,page,deleteItem,editItem} = props;

    return (
        communityList.map(item =><CommunityItem key={item._id} item={item} title={item.title} page={page} editItem={() => {editItem(item._id);}} deleteItem={() => {deleteItem(item._id);}}/>)
    )
}

export default CommunityList