const { User } = require("../models/userModel");
const { setCookie } = require("../utils/features");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");


 const register = async (req, res , next) => {
    try{
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if(user) {
        return next(new ErrorHandler("User already exists", 400));

      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name , email, password: hashedPassword });
      setCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
      next(error);
    }
}
 const login = async (req, res, next) => {
  try{
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if(!user) {
      return next(new Error("Invalid Email or Password", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }
    setCookie(user, res,`Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
}




 const Verify = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};




 const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="development"?"lax":"none",
      secure:process.env.NODE_ENV==="development"?false:true,
    })
    .json({
      success: true,
      user: req.user,
    });
};





module.exports = { register, login, Verify, logout };
