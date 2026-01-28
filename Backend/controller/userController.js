import userModel from "../models/UserModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//creating token
const cretaeToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// register user
const registerUser = async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists.."});
        }
        if(!validator.isEmail){
            return res.json({success:false,message:"please enter vaild email address."});
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter vaild password.."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt)

        const newuser= new userModel({
            name,
            email,
            password:hashPassword
        })
        const user = await newuser.save()
        const token = cretaeToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
    }
}

// user login
const loginuser = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:true,message:"user doesnt extists..."})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(ismatch){
            const token= cretaeToken(user._id);
            res.json({success:true,token});
        }else{
            return res.json({success:true,message:"invaild credantils.."})
        }
    } catch (error) {
        console.log(error);
    }
}


// admin login
const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_MAIL &&
            password === process.env.ADMIN_PASS
        ) {
            // payload (never include password)
            const payload = {
                email: email,
                role: "admin"
            };

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
            );

            return res.status(200).json({
                success: true,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



export {registerUser,loginuser,adminlogin}