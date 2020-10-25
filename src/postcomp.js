import React from 'react';
import './css/App.css';
import ImageUpload from './components/ImageUpload'; 

import Post from './components/Post';
import {useEffect} from 'react';
import {db} from './firebaseConfig';
import Modal from './components/modal';
import {connect} from 'react-redux';
import {postAction,userAction,featuredPostAction} from './actions';

const Postcomp=(props)=>{
    
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            props.postAction(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })));
        });
        db.collection('posts').orderBy('like','desc').limit(3).onSnapshot(snapshot=>{
            props.featuredPostAction(snapshot.docs.map(doc=>({
                id:doc.id,
                featuredpost:doc.data()
            })));
        });

    },[]);
          return(<div>
              <Modal />
             <div className="all_posts">
                 <div className="posts_left" style={{width:"70%"}}>
                 <div>    
                    {props.posts.user?(
                    <ImageUpload  uname={props.posts.user.displayName}/>
                    ):(<h3 style={{textAlign:"center"}} >Sorry, u need to login to create a new post</h3>)
                    }
              </div>

                          
                 {props.posts.post?(props.posts.post.map(({id,post})=>(
                <Post loggedinUser={props.posts.user} key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postlikes={post.like} />
                    )
                    )):console.log("posts unavailable")}  
                  
            </div>
            <div className="featured_posts" style={{width:"30%"}}>
                <h3><strong>Featured posts: </strong></h3>
            {props.posts.featuredpost.map(({id,featuredpost})=>{  
                        return (<img className="featuredpost_image" key={id} src={featuredpost.imageUrl} alt="b" />)
            }
             )
             }
            </div>
            </div>
           
       </div>);
}


const mapStatetoProps=(state)=>{
    return { posts:state }
  };


  export default connect(mapStatetoProps,{postAction,userAction,featuredPostAction}) (Postcomp);
