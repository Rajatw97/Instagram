const initialState={
    open:false,
    email:'',
    username:'',
    password:'',
    user:null,
    openSignIn:false
};

export default (state=initialState,action)=>{

    switch(action.type){

        case 'usernameac': 
            return  {...state,username:action.payload }  
        case 'emailac': 
            return {...state,email:action.payload }  
        case 'passwordac': 
            return  {...state,password:action.payload }  
        case 'userac': 
            return  {...state,user:action.payload }  
        case 'openac': 
            return  {...state,open:action.payload }  
        case 'opensigninac': 
            return  {...state,openSignIn:action.payload }  
        default: return state
  }

}