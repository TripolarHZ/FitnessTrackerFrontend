import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api/${COHORT_NAME}`;

const RoutinesGet = ({posts, setPosts, postId, setPostId,loggedIn,user,token}) => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/routines`)

        const result = await response.json();
        setPosts(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [])

  return <>
    <div className='read'>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Activities</h1>
      </div>
      {loggedIn ? posts.filter((post)=>{
        return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search);
      }).map(post => (post.author.username===user) ? (<div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        </div>): (<div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
          {selected && (post._id === postId) ? <form onSubmit={postMessage}>
            <input type='text' placeholder='Send a message' value={message} onChange=
            {(ev) => setMessage(ev.target.value)} onClick={()=>setPostId(post._id)} style={{width:'500px',height:'30px', border: 'none', borderBottom: '1px solid blue', outline: 'none'}}></input>
            <button type='submit' style={{ padding: '10px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '15px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none',marginLeft:'20px' }} className="btn btn-outline-primary">SEND</button>
          </form> : <button type="button" className="btn btn-outline-danger" onClick={()=>{setSelected(true); setPostId(post._id)}} style={{ padding: '14px 28px', backgroundColor: 'Orange', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none', width: '150px'}}>Message</button>}
        </div>)) : posts.filter((post)=>{
        return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search);
      }).map(post => <div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        </div>)
      }
    </div>
  </>

}

export default RoutinesGet;