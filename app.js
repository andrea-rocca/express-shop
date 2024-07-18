const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const hbs = require('express-handlebars');

const app = express();

app.engine('handlebars', hbs.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

/*
app.use('*', (req, res, next) => {
    console.log('middleware...');
    console.log(req.url);
    next(); // if we want to pass the request to the second middleware
});
*/


app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: '404 | Page Not Found', path: '/404'});
});

app.listen(PORT);
