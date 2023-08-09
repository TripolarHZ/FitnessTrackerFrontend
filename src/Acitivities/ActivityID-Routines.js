import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

export default function ActivitityIdRoutines({activityId, setActivityId}){
    const [routines, setRoutines] = useState([]);
    
    useEffect(() => {
        const activityRoutines = async () => {
          try {
            const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
              headers: {
                'Content-Type': 'application/json'
              },
            });
            const result = await response.json();
            setRoutines(result);
            console.log(result);
          } catch (err) {
            console.error(err);
          }
        }
        activityRoutines();
      }, [])

      return<>
       <div className='activityRoutines'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Related Routines</h1>
            </div>
            {
                routines.map(routine => <div className='routine' key={routine.id}>
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