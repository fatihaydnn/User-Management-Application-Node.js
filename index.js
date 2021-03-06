const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
const { success, error } = require("consola");
const { DB, PORT } = require("./config");

const app = express();
const http = require('http').Server(app);

const port = PORT;

// routes
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");

const startApp = async () => {
    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {

            var corsOptions = {
                origin: '*',
                optionsSuccessStatus: 200
            };


            app.use(cors(corsOptions));
            app.use(express.static('public'));
            app.use(express.json({ limit: '50mb', extended: true }));
            app.use(express.urlencoded({ limit: '50mb', extended: true }));
            app.use(express.text({ limit: '50mb', extended: true }));

            app.use(cookieParser());


            app.get('/login', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/login.html'));
            });

            app.get('/register', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/register.html'));
            });

            app.get('/user', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/user.html'));
            });

            app.get('/log', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/log.html'));
            });

            app.get('/address', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/address.html'));
            });

            app.get('/addressAdd', function (req, res) {
                res.sendFile(path.join(__dirname, 'public/views/home/addressAdd.html'));
            });


            //api paths
            app.use("/user", userRoutes);
            app.use("/address", addressRoutes);

            http.listen(port, () =>
                success({
                    message: `successfully connected with db`,
                    badge: true,
                })
            );

        })
        .catch((err) => {
            error({
                message: `${err}`,
                badge: true,
            });
        });

};

startApp();
