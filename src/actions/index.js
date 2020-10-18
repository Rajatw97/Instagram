

export const emailAction=(param)=>{

    return {
        type:"emailac",
        payload:param
    };
};


export const passwordAction=(param)=>{

    return {
        type:"passwordac",
        payload:param
    };
};

export const usernameAction=(param)=>{

    return {
        type:"usernameac",
        payload:param
    };
};
export const openAction=(param)=>{

    return {
        type:"openac",
        payload:param
    };
};
export const openSignInAction=(param)=>{

    return {
        type:"opensigninac",
        payload:param
    };
};
export const userAction=(param)=>{

    return {
        type:"userac",
        payload:param
    };
};

export const postAction=(param)=>{

    return {
        type:"postac",
        payload:param
    };

}

export const captionAction=(param)=>{

    return {
        type:"captionac",
        payload:param
    };

}
export const imageAction=(param)=>{

    return {
        type:"imageac",
        payload:param
    };

}
export const progressAction=(param)=>{

    return {
        type:"progressac",
        payload:param
    };

}
export const commentAction=(param)=>{
    return {
        type:"commentac",
        payload:param
    };

}
export const singlecommentAction=(param)=>{

    return {
        type:"singlecommentac",
        payload:param
    };

}
export const likeAction=(param)=>{
        console.log("inside like: ",param)
    return {
        type:"likeac",
        payload:param
    };

}