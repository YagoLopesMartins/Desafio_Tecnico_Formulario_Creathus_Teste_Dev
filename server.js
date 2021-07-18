const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

(async () => {
    const database = require('./database/db');
    const matriculaModel = require('./models/MatriculaModel');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);

        const resultadoCreate = await matriculaModel.create({
            nome: 'Yago',
            idade: 27,
            email: 'yagolopesmartins777@gmail.com',
            foto: 'url...',
            escolaridade: 'graduado'
        })
        console.log(resultadoCreate);


    } catch (error) {
        console.log(error);
    }
})();

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cadastro', function (req, res) {
    res.render('formulario');
});


app.listen(3003, () => console.log('Server is running!'));