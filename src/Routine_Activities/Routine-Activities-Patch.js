import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const RoutineActivitiesPatch = ({activityId, token}) =>{
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [success, setSuccess] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [message, setMessage] = useState("");
    console.log(activityId)

    const editActivities = async (ev) => {
        ev.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/routine_activities/${activityId}`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              count: count, 
              duration: duration
            })
          });
          const result = await response.json();
          setPressed(true);
          if(result.activityId===activityId){
            setSuccess(true);
            setCount('');
            setDuration('');
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
            <form onSubmit={editActivities}>
                <input type='text' placeholder='Count*' value={count} onChange={(ev) => setCount(ev.target.value)}></input>
                <input type='text' placeholder='Duration*' value={duration} onChange={(ev) => setDuration(ev.target.value)}></input>
                <button type='submit' style={{ padding: '14px 28px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', marginTop:'50px',textDecoration:'none' }} className="btn btn-outline-primary">UPDATE</button>
            </form>
            {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>     
            <p style={{fontSize:'25px',color:'white'}}>You have successfully updated the activity!</p>
            <Link to='/me' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go Back To My Routine</Link>
            </div> : <div style={{padding: '30px',backgroundColor:'red',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
            <p style={{fontSize:'25px',color:'white'}}>{message}</p>
            </div>) : <p></p>}
        </div>
    </>
}

export default RoutineActivitiesPatch;