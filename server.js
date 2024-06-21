// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 정적 파일을 제공하기 위해 Express에 static 미들웨어 설정
app.use(express.static(path.join(__dirname)));

// 루트 경로에 대해 HTML 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
