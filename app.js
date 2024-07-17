const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const app = express();

const adminRoutes = require('./routes/admin');
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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(PORT);