import React from 'react';
import './css/App.css';
import ImageUpload from './components/ImageUpload'; 
import Header from './components/Header';
import Post from './components/Post';
import {useEffect} from 'react';
import {db} from './firebaseConfig';
import Modal from './components/modal';
import {connect} from 'react-redux';
import {postAction,userAction} from './actions';

const App=(props)=>{
    
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            props.postAction(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })));
        });
    },[]);
          return(<div>
              <Header />
              
              <Modal />
              {props.posts.user?(
              <ImageUpload  uname={props.posts.user.displayName}/>
              ):(<h3>Sorry, u need to login to create a new post</h3>)
              }
              {console.log(props.posts.post)};
              
                 {props.posts.post?(props.posts.post.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            )
            )):console.log("psots unavailable")}  
       </div>);
}


const mapStatetoProps=(state)=>{
    return { posts:state }
  };


  export default connect(mapStatetoProps,{postAction,userAction}) (App);
