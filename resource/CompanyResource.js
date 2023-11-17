import CompanyInformation from "../models/CompanyInformation.js";

export const companyShortResource = async (userData) => {
    return { id: userData._id, name: userData.name, email: userData.email };
}

export const companyFullInfo = async (userData) => {
    const getCompanyDetails = await CompanyInformation.find({user_id:userData._id});

    const companyData = 
    { 
         id: userData._id,
         name: userData.name, 
         email: userData.email ,
         company_name : (getCompanyDetails.length > 0) ? getCompanyDetails[0].company_name : null,
         company_address : (getCompanyDetails.length > 0) ? getCompanyDetails[0].company_address :null,
    };
    return companyData;
}