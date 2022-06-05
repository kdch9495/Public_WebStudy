import logo from './logo.svg';
import './App.css';

// 화면에 대한 내용의 출력을 담당하는 부분
function App() {
  return (
    <div className='gray-background'>
      <img src={logo} lat="logo" />
      <h2>Let's develop management system!</h2>
    </div>
  );
}

export default App;
