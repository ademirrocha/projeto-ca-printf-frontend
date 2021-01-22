require("dotenv").config();

//Loading modules
const express = require('express');
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user/userRouter')
const authRouter = require('./routes/user/authRouter')
const eventsRouter = require('./routes/user/eventsRouter')
const adminEventsRouter = require('./routes/admin/eventsRouter')
const projectsRouter = require('./routes/user/projectsRouter')
const adminProjectsRouter = require('./routes/admin/projectsRouter')
const documentsRouter = require('./routes/user/documentsRouter')
const adminDocumentsRouter = require('./routes/admin/documentsRouter')

const path = require('path')
const morgan = require('morgan')

const api = require('./config/api')

const session = require('express-session')
const flash = require('connect-flash')

const passport = require('passport')
const {reqFlash} = require('./helpers/middleware')

const {handlebarsHelpres} = require('./helpers/handlebarsHelpers')

require('./config/auth')(passport)

//Session
app.use(session({
	secret: "quuuhjahjcoisa",
	resave: true,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//app.use(morgan('dev'))

app.use(handlebarsHelpres)

//Meddleware
app.use((req, res, next) => {
	
	if(req.user){
		api.defaults.headers.common['Authorization'] = 'Bearer ' + req.user.accessToken;
	}
	res.locals.api = api
	res.locals.user = req.user || null
	res.locals.error = req.flash('error')
	next()
})

app.use(reqFlash)

//Settings
//**Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
//**Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/images",
  express.static(path.join(__dirname, "public/uploads/images"))
);

app.use(
  "/documents",
  express.static(path.join(__dirname, "public/uploads/documents"))
);


//Routes
app.use('/', userRouter)
app.use('/', authRouter)
app.use('/eventos', eventsRouter)
app.use('/admin/eventos', adminEventsRouter)
app.use('/projetos', eventsRouter)
app.use('/admin/projetos', adminProjectsRouter)
app.use('/documentos', eventsRouter)
app.use('/admin/documentos', adminDocumentsRouter)



//Others
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
	console.log('Server Rodando em http://localhost:' + PORT);
});