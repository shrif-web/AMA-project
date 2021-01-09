var express = require('express');
var router = express.Router();
const Parse = require('parse/node');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.post("/", async (req, res) => {
    let email = req.body['email'];
    let password = req.body['password'];

    if (!isValid(email, password)) {
        return
    }

    try {
        const user = await Parse.User.logIn(email, password);
        res.status(200).send(user.getSessionToken())
    } catch (error) {
        switch (error.code) {
            case Parse.Error.UserInvalidLoginParams:
                res.status(401).send({ message: "wrong email or password." });
                break;
            default:
                res.send(error.code);
        }
    }
    // Do stuff after successful login.
})


router.get("/", async (req, res) => {
    res.status(405).send({ message: "Only `Post` Method is Valid" })
})


function isValid(email, password) {
    if (!email || !password) {
        res.status(400).send({ message: "Request Length should be 2" })
        return
    }
    if (!emailRegexp.test(email)) {
        res.status(400).send({ message: "filed `email` is not valid" })
        return
    }
}

module.exports = router;
