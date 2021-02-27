import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import '../../App.css';


const SearchClass = (props) => {
    //const { searchval } = props;
    const [search, setSearch] = React.useState('');

    const onSearchInputChange = ({ target: { value } }) => {
        console.log(value);
        setSearch(value);
        props.onSearch(value);
    }

    return (
        <form className="search-box my-2">
            <input type="text" className="search-txt" placeholder="Search" value={search} onChange={onSearchInputChange} />
            <SearchIcon className="search-btn"/>
        </form>
    );
}

export default SearchClass