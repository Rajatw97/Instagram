
import React,{useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import '../css/App.css';
import {auth} from '../firebaseConfig';
import ModalBody from './ModalBody';
import { Button, Input } from '@material-ui/core';


export default function SimpleModal() {

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');
  const [username,setUsername] = React.useState('');
  const [user,setUser]=React.useState(null);
  const [openSignIn,setOpenSignIn]=useState(false);

  useEffect(()=>{
   const unsubcrcibe= auth.onAuthStateChanged(authUser=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);

      }
      else{
        setUser(null);
      }
    });
    return ()=>{
      unsubcrcibe();
    };
  },[user,username]);

  const signUp=event=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser=>{
      return authUser.user.updateProfile({displayName:username});
    })
    .catch((error)=>alert(error.message));
    // setOpen(false);
  };

  const signIn=event=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));
    // setOpenSignIn(false);
  };

  const usernameSet=(obj)=>{
    setUsername(obj);
  };
  const emailSet=(obj)=>{
    setEmail(obj);
  };
  const passwordSet=(obj)=>{
    setPassword(obj);
  };
  const logoutSet=()=>{
    auth.signOut();
    setOpen(false);
    setOpenSignIn(false);
  }


       
    const body =open?
      <ModalBody type="signup" text="Sign up" click={signUp} email={email} password={password} username={username} setusername={usernameSet} setPassword={passwordSet}  setEmail={emailSet} />
    :<ModalBody type="signin" text="Sign In" click={signIn} email={email} password={password} username setusername={usernameSet} setPassword={passwordSet}  setEmail={emailSet}   />

    const body1=
     open?
    <Modal
      open={open} 
      onClose={()=>setOpen(false)} 
      >
       {body}
    </Modal>: 
    <Modal
      open={openSignIn}
      onClose={()=>setOpenSignIn(false)}  >
       {body} 
    </Modal> 
    

  return (
    <div>
      {user?
    <Button onClick={logoutSet}>Log out</Button>
  :(<div className="app_loginContainer">
     <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
    <Button onClick={()=>setOpen(true)}>Sign up</Button>
    {body1}
    </div>)
      }
    </div>
  );
    };
