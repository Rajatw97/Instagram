import React from 'react';
import '../css/Post.css';
import Avatar from '@material-ui/core/Avatar';
import {commentAction} from '../actions';
import {connect} from 'react-redux';

function Post(props) {
    return (
        <div className="post">
            <div className="post_header">
            <Avatar  className="post_avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <p>{props.username}</p> 
             </div>
        
         <img className="post_image" src={props.imageUrl} alt="b" />  
         <div className="post_text">
             <p><strong>{props.username} : </strong>{props.caption}</p>   
             </div>      
        </div>
    )
}
const mapStateToProps=state=>{
    return {
        comments:state.comment
    }
};

export default  connect(mapStateToProps,{commentAction})(Post);
