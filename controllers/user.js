const User = require('../models/user')
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth');

async function handleSignup(req,res)
{
    const {name,email,password} = req.body;
    await User.create({
        name:name,
        email:email,
        password:password    
    })
    return res.redirect('/');
}

async function handleLogin(req,res)
{
    const {email,password} = req.body;
    const user = await User.findOne({
        email:email,
        password:password
    })
    if(!user)
        return res.render('login',{
            error:"Invalid Username or Password"
    })

    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect('/');
}
module.exports = {
    handleSignup,
    handleLogin
}