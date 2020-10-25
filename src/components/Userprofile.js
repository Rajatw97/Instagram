import { Button } from '@material-ui/core';
import React,{useEffect} from 'react';
import history from '../History';
import '../css/Userprofile.css';
import {connect} from 'react-redux';
import {userprofileAction} from '../actions';

const Userprofile=(props)=>{

    useEffect(()=>{
        console.log(props.user)
        // db.collection('users').doc()
    })




    return(<div>
       <Button  className="back_btn" style={{marginTop:'-45px'}} type="submit" onClick={()=>history.push("/")}>Back</Button>
       <div className="user_info">

       </div>
        </div>);
}

const mapStateToProps=(state)=>{
    return {user:state}
}

export default connect(mapStateToProps,{userprofileAction}) (Userprofile);