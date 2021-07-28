const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
const UserModel = require('./models/users.models');
const userController = require('./routers/users.router');
const login = require('./routers/auth.router');
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


let PORT = 3000

mongoose.connect('mongodb://localhost:27017/User', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userController)
app.use('/api/v1', login);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Ups, algo salió mal.')
    next()
})

app.listen(PORT, () => {
    console.log(`Estamos en el puerto ${PORT}`)
})

