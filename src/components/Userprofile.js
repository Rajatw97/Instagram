import { Button,Badge } from '@material-ui/core';
import React,{useEffect} from 'react';
import history from '../History';
import '../css/Userprofile.css';
import {connect} from 'react-redux';
import {userprofileAction,userAction,userimgAction} from '../actions';
import {db,auth,storage} from '../firebaseConfig';
import {Avatar} from '@material-ui/core';

const Userprofile=(props)=>{

    useEffect(()=>{

         auth.onAuthStateChanged(authUser=>{
            if(authUser){
              console.log(authUser);
              props.userAction(authUser);
             }
            else{
              props.userAction(null);
            }
          })
            if(props.users.user){
            db.collection('users').doc(props.users.user.uid).onSnapshot(snapshot=>{
            //    console.log(snapshot.data())
                 props.userprofileAction(snapshot.data());
                       })
                    }
                
            },[props.users.user])

            const uploadImg=()=>{

                const uploadTask=storage.ref(`images/${props.users.user.uid}`).put(props.users.userimg);
                uploadTask.on('state_changed',
                (snapshot)=>{
                storage
                .ref("/images")
                .child(props.users.user.uid)
                .getDownloadURL()
                .then(url=>{
                    props.userimgAction(url);
                    db.collection("users").doc(props.users.user.uid).set(
                    {
                   imageUrl:url
                     });
                    });
            });
        }

        
    return(<div>
       <Button  className="back_btn" style={{marginTop:'-45px'}} type="submit" onClick={()=>history.push("/")}>Back</Button>
       <div className="user_info">
           <div className="user_img">
               
            {/* username below image */}
            <Avatar alt="Remy Sharp" src={props.users.userimg} sizes="large" />
            <label htmlFor="file"><span className='fas fa-user-edit edit_icon' style={{marginLeft:"2%",marginTop:"2%"}}></span></label>
           <input className="iuitem" id="file"  onClick={uploadImg}  type="file"  style={{display:'none'}}></input> 
            <p className="img_uname">Rajat</p>
           </div>
           <div className="user_follow">
               {/* followers,following, button & no of foll */}
           </div>
           <div className="user_bio">
               {/* bio,edit bio option too */}
           </div>


        <div><strong>{props.users.userprofile.bio}</strong> : {props.users.userprofile.followers} : {props.users.userprofile.following}</div>
        </div>
        </div>);
}

const mapStateToProps=(state)=>{
    return {users:state}
}

export default connect(mapStateToProps,{userprofileAction,userAction,userimgAction}) (Userprofile);