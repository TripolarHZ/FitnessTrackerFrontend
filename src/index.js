import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
    Login,
    Me,
    Register
} from './User';
import{
    RoutinesGet,
    RoutinesPatch,
    RoutinesPost,
    RoutineIDActivities
} from './Routines';
import{
    RoutineActivitiesPatch
} from './Routine_Activities';
import{
    ActivitiesGet,
    ActivitiesPatch,
    ActivitiesPost,
    ActivitityIdRoutines
} from './Acitivities';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Home from './Home';  


const App = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState("");
    const [routines, setRoutines] = useState([]);
    const [routineId, setRoutineId] = useState("");
    const [loggedIn, setLoggedIn] = useState(!!storedToken);      
    const [user, setUser] = useState(storedUser||'');
    const [userId, setUserId] = useState(storedUserId||'');
    const [token, setToken] = useState(storedToken||'');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        setLoggedIn(false);
        setUser('');
        setUserId('');
        setToken('');
      };

    return <div className='app'>
        {loggedIn?<Navbar2 handleLogout={handleLogout}/>:<Navbar1/>}
        <Routes>
            <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
            <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setUserId={setUserId}/>}></Route>
            <Route path = "/register" element={<Register />}></Route>
            <Route path = "/activities" element=
            {
                <ActivitiesGet activities={activities} setActivities={setActivities} setActivityId={setActivityId} loggedIn={loggedIn}/>
            }></Route>
            <Route path = "/create-activities" element =
            {
                <ActivitiesPost token={token}/>
            }></Route>
            <Route path = "/update-activities" element = {
                <ActivitiesPatch activityId={activityId} setActivityId={setActivityId} token={token} />
            }></Route>
            <Route path = "/routines" element=
            {
                <RoutinesGet routines={routines} setRoutines={setRoutines} loggedIn={loggedIn}/>
            }></Route>
            <Route path = "/create-routines" element =
            {
                <RoutinesPost token={token}/>
            }></Route>
            <Route path = "/update-routines" element = 
            {
                <RoutinesPatch routineId={routineId} setRoutineId={setRoutineId} token={token} activities={activities} user={user}/>
            }></Route>
            <Route path = "/me" element=
            {
                <Me routineId={routineId} setRoutineId={setRoutineId} token={token} user={user} setActivityId={setActivityId}/>
            }></Route>
            <Route path = "/activity-routines" element=
            {
                <ActivitityIdRoutines activityId={activityId} setActivityId={setActivityId}/>
            }></Route>
            <Route path = "/routine-activities" element=
            {
                <RoutineIDActivities routineId={routineId}/>
            }></Route>
            <Route path = "/routine-activities-patch" element=
            {
                <RoutineActivitiesPatch activityId={activityId} token={token}/>
            }></Route>
        </Routes>
    </div>
}

ReactDOM.render(
    <Router>  
        <App />
    </Router>,
      document.getElementById('app')
    )
