
import React,{useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import '../css/App.css';
import {auth,db} from '../firebaseConfig';
import ModalBody from './ModalBody';
import { Button} from '@material-ui/core';
import {emailAction,usernameAction,passwordAction,openAction,openSignInAction,userAction} from '../actions';
import {connect} from 'react-redux';
import history from '../History';

const SimpleModal=(props)=> {

  useEffect(()=>{
   const unsubcrcibe= auth.onAuthStateChanged(authUser=>{
      if(authUser){
        console.log(authUser);
        props.userAction(authUser);

      }
      else{
        props.userAction(null);
      }
    });
    return ()=>{
      unsubcrcibe();
    };
  },[props.posts.user,props.posts.username]);

  const signUp=event=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(props.posts.email,props.posts.password)
    .then(authUser=>{
      console.log(authUser);
      db.collection('users').doc(authUser.user.uid).set({
        followers:[],
        following:[],
        bio:''
      })
      return authUser.user.updateProfile({displayName:props.posts.username});
    })
    .catch((error)=>alert(error.message));
    // setOpen(false);
  };

  const signIn=event=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(props.posts.email,props.posts.password)
    .catch((error)=>alert(error.message));
    
    // setOpenSignIn(false);
  };

  const usernameSet=(obj)=>{
    props.usernameAction(obj);
  };
  const emailSet=(obj)=>{
    props.emailAction(obj);
  };
  const passwordSet=(obj)=>{
    props.passwordAction(obj);
  };
  const logoutSet=()=>{
    auth.signOut();
    props.openAction(false);
    props.openSignInAction(false);
  }

  const profileUser=()=>{
    console.log("inside user func");
    history.push('/user');
    
  }


       
    const body =props.posts.open?
      <ModalBody type="signup" text="Sign up" click={signUp} emailprop={props.posts.email} passwordprop={props.posts.password} usernameprop={props.posts.username} setusernameprop={usernameSet} setPasswordprop={passwordSet}  setEmailprop={emailSet} />
    :<ModalBody type="signin" text="Sign In" click={signIn} emailprop={props.posts.email} passwordprop={props.posts.password} usernameprop={props.posts.username} setusernameprop={usernameSet} setPasswordprop={passwordSet}  setEmailprop={emailSet}   />

    const body1=
     props.posts.open?
    <Modal
      className="ui model"
      open={props.posts.open} 
      onClose={()=>props.openAction(false)} 
      >
       {body}
    </Modal>: 
    <Modal
      className="ui model"
      open={props.posts.openSignIn}
      onClose={()=>props.openSignInAction(false)}  >
       {body} 
    </Modal> 
    

  return (
    <div className="button_sign">
      {props.posts.user?
        (<div className="app_loggedinContainer">
        <Button  className="button_modal" style={{marginTop:"-50px",marginRight:"90px"}} onClick={logoutSet}>Log out</Button>
        <Button  className="button_modal" style={{marginTop:"-50px"}} onClick={profileUser}>Profile</Button>
        </div>)
        :(<div className="app_loginContainer">
          <Button className="button_modal"  style={{marginTop:"-50px",marginRight:"90px"}} onClick={()=>props.openSignInAction(true)}>Sign In</Button>
          <Button className="button_modal"  style={{marginTop:"-50px"}}  onClick={()=>props.openAction(true)}>Sign up</Button>
         {body1}
          </div>)
      }
    </div>
  );
    };

    const mapStatetoProps=(state)=>{
      return { posts:state }
    };


    export default connect(mapStatetoProps,{emailAction,usernameAction,passwordAction,openAction,openSignInAction,userAction}) (SimpleModal);
