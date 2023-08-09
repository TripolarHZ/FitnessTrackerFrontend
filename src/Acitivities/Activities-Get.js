import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {ActivityIdRoutines} from './ActivityID-Routines';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;


const ActivitiesGet = ({activities, setActivities, setActivityId, loggedIn}) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${BASE_URL}/activities`, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
            
                const result = await response.json();
            
                console.log(result);
                setActivities(result);
                setActivityId(null);
              } catch (err) {
                console.error(err);
              }
        }
        fetchActivities();
    },[]);

    return <>
        <div className='activities'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Activities</h1>
                <form>
                <input type='text' placeholder='Search an activity' value={search} onChange=
                    {(ev) => setSearch(ev.target.value)} style={{width:'500px',height:'30px', border: 'none', borderBottom: '1px solid blue', outline: 'none', marginBottom:'30px', fontSize:'20px'}}></input>
                </form>
                {loggedIn ? <Link to='/create-activities'style={{fontSize:'20px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none', textAlign: 'center', width:'300px', marginBottom:"40px"}} >ADD NEW ACTIVITY</Link> :
                <div></div>}
            </div>
            {loggedIn ? activities.filter((activity) => {
                return search.toLowerCase() === '' ? activity : activity.name.toLowerCase().includes(search);
                }).map(activity => <div className='activity' key={activity.id}>
                    <Link to='/activity-routines' onClick={setActivityId(activity.id)} style={{fontSize:'30px',color:'blue',padding:'10px', textDecoration:'none', textAlign: 'center', marginBottom:"40px"}}>{activity.name}</Link>
                    <p style={{marginBottom:'50px'}}>{activity.description}</p>
                    <Link to='/update-activities' onClick={()=>{setActivityId(activity.id)}} style={{ padding: '14px 28px', backgroundColor: 'blue', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration:'none', marginTop: '30px', width: '100px' }}>Edit</Link>
                </div>) : activities.filter((activity) => {
                return search.toLowerCase() === '' ? activity : activity.name.toLowerCase().includes(search);
                }).map(activity => <div className='activity' key={activity.id}>
                    <Link to='/activity-routines' onClick={setActivityId(activity.id)} style={{fontSize:'30px',color:'blue',padding:'10px', textDecoration:'none', textAlign: 'center', marginBottom:"40px"}}>{activity.name}</Link>
                    <p style={{marginBottom:'50px'}}>{activity.description}</p>
                </div>)
            }
        </div>
    </>
}

export default ActivitiesGet;