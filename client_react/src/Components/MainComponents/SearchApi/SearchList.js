import * as React from 'react';
import '../../../App.css';
import SearchItem from './SearchItem';


const SearchList = (props) => {
    const {searchList} = props;

    return (
        searchList.map(item =><SearchItem key={item} i={item}/>)
    )
}

export default SearchList