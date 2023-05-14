import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [row,setRow]=useState([])
  const loadAPI = async () => {
    if( row.length === 0 ) {
      fetch("http://openAPI.seoul.go.kr:8088/78636e4e496269673634556a795559/json/RealtimeCityAir/1/25/").then(
        function(res) {
          res.json().then(function(res2) {
            setRow(res2.RealtimeCityAir.row);
          })
        }
      )
    }
  }
  
  console.log(row);
  
  return (
    <>
    {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      <div> (과제 퀴즈) main.jsx의 실제 js 모습은 어떨까? 예상해서 작성해 보시오</div>
      <div> =&gt; App.jsx에서 return() 안에 있는 html 요소들이 모두 React.createElement()형식으로 바뀌고 </div>
      <div>변수도 useState없이 사용될 것 같다.</div>
      <br></br>
      <div> (과제 퀴즈) 어떻게 하면 그 결과를 얻어올 수 있을까?</div>
      <div>import React from &apos;react&apos;를 통해 React.createElement를 가져와 결과를 얻어오는 것 같다.</div>
      <br></br>
      <br></br> */}
    <button onClick={loadAPI}>
      <div className='loading'></div>데이터 불러오기</button>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>PM10</th>
            <th>O3</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {/* {
            row.map(function(obj){
              return <tr>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
          })
          } */}
          {
            row.map((gu,idx)=>{
              return <tr key={idx}>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.O3}</td>
                <td>{gu.IDEX_NM}</td>
              </tr>
          })
          }
          {/* 중괄호 자바스크립트 영역임을 나타냄 
          map 함수 안에 들어가는 function을 map callback function이라고 한다*/}
        </tbody>
      </table>
    </>
  )
}

export default App
