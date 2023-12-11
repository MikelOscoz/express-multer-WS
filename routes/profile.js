var express = require('express');
var router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/workspaces/express-multer-WS/public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "avatar" + '-' + uniqueSuffix + ".png")
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2*1000000 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true);    
        }else{
            console.log("ez da png edo jpg")
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Kaixo "+req.body.izena+". Fitxategia: https://ominous-space-train-g9v5rp5x45p3v4qg-3000.app.github.dev/uploads/"+req.file.filename)
})


module.exports = router;
