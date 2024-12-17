// find userId using the Json web token

import jwt from "jsonwebtoken";

//next mean will excuted before the controller function whenever we will hit the API
const userAuth = async(req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:'Not Authorized,Login Again'});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userID = tokenDecode.id;
        }else{
            return res.json({success:false, message: 'Not Authorized,Login Again'});
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export default userAuth;