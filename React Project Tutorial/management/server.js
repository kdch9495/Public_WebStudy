// nodejs.express의 상당히 일반적인 코드
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port= process.env.PORT || 5000; // 5000번 포트로 접속

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// // api/hello로 접속하면 아래 메시지 출력
// app.get('/api/hello', (req, res) => {
//     res.send({message: "Hello Express!"});
// });

// jsonlint.com 에서 validation 확인 가능 
app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'http://placeimg.com/64/64/1',
            'name' : '동찬',
            'birthday' : '951221',
            'gender' : '남성',
            'job' : '직짱인'
          },
          {
            'id' : 2,
            'image' : 'http://placeimg.com/64/64/2',
            'name' : '길동',
            'birthday' : '951222',
            'gender' : '남성',
            'job' : '프로그래머'
          },
          {
            'id' : 3,
            'image' : 'http://placeimg.com/64/64/3',
            'name' : '찬동',
            'birthday' : '951223',
            'gender' : '남성',
            'job' : '직짱인3'
            }
    ]);
});

// 실제 app을 동작시켰을 때, 5000번 포트로 접속하여, 접속되었다면 아래 log 출력
app.listen(port, () => console.log(`Listening on port ${port}`));