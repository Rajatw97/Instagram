import { Button } from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {postAction,progressAction,imageAction,captionAction,likeAction} from '../actions';
import {db,storage} from '../firebaseConfig';
import firebase from 'firebase';
import '../css/ImageUpload.css';

const ImageUpload=(props)=>{

    const handleChange=e=>{
        if(e.target.files[0]){
            props.imageAction(e.target.files[0]);
        }
    };

    const handleUpload=()=>{

        const uploadTask=storage.ref(`images/${props.posts.image.name}`).put(props.posts.image);

        uploadTask.on('state_changed',
        (snapshot)=>{
            //progress bar logic
            const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            props.progressAction(progress);
        },
        (error)=>{alert.message(error);
        },
        ()=>{
                //on update
                storage
                    .ref("/images")
                    .child(props.posts.image.name)
                    .getDownloadURL()
                    .then(url=>{
                        db.collection("posts").add(
                        {
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:props.posts.caption,
                        imageUrl:url,
                        username:props.uname,
                        like:0
                         });
                       
                        props.progressAction(0);
                        props.imageAction('');
                        props.captionAction('');
                        });
        });
    };
    return(
    <div className="imageupload">
            <h3>Create a post:</h3>
         <progress className="imageupload_progress iuitem" value={props.posts.progressbar} max="100" />
        <div className="ui input mini">
        <input className="iuitem" type="text" placeholder="Enter a caption" value={props.posts.caption} onChange={event=>props.captionAction(event.target.value)}/>
        </div>
         <label htmlFor="file"><span className='fas fa-upload fa-2x' style={{marginLeft:"2%",marginTop:"2%"}}></span></label>
         <input className="iuitem" id="file" type="file" onChange={handleChange} style={{display:'none'}}></input> 
        <Button onClick={handleUpload} className="ui primary button uploadbtn" style={{marginLeft:'auto', marginBottom: '4px'}}> Upload </Button>

    </div>
    );
};

const mapStateToProps=(state)=>{
    return { posts:state}
}

export default connect(mapStateToProps,{postAction,progressAction,imageAction,captionAction,likeAction}) (ImageUpload);