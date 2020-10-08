import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Post from './components/Post';
import {useState,useEffect} from 'react';
import {db} from './firebaseConfig';
import Modal from './components/modal';
import { Button } from '@material-ui/core';


const App=()=>{
    const [post, setpost] = useState([]);

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setpost(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })));
        });
    },[]);
          return(<div>
              <Modal />
              
        <Header />
            {post.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))}  
       </div>);
}

export default App;