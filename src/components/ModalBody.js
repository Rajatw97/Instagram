import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import '../css/App.css';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  

export default (props)=>{
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    

return(
        <div style={modalStyle} className={classes.paper}>
        <form className="form_singup">
        <center>
        <img className="app_headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="a" />
        </center>    
        {
            props.type==="signup"?
              <Input 
              placeholder="username"
              type="text"
              value={props.usernameprop}
              onChange={(e)=>props.setusernameprop(e.target.value)}  />:console.log("Sign up form")
        }
         
        <Input 
            placeholder="email"
            type="text"
            value={props.emailprop}
            onChange={(e)=>props.setEmailprop(e.target.value)}  />   
            
        <Input 
            placeholder="password"
            type="text"
            value={props.passwordprop}
            onChange={(e)=>props.setPasswordprop(e.target.value)}  />   
          
        <Button type="submit" onClick={(event)=>props.click(event)} >{props.text}</Button>
        </form>
        </div>
      );

};