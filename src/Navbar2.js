import { Link } from 'react-router-dom';
import Home from './Home';

export default function Navbar1({ setLoggedIn }) {
    return (
        <nav style={{ backgroundColor: '#1A237E', color: '#FFD700', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} className="nav">
            <Link to="/" style={{ fontSize: '28px', textDecoration: 'none', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Fitness Tracker
            </Link>
            <ul style={{ listStyle: 'none', display: 'flex', fontWeight: 'bold', fontSize: '1rem' }}>
                <li className='active' style={{ marginLeft: '20px' }}>
                    <Link to='/' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        HOME
                    </Link>
                </li>
                <li className='active' style={{ marginLeft: '20px' }}>
                    <Link to='/routines' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        ROUTINES
                    </Link>
                </li>
                <li className='active' style={{ marginLeft: '20px' }}>
                    <Link to='/my-routines' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        MY ROUTINES
                    </Link>
                </li>
                <li className='active' style={{ marginLeft: '20px' }}>
                    <Link to='/activities' style={{ textDecoration: 'none', color: '#FFD700' }}>
                        ACTIVITIES
                    </Link>
                </li>
                <li className='active' style={{ marginLeft: '20px' }}>
                    <Link to='/login' onClick={() => setLoggedIn(false)} style={{ textDecoration: 'none', color: '#FFD700' }}>
                        LOG OUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
}