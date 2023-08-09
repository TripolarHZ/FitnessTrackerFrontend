import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const RoutinesGet = ({routines, setRoutines, routineId, setRoutineId, loggedIn, user, token}) => {
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

    const deleteRoutine = async (routineIdToDelete) => {
        try {
            const response = await fetch(`${BASE_URL}/routines/${routineIdToDelete}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const result = await response.json();
            console.log(result);
            if(result.success===true){
              const newRoutines = routines.filter(routine => routine.id !== routineIdToDelete);
              setRoutines(newRoutines);
            }
          } catch (err) {
            console.error(err);
          }
    }

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
                }).map(routine => ((routine.creatorId === user) && loggedIn) ? (<div className='routine' key={routine.id}>
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
                    <Link to='/update-routines' onClick={()=>{setRoutineId(routine.id)}} style={{ padding: '14px 28px', backgroundColor: 'blue', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration:'none', marginTop: '30px', width: '100px' }}>Edit</Link>
                    <button type="button" className="btn btn-outline-danger" onClick={()=>deleteRoutine(routine.id)} style={{ padding: '14px 28px', backgroundColor: 'red', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none', width: '100px', marginLeft:'30px'}}>Delete</button>
                </div>) : (<div className='routine' key={routine.id}>
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
                </div>))
            }
        </div>
    </>
}

export default RoutinesGet;