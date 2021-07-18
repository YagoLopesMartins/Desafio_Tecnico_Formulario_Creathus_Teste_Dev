const express = require('express');
const exphbs  = require('express-handlebars');
const multer = require('multer');

const database = require('./database/db');
const matriculaModel = require('./models/MatriculaModel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

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

app.get('/list', async (req, res) => {
    const matriculas = await matriculaModel.findAll();
    console.log(matriculas);

    return res.json(matriculas);
});

app.post('/cadastro',  upload.single('foto'), async(req, res) => {
    const { nome, idade, email, escolaridade } = req.body;

    const resultadoCreate = matriculaModel.create({
        nome,
        idade,
        email,
        escolaridade
    })
    res.json({ nome, idade, email, escolaridade });
});


app.listen(3003, () => console.log('Server is running!'));