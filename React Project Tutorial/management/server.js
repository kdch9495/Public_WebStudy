// nodejs.express의 상당히 일반적인 코드
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port= process.env.PORT || 5000; // 5000번 포트로 접속

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// api/hello로 접속하면 아래 메시지 출력
app.get('/api/hello', (req, res) => {
    res.send({message: "Hello Express!"});
});

// 실제 app을 동작시켰을 때, 5000번 포트로 접속하여, 접속되었다면 아래 log 출력
app.listen(port, () => console.log(`Listening on port ${port}`));