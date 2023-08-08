import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
    Login,
    Me,
    Register,
    UsernameRoutines
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
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');

    return <div className='app'>
        {loggedIn?<Navbar2 setLoggedIn={setLoggedIn}/>:<Navbar1/>}
        <Routes>
            <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
            <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setToken={setToken}/>}></Route>
            <Route path = "/register" element={<Register />}></Route>
            <Route path = "/routines" element={<RoutinesGet posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} loggedIn={loggedIn} user={user} token={token}/>}></Route>
        </Routes>
    </div>
}

ReactDOM.render(
    <Router>  
        <App />
    </Router>,
      document.getElementById('app')
    )
