const express = require('express');
const exphbs = require('express-handlebars');
const routeHandler = require('./routes/routeHandler');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('source'));
app.use(bodyParser());
app.use(
    session({
        secret: 'loftnode',
        key: 'sessionkey',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 6000
        },
        saveUninitialized: false,
        resave: false
    })
)
app.use(cookieParser('cat'))
app.use(flash())

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', routeHandler);
app.post('/', routeHandler)

app.get('/login', routeHandler)
app.post('/login', routeHandler)

app.get('/admin', routeHandler)
app.post('/admin/skills', routeHandler)
app.post('/admin/upload', routeHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started!'))