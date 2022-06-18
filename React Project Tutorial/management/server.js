// nodejs.express의 상당히 일반적인 코드
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port= process.env.PORT || 5000; // 5000번 포트로 접속

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// npm install --save multer 이후
const multer = require('multer'); // multer 객체 생성. 중복되지 않는 image가 올라감
const upload = multer({dest: './upload'}) // 서버의 기본 root폴더에 있는 upload폴더를 사용자의 파일이 upload되는 공간으로 설정

// // api/hello로 접속하면 아래 메시지 출력
// app.get('/api/hello', (req, res) => {
//     res.send({message: "Hello Express!"});
// });

// jsonlint.com 에서 validation 확인 가능 
app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM customer WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );


  //  하드코딩하면 이렇게 됨 
  // res.send([
      //   {
      //       'id' : 1,
      //       'image' : 'http://placeimg.com/64/64/1',
      //       'name' : '동찬',
      //       'birthday' : '951221',
      //       'gender' : '남성',
      //       'job' : '직짱인'
      //     },
      //     {
      //       'id' : 2,
      //       'image' : 'http://placeimg.com/64/64/2',
      //       'name' : '길동',
      //       'birthday' : '951222',
      //       'gender' : '남성',
      //       'job' : '프로그래머'
      //     }]
    // );
});

// 실제로는 image폴더로 접근하는데 upload 폴더와 매핑
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET idDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

// 실제 app을 동작시켰을 때, 5000번 포트로 접속하여, 접속되었다면 아래 log 출력
app.listen(port, () => console.log(`Listening on port ${port}`));