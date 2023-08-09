import React, { useState, } from 'react';
import {Link} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const ActivitiesPost = (token) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [message, setMessage] = useState("");

    const makeActivity = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/activities`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                name: name,
                description: description
              }) 
            });
        
            const result = await response.json();
            console.log(result);
            setPressed(true);
            if(result.name===name){
                setSuccess(true);
                setName("");
                setDescription("");
            }else{
                setSuccess(false);
                setMessage(result.message);
            }
          } catch (err) {
            console.error(err);
          }
    }

    return <>
        <div className='createActivity'>
            <h1 style={{ fontSize: '32px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Add New Activity</h1>
            <form onSubmit={makeActivity}>
                <input type='text' placeholder='Name*' value={name} onChange={(ev) => setName(ev.target.value)}></input>
                <input type='text' placeholder='Description*' value={description} onChange=
                {(ev) => setDescription(ev.target.value)}></input>
                 <button type='submit' style={{ padding: '14px 28px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', marginTop:'50px',textDecoration:'none' }} className="btn btn-outline-primary">CREATE</button>
            </form>
            {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>     
            <p style={{fontSize:'25px',color:'white'}}>You have successfully created the activity!</p>
            <Link to='/activities' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go Back To All Activities</Link>
            </div> : <div style={{padding: '30px',backgroundColor:'red',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
            <p style={{fontSize:'25px',color:'white'}}>{message}</p>
            </div>) : <p></p>}
        </div>
    </>

}

export default ActivitiesPost;