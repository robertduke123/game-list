import React from 'react';
import '../App.css';


export default function Search(props) {    
    return(
        <div className='search-cont'>               
                <input
                 onChange={props.onChange} 
                 id='search' 
                 className="form-control mr-sm-2" 
                 type="text" placeholder="Search" aria-label="Search"/>
                <div onClick={() => props.onSearch()} id='btn' className="btn btn-outline-success my-2 my-sm-0">Search</div>      
                <div className='not-applic'
                    style={props.isThere === false ? {display: 'flex'} : {display: 'none'}}
                >no game found please try again</div>          
        </div>    
    )    
}