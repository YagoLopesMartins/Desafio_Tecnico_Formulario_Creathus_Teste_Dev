const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cadastro', function (req, res) {
    res.render('formulario');
});


app.listen(3003, () => console.log('Server is running!'));