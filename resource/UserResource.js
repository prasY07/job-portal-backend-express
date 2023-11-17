
export const userShortResource = async (userData) => {
    return { id: userData._id, name: userData.name, email: userData.email };
}


export const userCompleteInfoResource = async (userData) => {
    const data = 
     { id: userData._id, 
        name: userData.name, 
        email: userData.email
     };

     return  data;
}