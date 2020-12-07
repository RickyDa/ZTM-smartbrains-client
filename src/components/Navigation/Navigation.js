import React from 'react'
import {routes} from '../../App'
const Navigation = ({resetFace, onRouteChange, isSignedIn}) => {
    return (
        isSignedIn ? 
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim navy underline pa3 pointer' onClick={()=>{
                    onRouteChange(routes[0]);
                    resetFace();
                }}>Sign Out</p>
            </nav>
        :
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim navy underline pa3 pointer' onClick={()=>onRouteChange(routes[0])}>Sign in</p>
                <p className='f3 link dim navy underline pa3 pointer' onClick={()=>onRouteChange(routes[2])}>Register</p>
            </nav>
    );
}

export default Navigation;
