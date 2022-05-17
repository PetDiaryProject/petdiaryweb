const express = require('express');
const multer = require('multer');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8001, () => {
    console.log('service running at PORT: 8001')
})

const comment = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const diary = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png")
    }
    
})

const uploadDiary = multer({ diary: diary })
const uploadComment = multer({ comment: comment })

app.get('/', (req, res) => {
    res.send('Hello Upload')
})

app.post('/register', (req, res) => {

    var fs = require('fs');
    var dir = 'uploads/diary/' + req.body.Userid ;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    res.send("create successful / " + dir)

})

app.post('/diary' , (req,res) => {
    var fs = require('fs');
    var dir = 'uploads/diary/'+ req.body.Userid + "/" + req.body.Diaryid;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    res.send("create successful / " + dir)
})

app.post('/comment' , (req,res) => {
    var fs = require('fs');
    var dir = 'uploads/board/' + req.body.Commentid ;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    res.send("create successful / " + dir)
})

app.post('/upload/diary', uploadDiary.single('file'), (req, res) => {

    res.send(req.file)
})