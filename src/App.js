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
                 <div className="posts-left" style={{width:"75%"}}>
                          
                 {props.posts.post?(props.posts.post.map(({id,post})=>(
                <Post loggedinUser={props.posts.user} key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postlikes={post.like} />
                    )
                    )):console.log("posts unavailable")}  
            </div>
            <div className="imbed-right" style={{width:"25%"}}>
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
              ):(<h3 style={{alignItems:'center'}}>Sorry, u need to login to create a new post</h3>)
              }
       </div>);
}


const mapStatetoProps=(state)=>{
    return { posts:state }
  };


  export default connect(mapStatetoProps,{postAction,userAction}) (App);
