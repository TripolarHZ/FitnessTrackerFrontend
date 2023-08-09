import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
    Login,
    Me,
    Register
} from './User';
import{
    RoutineIDActivities,
    RoutinesGet,
    RoutinesPatch,
    RoutinesPost
} from './Routines';
import{
    RoutineActivitiesDelete,
    RoutineActivitiesPatch
} from './Routine_Activities';
import{
    ActivitiesGet,
    ActivitiesPatch,
    ActivitiesPost
} from './Acitivities';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Home from './Home';  
import ActivitityIdRoutines from './Acitivities/ActivityID-Routines';

const App = () => {
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState("");
    const [routines, setRoutines] = useState([]);
    const [routineId, setRoutineId] = useState("");
    const storedToken = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = useState(!!storedToken);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    return <div className='app'>
        {loggedIn?<Navbar2 setLoggedIn={setLoggedIn} setUser={setUser} setToken={setToken}/>:<Navbar1/>}
        <Routes>
            <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
            <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setUserId={setUserId} setToken={setToken}/>}></Route>
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
                <RoutinesGet routines={routines} setRoutines={setRoutines} setRoutineId={setRoutineId} loggedIn={loggedIn} userId={userId} token={token}/>
            }></Route>
            <Route path = "/create-routines" element =
            {
                <RoutinesPost token={token}/>
            }></Route>
            <Route path = "/update-routines" element = 
            {
                <RoutinesPatch routineId={routineId} setRoutineId={setRoutineId} token={token} />
            }></Route>
            <Route path = "/me" element=
            {
                <Me setRoutineId={setRoutineId} token={token} user={user}/>
            }></Route>
            <Route path = "/activity-routines" element=
            {
                <ActivitityIdRoutines activityId={activityId} setActivityId={setActivityId}/>
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
