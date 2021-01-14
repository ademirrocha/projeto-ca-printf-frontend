//Loading modules
const express = require('express');
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const routerUser = require('./routes/routerUser')
const path = require('path')

//Settings
//**Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//**Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Public
app.use(express.static(path.join(__dirname, "public")))

//Routes
app.use('/', routerUser)
app.use('/admin', admin)


//Others
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
   console.log('Server Rodando em http://localhost:' + PORT);
});