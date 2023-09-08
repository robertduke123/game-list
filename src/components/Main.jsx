import React from 'react';

export default function Main(props) {
    let log = props.log
    
    let listItems = log.map((item) => {
                    let number = log.indexOf(item)
                    console.log(Object.keys(props.pers).length);
                    
                    if(Object.keys(props.pers).length > 0) {
                        console.log('test');
                    return(
                        <div key={'list Item' + number} className='list-item'>
                            <div key={'image' + number} className='image-container' style={{backgroundImage: `url(${props.pers[number].image})`}}></div>
                            

                            <li key={'list name' + number} >{item}</li>

                            <div key={'list selector' + number} className='select-cont'>
                                <div
                                key={'start' + number} 
                                onClick={(e) => props.onActive(e, 'one')}
                                className={props.pers[number].completion === 'started' ? 'select red' : 'select'}
                                /> 
                                <div
                                key={'fin' + number} 
                                onClick={(e) => props.onActive(e, 'two')} 
                                className={props.pers[number].completion === 'finish' ? 'select blue' : 'select'}
                                /> 
                                <div
                                key={'comp' + number} 
                                onClick={(e) => props.onActive(e, 'three')} 
                                className={props.pers[number].completion === 'complete' ? 'select green' : 'select'}
                                />  
                            </div>                            
                        </div>                    
                    )
                    }
                })

    return(
                
            <ul key={1} className='list-cont'>
                {listItems.length > 0 ? listItems : []}
            </ul>
        
    )
}