import { Link } from 'react-router-dom';
import Home from './Home';

export default function Navbar1() {
    return (
        <nav style={{ backgroundColor: '#1A237E', color: '#FFD700', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} className="nav">
            <Link to="/" style={{ fontSize: '28px', textDecoration: 'none', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Fitness Tracker
            </Link>
            <ul style={{ listStyle: 'none', padding: '0', display: 'flex' }}>
                <li className="active" style={{ marginLeft: '20px' }}>
                    <Link to="/" style={{ fontSize: '16px', textDecoration: 'none', color: '#FFD700', transition: 'color 0.3s', fontWeight: 'bold' }} activeStyle={{ color: '#ff7f50' }}>
                        HOME
                    </Link>
                </li>
                <li className="active" style={{ marginLeft: '20px' }}>
                    <Link to="/routines" style={{ fontSize: '16px', textDecoration: 'none', color: '#FFD700', transition: 'color 0.3s', fontWeight: 'bold' }} activeStyle={{ color: '#ff7f50' }}>
                        ROUTINES
                    </Link>
                </li>
                <li className="active" style={{ marginLeft: '20px' }}>
                    <Link to="/activities" style={{ fontSize: '16px', textDecoration: 'none', color: '#FFD700', transition: 'color 0.3s', fontWeight: 'bold' }} activeStyle={{ color: '#ff7f50' }}>
                        ACTIVITIES
                    </Link>
                </li>
                <li className="active" style={{ marginLeft: '20px' }}>
                    <Link to="/login" style={{ fontSize: '16px', textDecoration: 'none', color: '#FFD700', transition: 'color 0.3s', fontWeight: 'bold' }} activeStyle={{ color: '#ff7f50' }}>
                        LOG IN / SIGN UP
                    </Link>
                </li>
            </ul>
        </nav>
    );
}