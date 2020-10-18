const initialState={
    open:false,
    email:'',
    username:'',
    password:'',
    user:null,
    openSignIn:false,
    post:[],
    caption:'',
    progressbar:0,
    image:'',
    comment:[],
    singlecomment:'',
    like:0
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
        case 'postac': 
            return  {...state,post:action.payload }      
        case 'captionac': 
            return  {...state,caption:action.payload }
        case 'imageac': 
            return  {...state,image:action.payload }  
        case 'progressac': 
            return  {...state,progressbar:action.payload }     
        case 'commentac':{ 
            return  {...state,comment:action.payload }  
            break;}   
        case 'singlecommentac': 
            return  {...state,singlecomment:action.payload }  
        case 'likeac': 
            console.log("inside reducer: ",action.payload)
            return  {...state,like:action.payload }                  
        default: return state
  }

}