
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

       
    const body =open?
      <ModalBody type="signup" text="Sign up"  onClick={signUp} email={email} password={password} username={username} setusername={setUsername} setPassword={setPassword}  setEmail={setEmail} />
    :<ModalBody type="signin" text="Sign In" onClick={signIn} email={email} password={password} username setusername setPassword  setEmail   />

    const body1=open?
    <Modal>
      open={open}
      onClose={setOpen(true)} 
      {body}
    </Modal> :
    <Modal>
      open={openSignIn}
      onClose={setOpenSignIn(true)} 
      {body}
    </Modal> 
    

  return (
    <div>
      {user?
    <Button onClick={()=>auth.signOut()}>Log out</Button>
  :(<div className="app_loginContainer">
     <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
    <Button onClick={()=>setOpen(true)}>Sign up</Button>
    {body1}
    </div>)
      }
    </div>
  );
    };
