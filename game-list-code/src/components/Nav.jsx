import React from 'react';

export default function Nav(props) {
    return(
        <nav>
            <h1 className='logo'>GameTracker</h1>
           { props.signedIn === false ?
           <div className='signReg'>
                <p className='sign'
                onClick={() => props.onRouteChange('signin', false)}
                >Sign In</p>
                <p className='register'
                onClick={() => props.onRouteChange('register', false)}
                >Register</p>
            </div> :
            <div className='signReg'>
                <p className='sign'
                onClick={() => props.onRouteChange('signin', false)}
                >Sign Out</p>
            </div>
            }
            
            
        </nav>
    )
}