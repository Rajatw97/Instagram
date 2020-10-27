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
    like:0,
    featuredpost:[],
    userprofile:{},
    userimg:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        
        case 'userprofileac': 
            return  {...state,userprofile:action.payload }      
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
            return  {...state,like:action.payload }     
        case 'featuredpostac': 
            return  {...state,featuredpost:action.payload }   
        case 'userimgac': 
            return  {...state,userimg:action.payload }       
                         
        default: return state
  }

}