const express = require ('express')
const cors = require ('cors')
const mysql = require('mysql')
const session = require ('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST","GET"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret : 'secret', // a secret key used to encryt the session cookie
    resave : false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 *  60 * 60 *24   
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "",
    database: "signup"
})



app.post('/signup',(req,res) =>{
    const sql = "INSERT INTO login (name,email,password) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values] , (err , result) => {
        if (err) return res.json({Message : "ERROR in node"})
        return res.json(result)
    })
})


app.post('/login',(req,res) =>{
    const sql = "SELECT * FROM login WHERE email = ? and password = ?"
    db.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({Message :"Error inside server"})
        if(result.length > 0){
            req.session.name = result[0].name
            return res.json({Login :true, name:req.session.name})
        }else{
            return res.json({Login : false})
        }
    })
})


app.get('/',(req,res) =>{
    if(req.session.name){
        return res.json({valid: true, name : req.session.name})
    }else{
        return res.json({valid:false})
    }
})

app.listen(5050 , () =>{
    console.log("Sever running is port 5050")
})