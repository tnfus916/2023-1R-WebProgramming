import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [row,setRow]=useState([]);
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
          {
            row.map(function(obj){
              return <tr>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
          })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
