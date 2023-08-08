import { Link } from 'react-router-dom';
import Home from './Home';

export default function Navbar1({ setLoggedIn }) {
    return (
        <nav style={{ backgroundColor: '#1A237E', color: '#FFD700', padding: '20px' }} className="nav">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }} className='site-title'>
                Fitness Tracker
            </h1>
            <ul style={{ listStyle: 'none', display: 'flex', fontWeight: 'bold' }}>
                <li className='active' style={{ marginRight: '10px' }}>
                    <Link to='/' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        HOME
                    </Link>
                </li>
                <li className='active' style={{ marginRight: '10px' }}>
                    <Link to='/routines' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        ROUTINES
                    </Link>
                </li>
                <li className='active' style={{ marginRight: '10px' }}>
                    <Link to='/my-routines' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        MY ROUTINES
                    </Link>
                </li>
                <li className='active' style={{ marginRight: '10px' }}>
                    <Link to='/activities' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        ACTIVITIES
                    </Link>
                </li>
                <li className='active'>
                    <Link to='/login' onClick={() => setLoggedIn(false)} style={{ textDecoration: 'none', color: '#FFD700' }}>
                        LOG OUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
}