import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const RoutinesPatch = ({routineId, setRoutineId, token, user}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(null);
    const [success, setSuccess] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [message, setMessage] = useState("");
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const myRoutines = async () => {
          try {
            const response = await fetch(`${BASE_URL}/users/${user}/routines`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            const result = await response.json();
            setRoutines(result);
            console.log(result);
          } catch (err) {
            console.error(err);
          }
        }
        myRoutines();
      }, [])

    const updateRoutines = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              method: "PATCH",
              body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
              })
            });
        
              const result = await response.json();
              console.log(result);
              setPressed(true);
              if(result.name===name){
                setSuccess(true);
                setRoutineId(null);
                setName("");
                setGoal("");
                setIsPublic(null)
            }else{
                setSuccess(false);
                setMessage(result.message);
            }
            } catch (err) {
                console.error(err);
            }
    }

    return <>
        <div className='updateRoutine'>
            <h1 style={{ fontSize: '32px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Update A Routine</h1>
            <form onSubmit={updateRoutines}>
                <input type='text' placeholder='Name*' value={name} onChange={(ev) => setName(ev.target.value)}></input>
                <input type='text' placeholder='Goal*' value={goal} onChange={(ev) => setGoal(ev.target.value)}></input>
                <ul className='routineActivitiesEdit'>
                        {routines.map(routine => (routine.id === routineId) ? (routine.activities.map(routineActivity => 
                            <li className="routineActivityEdit" key={routineActivity.id}>
                                <div>
                                    <h3>{routineActivity.name}</h3>
                                    <p>{routineActivity.description}</p>
                                    <p style={{color: 'orange'}}>Duration: {routineActivity.duration}</p>
                                    <p style={{color: 'green'}}>Count: {routineActivity.count}</p>
                                </div>
                            </li>
                        )) : <p></p>)}
                    </ul>
                <Link to='/routine-activities' style={{fontSize:'20px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none', textAlign: 'center', width:'300px', marginBottom:"40px"}} >ADD AN ACTIVITY</Link>
                <input type='checkbox' className='public' onChange={(ev) => setIsPublic(ev.target.value)}/><label style={{ fontSize: '16px' }}>Make It Public? </label>
                 <button type='submit' style={{ padding: '14px 28px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', marginTop:'50px',textDecoration:'none' }} className="btn btn-outline-primary">UPDATE</button>
            </form>
            {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>     
            <p style={{fontSize:'25px',color:'white'}}>You have successfully updated the routine!</p>
            <Link to='/activities' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go Back To All Routines</Link>
            <p style={{fontSize:'25px',color:'white'}}>or</p>
            <Link to='/me' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go To My Routines</Link>
            </div> : <div style={{padding: '30px',backgroundColor:'red',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
            <p style={{fontSize:'25px',color:'white'}}>{message}</p>
            </div>) : <p></p>}
        </div>
    </>


}

export default RoutinesPatch;