import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const RoutinesGet = ({routines, setRoutines, loggedIn}) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await fetch(`${BASE_URL}/routines`, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
            
                const result = await response.json();
            
                console.log(result);
                setRoutines(result);
              } catch (err) {
                console.error(err);
              }
        }
        fetchRoutines();
    },[]);

    return <>
        <div className='routines'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Routines</h1>
                <form>
                <input type='text' placeholder='Search a routine' value={search} onChange=
                    {(ev) => setSearch(ev.target.value)} style={{width:'500px',height:'30px', border: 'none', borderBottom: '1px solid blue', outline: 'none', marginBottom:'30px', fontSize:'20px'}}></input>
                </form>
                {loggedIn ? <Link to='/create-routines'style={{fontSize:'20px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none', textAlign: 'center', width:'300px', marginBottom:"40px"}} >CREATE NEW ROUTINE</Link> :
                <div></div>}
            </div>
            {routines.filter((routine) => {
                return search.toLowerCase() === '' ? routine : routine.name.toLowerCase().includes(search);
                }).map(routine => <div className='routine' key={routine.id}>
                    <h1>{routine.name}</h1>
                    <h2>Creator: {routine.creatorName}</h2>
                    <p className='goal'>Goal: {routine.goal}</p>
                    <ul className='routineActivities'>
                        {routine.activities.map(routineActivity => 
                            <li className="routineActivity" key={routineActivity.id}>
                                <div>
                                    <h3>{routineActivity.name}</h3>
                                    <p>{routineActivity.description}</p>
                                    <p style={{color: 'orange'}}>Duration: {routineActivity.duration}</p>
                                    <p style={{color: 'green'}}>Count: {routineActivity.count}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>)
            }
        </div>
    </>
}

export default RoutinesGet;