const express = require('express')
const session = require('express-session')
const dataService = require("./services/data.service")
const app = express();
app.use(express.json())
//SESSION
app.use(session({
    secret: 'randomsecurestring',
    resave: false, //saving session after modification else true
    saveUninitialized: false //saving Uninitialized values here let it be false
}))
//Middle ware
app.use((req, res, next) => {
    console.log("Middle Ware")
    next()
})
// NOW BRING THE  console.log(req.body) TO MIDDLE WARE
const logMiddleware = (req, res, next) => {
    console.log(req.body)
    next()
}
//Now we need to call
app.use(logMiddleware)
const authMiddleware = (req, res, next) => {
    if (!req.session.current_user) {
        return res.json({
            statusCode: 401,
            status: false,
            message: "Please Login"
        })
    }
    else {
        next()
    }
}
//GET-READ
app.get('/', (req, res) => {
    res.status(401).send("THis I s A get MEthod")
})
//POST-CREATE
//register api
app.post('/register', (req, res) => {

    const result = dataService.register(req.body.uname, req.body.acno, req.body.pswd)
    console.log(res.status(result.statusCode).json(result))
})
//POST-LOGIN
//LOGIN API
app.post('/login', (req, res) => {
    const result = dataService.login(req,req.body.acno, req.body.pswd)
    console.log(res.status(result.statusCode).json(result))
})
//POST-DEPOSIT
app.post('/deposit', authMiddleware, (req, res) => {
    console.log(req.session.current_user)
    const result = dataService.deposit(req.body.acno, req.body.pswd, req.body.amount)
    console.log(res.status(result.statusCode).json(result))
})
app.post('/withdraw', authMiddleware, (req, res) => {
    const result = dataService.withdraw(req.body.acno, req.body.pswd, req.body.amount)
    console.log(res.status(result.statusCode).json(result))
})
//PUt-update modify whole
app.put('/', (req, res) => {
    res.send("THis I s A put MEthod")
})
//PATCH-Update /modify partially
app.patch('/', (req, res) => {
    res.send("THis I s A patch MEthod")
})
//Delete-delete
app.delete('/', (req, res) => {
    res.send("THis I s A delete MEthod")
})
app.listen(3000, () => {
    console.log("server started at port: 3000")
})

