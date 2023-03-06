// Importing Dependencies 
import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodoverride from 'method-override';
import initializepassport from './passport_config.js';
import users from './data_handler/users.js';
import add_user from './data_handler/create_user.js';
import projectsgetter from './data_handler/projects.js'
import get_project from './data_handler/get_p.js';
import create_project from './data_handler/create_p.js';
import delete_project from './data_handler/delete_p.js';

dotenv.config();
const app = express();
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(methodoverride('_method'));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

initializepassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.get('/',checkauthenticated,(req,res)=>{
    res.render('index.ejs',{name: req.user.name})
})

app.get('/login',checknotauthenticated,(req,res)=>{
    res.render('login_sales.ejs')
})

app.post('/login', checknotauthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checknotauthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checknotauthenticated, async (req, res) => {
    try {
        const hasedpassword = await bcrypt.hash(req.body.password, 10)
        const user_obj={
            id: Math.random() * 100,
            name: req.body.name,
            email: req.body.email,
            password: hasedpassword,
            type: req.body.user_type
        };
        await add_user(user_obj);
        res.redirect("/login")
    }
    catch {
        res.redirect("/register")
        console.log("error while hashing")
    }
})

app.get('/projects', checkauthenticated, async (req, res) => {
    let projectslist = await projectsgetter()
    res.json(projectslist)
  });

app.delete('/logout', (req, res) => {
    req.logOut(
        function (err) {
            if (err) {
                return next(err);
            }
        })
    res.redirect('/login')
})

app.post('/getproject',checkauthenticated,async (req,res)=>{
    let d = await get_project(req.body.id)
    res.render('view_project.ejs',d)
})

app.get("/newproject",checkauthenticated,(req,res)=>{
    res.render("new_project.ejs")
})

app.post('/createproject',checkauthenticated,async (req,res)=>{
    console.log(req.body)
    let success = await create_project(req.body)
    res.redirect(301,"/") // unable to redirect and reload page please check
})

app.post('/deleteproject',checkauthenticated,async (req,res)=>{
    let s = await delete_project(req.body.id)
    res.redirect("/")
})

function checkauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
function checknotauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(6969)

// app.post('/createproject',checkauthenticated,async (req,res)=>{
//     const db = await dbConnection();
//     const projectcollection = await projects();
//     const ob = {
//         name:req.body.name,
//         customer:req.body.customer,
//         description:req.body.description,
//         address:req.body.address,
//         status:req.body.status
//     }
//     projects.push(ob)
//     console.log(projects)
//     res.redirect('/')
// })