const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');



// cоздадим порт и спросим порт п\у ил зададим
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
// зарегили движок
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start() {
    try {
        // подключились к БД
        await mongoose.connect('mongodb+srv://Mike:1q2w3e@cluster0.abk6e.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        // запустили сервер
        app.listen(PORT, () => {
            console.log('server has been started...');
        });
    } catch(e) {
        console.log()
    }
}

start();
