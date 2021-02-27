import * as React from 'react';
import '../../../App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const FooterMyCommunity = (props) => {
    const {deleteItem,editItem} = props;

    return (
        <React.Fragment>
            <DeleteIcon onClick={deleteItem} className="fafaDelete" />
            <EditIcon onClick={editItem}  className="fafaEdite"/>
        </React.Fragment>
    );
}

export default FooterMyCommunity