import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const RoutineIDActivities = ({routineId}) =>{
    const [activityId, setActivityId] = useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [activities, setActivities] = useState([]);
    const [success, setSuccess] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [message, setMessage] = useState("");

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
              } catch (err) {
                console.error(err);
              }
        }
        fetchActivities();
    },[]);

    const myRoutineActivities = async (ev) => {
        ev.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              activityId: activityId,
              count: count, 
              duration: duration
            })
          });
          const result = await response.json();
          setPressed(true);
          if(result.routineId===routineId){
            setSuccess(true);
            setActivityId('');
            setCount('');
            setDuration('');
            setActivities([]);
          }else{
            setSuccess(false);
            setMessage(result.message);
          }
        } catch (err) {
          console.error(err);
        }
      }

    return<>
        <div className="routineIdActivities">
            <form onSubmit={myRoutineActivities}>
                <select id='choices' value={activityId} onChange={(ev)=>setActivityId(ev.target.value)}>
                    <option value="" disabled selected>Select your activity</option>
                    {
                        activities.map(activity => <option key={activity.id} value={activity.id}>{activity.name}</option>)
                    }
                </select>
                <input type='text' placeholder='Count*' value={count} onChange={(ev) => setCount(ev.target.value)}></input>
                <input type='text' placeholder='Duration*' value={duration} onChange={(ev) => setDuration(ev.target.value)}></input>
                <button type='submit' style={{ padding: '14px 28px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', marginTop:'50px',textDecoration:'none' }} className="btn btn-outline-primary">ADD</button>
            </form>
            {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>     
            <p style={{fontSize:'25px',color:'white'}}>You have successfully added the activity!</p>
            <Link to='/update-routines' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go Back To Edit Routine</Link>
            <p style={{fontSize:'25px',color:'white'}}>or</p>
            <Link to='/routine-activities' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Add Another Activity</Link>
            </div> : <div style={{padding: '30px',backgroundColor:'red',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
            <p style={{fontSize:'25px',color:'white'}}>{message}</p>
            </div>) : <p></p>}
        </div>
    </>
}

export default RoutineIDActivities;