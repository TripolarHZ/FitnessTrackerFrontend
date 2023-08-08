import { Link } from 'react-router-dom';

export default function Home({ loggedIn, user }) {
    return (
        <div style={{ textAlign: 'center', margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            {loggedIn ? (
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Welcome to Fitness Tracker</h1>
                    <h2 style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>Logged in as {user}</h2>
                    <Link
                        to="/me"
                        style={{
                            fontSize: '18px',
                            textDecoration: 'none',
                            color: '#007bff',
                            padding: '10px 20px',
                            border: '2px solid #007bff',
                            borderRadius: '4px',
                            transition: 'background-color 0.3s, color 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#007bff';
                        }}
                    >
                        VIEW MY ROUTINES
                    </Link>
                </div>
            ) : (
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Welcome to Fitness Tracker</h1>
                    <h2 style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>Please Login!</h2>
                    <Link
                        to="/login"
                        style={{
                            fontSize: '18px',
                            textDecoration: 'none',
                            color: '#007bff',
                            padding: '10px 20px',
                            border: '2px solid #007bff',
                            borderRadius: '4px',
                            transition: 'background-color 0.3s, color 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#007bff';
                        }}
                    >
                        LOG IN
                    </Link>
                </div>
            )}
        </div>
    );
}
