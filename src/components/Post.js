import React, { useEffect , useState} from 'react';
import '../css/Post.css';
import Avatar from '@material-ui/core/Avatar';
import {commentAction,singlecommentAction} from '../actions';
import {connect} from 'react-redux';
import {db} from '../firebaseConfig';
import firebase from 'firebase';

const Post=(props)=> {

    const [commentsnew,setcommentsnew]=useState([]);

    const postid=props.postId;
    let unsubscribe;
    useEffect(()=>{
        if(postid)
        {
           unsubscribe=db
             .collection('posts')
             .doc(postid)
             .collection('comments')
             .orderBy('timestamp','desc')
             .onSnapshot(snapshot=>{
            //  props.commentAction(snapshot.docs.map(doc=>({
            //     id:doc.id,
            //     comm:doc.data()})))
            //  })
            setcommentsnew(snapshot.docs.map(doc=>({
                    id:doc.id,
                     comm:doc.data()})))
                  })
            }       
        
        return ()=>{
            unsubscribe();
        }
 },[postid]);

    const postComment=(event)=>{
        event.preventDefault();
        db
        .collection('posts')
        .doc(props.postId)
        .collection('comments')
        .add({
            text:props.comments.singlecomment,
            username:props.loggedinUser.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        props.singlecommentAction('');

    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar  className="post_avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <p>{props.username}</p> 
            </div>
            <img className="post_image" src={props.imageUrl} alt="b" />  
            <div className="post_text"><p ><strong>{props.username} : </strong> {props.caption}</p></div>
            
               <div className="post_cmnt">
                    {commentsnew && commentsnew.map(({id, comm})=>{ 
                  return <div key={id}><strong>{comm.username}</strong> : {comm.text}</div>
                     }) }
                </div>
            
             {props.loggedinUser &&(
                  <form className="post_comment">
                  <input
                   className="post_input"
                   type="text"
                   placeholder="Add a comment"
                   value={props.comments.singlecomment}
                   onChange={(e)=>props.singlecommentAction(e.target.value)}>
                  </input>
                  <button
                  className="post_button"
                  // disabled={!props.singlecomment}
                  type="submit"
                  onClick={postComment}>


                          Post
                  </button>
               </form>
             )}
           
             </div>      
        
    )
}
const mapStateToProps=state=>{
    return {
        comments:state
    }
};

export default connect(mapStateToProps,{commentAction,singlecommentAction})(Post);
