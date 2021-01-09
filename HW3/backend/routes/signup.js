var express = require('express');
var router = express.Router();
const Parse = require('parse/node');

router.post('/', async function (req, res, next) {
    let email = req.body['email'];
    let password = req.body['password'];

    if (!isValid(email, password)) {
        return;
    }

    try {
        const user = new Parse.User();
        user.set('username', email);
        user.set('password', password);
        user.set('email', email);
        await user.signUp();
        res.status(201).send({ message: "user has been created." })
    } catch (error) {
        switch (error.code) {
            case Parse.Error.INVALID_EMAIL_ADDRESS:
                res.status(400).send({ message: "filed `email` is not valid" });
                break;
            case Parse.Error.USERNAME_TAKEN:
                res.status(409).send({ message: "email already exist." });
                break;
            default:
                res.send(error.code);
        }
    }
});

router.get("/", async (req, res) => {
    res.status(405).send({ message: "Only `Post` Method is Valid" });
});

function isValid(email, password) {
    if (!email || !password) {
        res.status(400).send({ message: "Request Length should be 2" })
        return false;
    }

    if (password.length <= 5) {
        res.status(400).send({ message: "filed `password`.length should be gt 5" })
        return false;
    }
    return true;
}

module.exports = router;
