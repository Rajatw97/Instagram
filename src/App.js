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
import InstagramEmbed from 'react-instagram-embed';

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
             <div className="all_posts">
                 <div className="posts-left">
              {console.log(props.posts.post)}
              
                 {props.posts.post?(props.posts.post.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            )
            )):console.log("psots unavailable")}  
            </div>
            <div className="imbed-right">
            <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
            </div>
            </div>

             {props.posts.user?(
              <ImageUpload  uname={props.posts.user.displayName}/>
              ):(<h3>Sorry, u need to login to create a new post</h3>)
              }
       </div>);
}


const mapStatetoProps=(state)=>{
    return { posts:state }
  };


  export default connect(mapStatetoProps,{postAction,userAction}) (App);
