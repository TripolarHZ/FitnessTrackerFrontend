import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const Me = ({setRoutineId, token, user}) => {
    const [routines, setRoutines] = useState([]);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const me = async () => {
          try {
            const response = await fetch(`${BASE_URL}/users/me`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            const result = await response.json();
            setUsername(result.username);
            setId(result.id);
          } catch (err) {
            console.error(err);
          }
        }
        me();
      }, [])

      useEffect(() => {
        const myRoutines = async () => {
          try {
            const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            const result = await response.json();
            setRoutines(result);
          } catch (err) {
            console.error(err);
          }
        }
        myRoutines();
      }, [])

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

    return<>
      <h1 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: "60px" }}>Welcome {username}!</h1>
      <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: "20px"  }}>User ID: {id}</p>
      <h2 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: "40px"  }}>My Routines:</h2>
      {
        routines.map(routine => 
          <div className='routine' key={routine.id}>
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
                </div>
        )
      }
    </>
}

export default Me;