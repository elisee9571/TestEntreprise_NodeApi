const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

// Get - regroup all USERS
// Method: GET
router.get("/", (req, res) => {
    db.user
        .findAll()
        .then((user) => {
            if (user) {
                res.status(200).json({
                    message: "Success all users",
                    status: res.statusCode,
                    data: user,
                });
            } else {
                res.status(401).json({
                    message: "Try again",
                    status: res.statusCode,
                });
            }
        })
        .catch((err) => {
            res.status(404).json({
                message: "Users not found",
                status: res.statusCode,
            });
        });
});

// Post - register new USERS
// Method: POST
router.post("/register", (req, res) => {
    db.user
        .findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (!user) {
                const hash = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hash;
                db.user.create(req.body);
                res.status(201).json({
                    message: "Profil Created",
                    status: res.statusCode,
                });
            } else {
                res.status(401).json({
                    message: "Email Already Taken",
                    status: res.statusCode,
                });
            }
        })
        .catch((err) => {
            res.status(404).json({
                message: "Profil Not Created",
                status: res.statusCode,
            });
        });
});

// Post - login USERS
// Method: POST
router.post("/login", (req, res) => {
    db.user
        .findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(req.body, process.env.SECRET_KEY, {
                    expiresIn: "60s",
                });
                res.status(200).json({
                    message: "Logged In Success",
                    status: res.statusCode,
                    token: token,
                    id: user.id,
                });
            } else {
                res.status(401).json({
                    message: "Invalid Crendential",
                    status: res.statusCode,
                    token: "",
                });
            }
        })
        .catch((err) => {
            res.status(404).json({
                message: "User not found",
                status: res.statusCode,
                token: "",
            });
        });
});

// Get - profil USERS with ID
// Method: GET
router.get("/profil/:id", (req, res) => {
    db.user
        .findOne({
            where: {
                id: req.params.id,
            },
        })
        .then((user) => {
            if (user) {
                let token = jwt.sign(req.body, process.env.SECRET_KEY, {
                    expiresIn: "60s",
                });
                res.status(200).json({
                    message: "Success",
                    status: res.statusCode,
                    token: token,
                    data: user,
                });
            } else {
                res.status(404).json({
                    message: "User Not Found",
                    status: res.statusCode,
                });
            }
        })
        .catch((err) => {
            res.status(401).json({
                message: "Please Login",
                status: res.statusCode,
            });
        });
});

// Update - Edit USERS with ID
// Method: PUT
router.put("/update/:id", (req, res) => {
    db.user
        .findOne({
            where: {
                id: req.params.id,
            },
        })
        .then((user) => {
            if (user) {
                user
                    .update(req.body)
                    .then((user) => {
                        db.user
                            .findOne({
                                where: {
                                    id: user.id,
                                },
                            })
                            .then((user) => {
                                let token = jwt.sign(req.body, process.env.SECRET_KEY, {
                                    expiresIn: "60s",
                                });
                                res.status(200).json({
                                    message: "Success Update",
                                    status: res.statusCode,
                                    token: token,
                                    data: user,
                                });
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: "Imposible Update User",
                                    status: res.statusCode,
                                });
                            });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: "Impossible Update User",
                            status: res.statusCode,
                        });
                    });
            } else {
                res.status(404).json({
                    message: "User not found",
                    status: res.statusCode,
                });
            }
        })
        .catch((err) => {
            res.status(401).json({
                message: "Please Login",
                status: res.statusCode,
            });
        });
});

module.exports = router;