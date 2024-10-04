// ---------------------------------수업 버전----------------------------------------
// const express = require('express'); // Express 모듈을 불러와서 app을 만듦
// const cors = require('cors'); // CORS 모듈을 불러와 서버 간 자원 공유를 허용
// const path = require('path'); // 경로 관련 처리를 위한 path 모듈을 불러옴
// const spawn = require('child_process').spawn; // Python 스크립트를 실행하기 위한 child_process 모듈의 spawn 함수 불러옴
// const PORT = 8080; // 서버가 실행될 포트 번호 설정

// const app = express(); // Express 애플리케이션을 초기화

// app.use(cors()); // CORS를 활성화하여 외부 도메인의 요청을 허용
// app.use(express.json()); // JSON 형식의 데이터를 파싱할 수 있도록 설정

// // 루트 경로로 GET 요청이 들어오면 'Hello from Node server!' 메시지를 응답으로 전송
// app.get('/', (req, res) => {
//   res.send('Hello from Node server!');
// });

// // '/random/:count' 경로로 GET 요청이 들어오면 Python 스크립트를 실행하여 결과를 반환
// app.get('/random/:count', (req, res) => {
//   const scriptPath = path.join(__dirname, 'resolver.py'); // 실행할 Python 스크립트 파일 경로
//   const pythonPath = path.join(
//     'C:',
//     'conda',
//     'envs',
//     'recom_env',
//     'python.exe' // Conda 가상 환경에 있는 Python 인터프리터 경로
//   );

//   const count = req.params.count; // URL에서 count 값을 추출

//   // Python 스크립트를 실행하여 'random'과 count 값을 인자로 전달
//   const result = spawn(pythonPath, [scriptPath, 'random', count]);

//   let responseData = ''; // Python 스크립트의 출력을 저장할 변수

//   // Python 스크립트의 표준 출력(stdout)을 실시간으로 받아 responseData에 저장
//   result.stdout.on('data', function (data) {
//     responseData += data.toString(); // 받은 데이터를 문자열로 변환하여 저장
//   });

//   // Python 프로세스가 종료되면 실행됨
//   result.on('close', (code) => {
//     if (code === 0) {
//       // 정상 종료 시
//       const jsonResponse = JSON.parse(responseData); // 받아온 데이터를 JSON으로 파싱
//       res.status(200).json({ jsonResponse }); // 성공적으로 응답 전송
//     } else {
//       // 오류가 발생한 경우
//       res.status(500).json({ error: `Child process exited with code ${code}` }); // 에러 메시지 전송
//     }
//   });

//   // Python 스크립트 실행 중 표준 에러(stderr)가 발생한 경우 로그 출력
//   result.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
// });

// app.get('/latest/:count', (req, res) => {
//   const scriptPath = path.join(__dirname, 'resolver.py');
//   const pythonPath = path.join(
//     'C:',
//     'conda',
//     'envs',
//     'recom_env',
//     'python.exe'
//   );

//   const count = req.params.count;

//   const result = spawn(pythonPath, [scriptPath, 'latest', count]);

//   let responseData = '';

//   result.stdout.on('data', function (data) {
//     responseData += data.toString();
//   });

//   result.on('close', (code) => {
//     if (code === 0) {
//       const jsonResponse = JSON.parse(responseData);
//       res.status(200).json({ jsonResponse });
//     } else {
//       res.status(500).json({ error: `Child process exited with code ${code}` });
//     }
//   });

//   result.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
// });

// app.get('/genres/:genre/:count', (req, res) => {
//   const scriptPath = path.join(__dirname, 'resolver.py');
//   const pythonPath = path.join(
//     'C:',
//     'conda',
//     'envs',
//     'recom_env',
//     'python.exe'
//   );

//   const genre = req.params.genre;
//   const count = req.params.count;
//   const result = spawn(pythonPath, [scriptPath, 'genres', genre, count]);

//   let responseData = '';

//   result.stdout.on('data', function (data) {
//     responseData += data.toString();
//   });

//   result.on('close', (code) => {
//     if (code === 0) {
//       const jsonResponse = JSON.parse(responseData);
//       res.status(200).json({ jsonResponse });
//     } else {
//       res.status(500).json({ error: `Child process exited with code ${code}` });
//     }
//   });

//   result.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
// });

// app.get('/item-based/:item', (req, res) => {
//   const scriptPath = path.join(__dirname, 'recommender.py');
//   const pythonPath = path.join(
//     'C:',
//     'conda',
//     'envs',
//     'recom_env',
//     'python.exe'
//   );

//   const item = req.params.item;
//   const result = spawn(pythonPath, [scriptPath, 'item-based', item]);

//   let responseData = '';

//   result.stdout.on('data', function (data) {
//     responseData += data.toString();
//   });

//   result.on('close', (code) => {
//     if (code === 0) {
//       const jsonResponse = JSON.parse(responseData);
//       res.status(200).json({ jsonResponse });
//     } else {
//       res.status(500).json({ error: `Child process exited with code ${code}` });
//     }
//   });

//   result.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

// -----------------------------공통 부분 함수 호출 버전 ---------------------------------------------------
const express = require('express'); // Express 모듈을 불러와서 app을 만듦
const cors = require('cors'); // CORS 모듈을 불러와 서버 간 자원 공유를 허용
const path = require('path'); // 경로 관련 처리를 위한 path 모듈을 불러옴
const spawn = require('child_process').spawn; // Python 스크립트를 실행하기 위한 child_process 모듈의 spawn 함수 불러옴
const PORT = 8080; // 서버가 실행될 포트 번호 설정

const app = express(); // Express 애플리케이션을 초기화

app.use(cors()); // CORS를 활성화하여 외부 도메인의 요청을 허용
app.use(express.json()); // JSON 형식의 데이터를 파싱할 수 있도록 설정

// Python 스크립트를 실행하는 공통 함수
const runPythonScript = (script, args, res) => {
  const scriptPath = path.join(__dirname, script); // 실행할 Python 스크립트 파일 경로
  // const pythonPath = path.join(
  //   'C:',
  //   'conda',
  //   'envs',
  //   'recom_env',
  //   'python.exe' // Conda 가상 환경에 있는 Python 인터프리터 경로
  // );
  // const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');
  const pythonPath = path.join(
    '/home/ubuntu/miniconda',
    'envs',
    'myenv',
    'bin',
    'python3'
  );

  const result = spawn(pythonPath, [scriptPath, ...args]);

  let responseData = ''; // Python 스크립트의 출력을 저장할 변수

  // Python 스크립트의 표준 출력(stdout)을 실시간으로 받아 responseData에 저장
  result.stdout.on('data', function (data) {
    responseData += data.toString();
  });

  // Python 프로세스가 종료되면 실행됨
  result.on('close', (code) => {
    if (code === 0) {
      try {
        const jsonResponse = JSON.parse(responseData); // 받아온 데이터를 JSON으로 파싱
        res.status(200).json({ jsonResponse }); // 성공적으로 응답 전송
      } catch (err) {
        res.status(500).json({ error: 'Error parsing JSON response' }); // 파싱 오류 처리
      }
    } else {
      res.status(500).json({ error: `Child process exited with code ${code}` }); // 에러 메시지 전송
    }
  });

  // Python 스크립트 실행 중 표준 에러(stderr)가 발생한 경우 로그 출력
  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
};

// 루트 경로로 GET 요청이 들어오면 'Hello from Node server!' 메시지를 응답으로 전송
app.get('/', (req, res) => {
  res.send('Hello from Node server!');
});

// '/random/:count' 경로로 GET 요청이 들어오면 Python 스크립트를 실행하여 결과를 반환
app.get('/random/:count', (req, res) => {
  const count = req.params.count; // URL에서 count 값을 추출
  runPythonScript('resolver.py', ['random', count], res);
});

// '/latest/:count' 경로로 GET 요청이 들어오면 Python 스크립트를 실행하여 결과를 반환
app.get('/latest/:count', (req, res) => {
  const count = req.params.count; // URL에서 count 값을 추출
  runPythonScript('resolver.py', ['latest', count], res);
});

// '/genres/:genre/:count' 경로로 GET 요청이 들어오면 Python 스크립트를 실행하여 결과를 반환
app.get('/genres/:genre/:count', (req, res) => {
  const genre = req.params.genre;
  const count = req.params.count;
  runPythonScript('resolver.py', ['genres', genre, count], res);
});

// '/item-based/:item' 경로로 GET 요청이 들어오면 Python 스크립트를 실행하여 결과를 반환
app.get('/item-based/:item', (req, res) => {
  const item = req.params.item;
  runPythonScript('recommender.py', ['item-based', item], res);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
