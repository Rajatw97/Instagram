import React, { useEffect } from 'react';
import '../css/Post.css';
import Avatar from '@material-ui/core/Avatar';
import {commentAction,singlecommentAction} from '../actions';
import {connect} from 'react-redux';
import {db} from '../firebaseConfig';
import Comment from './Comment';

const Post=(props)=> {

    const postid=props.postId;
    
    useEffect(()=>{
        if(postid)
        {
            db
             .collection('posts')
             .doc(postid)
             .collection('comments')
             .onSnapshot(snapshot=>{
             props.commentAction(snapshot.docs.map(doc=>({
                id:doc.id,
                comm:doc.data()})))
             })
            }       
        
        // return ()=>{
        //     unsubscribe();
        // }
 },[postid]);

    const postComment=(event)=>{

    }
    const renderComments=()=>{
        return(<div>newwww</div>);
    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar  className="post_avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <p>{props.username}</p> 
            </div>
            <img className="post_image" src={props.imageUrl} alt="b" />  
            <h4 className="post_text"><p ><strong>{props.username} : </strong>{props.caption}</p></h4>
            
               <div className="post_cmnt">
                   {renderComments}
                   {/* {props.comments.comment.map(({id, comm})=>{return <div key={id}>night</div> } */}
                </div>
            
             
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
                disabled={!props.singlecomment}
                type="submit"
                onClick={postComment}>
                        Post
                </button>
             </form>
             </div>      
        
    )
}
const mapStateToProps=state=>{
    return {
        comments:state
    }
};

export default connect(mapStateToProps,{commentAction,singlecommentAction})(Post);
