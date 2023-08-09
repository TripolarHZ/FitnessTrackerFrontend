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
    RoutinesDelete,
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
    ActivitiesPost,
    ActivityIDRoutines
} from './Acitivities';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Home from './Home';  

const App = () => {
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState("");
    const [routines, setRoutines] = useState([]);
    const [routineId, setRoutineId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');

    return <div className='app'>
        {loggedIn?<Navbar2 setLoggedIn={setLoggedIn}/>:<Navbar1/>}
        <Routes>
            <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
            <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setToken={setToken}/>}></Route>
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
                <RoutinesGet routines={routines} setRoutines={setRoutines} routineId={routineId} setRoutineId={setRoutineId} loggedIn={loggedIn} user={user} token={token}/>
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
        </Routes>
    </div>
}

ReactDOM.render(
    <Router>  
        <App />
    </Router>,
      document.getElementById('app')
    )
