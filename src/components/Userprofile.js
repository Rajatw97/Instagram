// import { Button,Badge } from '@material-ui/core';
// import React,{useEffect,useState} from 'react';

// import history from '../History';
// import '../css/Userprofile.css';
// import {connect} from 'react-redux';
// import {userprofileAction,userAction,userimgAction} from '../actions';
// import {db,auth,storage} from '../firebaseConfig';
// import {Avatar} from '@material-ui/core';

// const Userprofile=(props)=>{

//   const [value, setValue] = useState(0);

//   useEffect(()=>{

//          auth.onAuthStateChanged(authUser=>{
//             if(authUser){
//               console.log(authUser);
//               props.userAction(authUser);

//              }
//             else{
//               props.userAction(null);
//             }
//           })
//             if(props.users.user){
//             db.collection('users').doc(props.users.user.uid).onSnapshot(snapshot=>{
//             //    console.log(snapshot.data())
//                  props.userprofileAction(snapshot.data());
//                        })
//                     }
                
//             },[props.users.user])

//             const hiddenFileInput = React.useRef(null);
            
            
//             const handleChange=e=>{
//               if(e.target.files[0]){
//                 console.log("change"+e.target.files[0])
//                 props.userimgAction(e.target.files[0]);
//               }
             
//           };
//             const imgUpld= e=>{
//               hiddenFileInput.current.click();
//               console.log("userimg: ",props.users.userimg);
//               setValue(1);
//               if(props.users.userimg){
//                 console.log("inside if");
//                 const uploadTask= storage.ref(`images/${props.users.user.uid}`).put(props.users.userimg);
//                 uploadTask.on('state_changed',
//                 ()=>{
//                 storage
//                 .ref("/images")
//                 .child(props.users.user.uid)
//                 .getDownloadURL()
//                 .then(url=>{
//                     db.collection("users").doc(props.users.user.uid).update(
//                     {
//                    imageUrl:url
//                      });
//                     });
//             });
//             }    

//         }

        
//     return(<div>
//        <Button  className="back_btn" style={{marginTop:'-45px'}} type="submit" onClick={()=>history.push("/")}>Back</Button>
//        <div className="user_info">
//            <div className="user_img">
               
//             {/* username below image */}
           
//             <Avatar alt="Remy Sharp"  src={props.users.userprofile.imageUrl} sizes="large" />
//            <input className="iuitem" id="file" type="file"  ref={hiddenFileInput} onChange={handleChange} style={{display:"none"}} ></input> 
//            <button className="fas fa-user-edit edit_icon" onClick={imgUpld} ></button>
//             <p className="img_uname">Rajat</p>
//            </div>
//            <div className="user_follow">
//                {/* followers,following, button & no of foll */}
//            </div>
//            <div className="user_bio">
//                {/* bio,edit bio option too */}
//            </div>


//         <div><strong>{props.users.userprofile.bio}</strong> : {props.users.userprofile.followers} : {props.users.userprofile.following}</div>
//         </div>
//         </div>);
// }

// const mapStateToProps=(state)=>{
//     return {users:state}
// }

// export default connect(mapStateToProps,{userprofileAction,userAction,userimgAction}) (Userprofile);