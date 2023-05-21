import f01 from './assets/골뱅이무침.jpeg';
import f02 from './assets/곱창.jpeg';
import f03 from './assets/로제파스타.jpeg';
import f04 from './assets/마라샹궈.jpeg';
import f05 from './assets/마라탕.jpeg';
import f06 from './assets/삼겹살.jpeg';
import f07 from './assets/샤브샤브.jpeg';
import f08 from './assets/아구찜.jpeg';
import f09 from './assets/육회덮밥.jpeg'; 
import f10 from './assets/치킨.jpeg'; 
import f11 from './assets/피자.jpeg'; 
import f12 from './assets/회.jpeg'; 
import f13 from './assets/양념게장.jpeg'; 
import f14 from './assets/연어덮밥.jpeg'; 
import f15 from './assets/엽떡.jpeg'; 
import f16 from './assets/오일파스타.jpeg'; 
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'
import './Worldcup.css'

function Worldcup() {
    const candidate = [
        {name:"골뱅이무침",src:f01},
        {name:"곱창",src:f02},
        {name:"로제파스타",src:f03},
        {name:"마라샹궈",src:f04},
        {name:"마라탕",src:f05},
        {name:"삼겹살",src:f06},
        {name:"샤브샤브",src:f07},
        {name:"아구찜",src:f08},
        {name:"육회비빔밥",src:f09},
        {name:"치킨",src:f10},
        {name:"피자",src:f11},
        {name:"회",src:f12},
        {name:"양념게장",src:f13},
        {name:"연어덮밥",src:f14},
        {name:"엽떡",src:f15},
        {name:"오일파스타",src:f16}
    ];

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [leftBorder, setLeftBorder]=useState(false);
    const [rightBorder, setRightBorder]=useState(false);
    const borderRight=rightBorder?'border':'';
    const borderLeft=leftBorder?'border':'';
    const [stat,setStat]=useState({
        "골뱅이무침":0,
        "곱창":0,
        "로제파스타":0,
        "마라샹궈":0,
        "마라탕":0,
        "삼겹살":0,
        "샤브샤브":0,
        "아구찜":0,
        "육회비빔밥":0,
        "치킨":0,
        "피자":0,
        "회":0,
        "양념게장":0,
        "연어덮밥":0,
        "엽떡":0,
        "오일파스타":0
    });    //dictionary 같은 개념, 나중에 통계 정보 사용하기 위한 방식, 다른 방법도 있음    

    const data={
        labels:["골뱅이무침","곱창","로제파스타","마라샹궈","마라탕","삼겹살","샤브샤브","아구찜","육회비빔밥","치킨","피자","회","양념게장","연어덮밥","엽떡","오일파스타"],
        datasets:[
            {
                type:'doughnut',
                data:Object.values(stat),
                backgroundColor:['red','blue','yellow','green','purple','orange','pink','gray','black','brown','skyblue','navy','gold','silver','violet','limegreen'],
            },
        ],
    };

    const options = {
        plugins:{
            title:{
                display:true,
                text:'월드컵 통계'
            },
        },
        responsive: true,
        legend:{
            labels:{
                fontSize:3
            }
        },
      };

    //처음 컴포넌트가 한번 실행하는 함수의 영역
    useEffect(() => {
        const 문자열=localStorage.getItem("2019112132"); //문자열을 객체로 바꿔줌
        // JSON.parse() 안에 null값이 들어갈 수도 있으니 앞에서 검사를 해줘야함
        if(문자열 !==null){
            setStat(JSON.parse(문자열));
        }
        setGame(candidate.map(c => {
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l, r) => {
            return l.order - r.order;
        }));
    }, []);

    useEffect(() => {
        if( game.length > 1 && round + 1 > game.length / 2 ) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);

    // 최종 페이지
    if( game.length === 1 ){
        localStorage.setItem("2019112132",JSON.stringify(stat)); //문자열로 바꾼 다음에 저장
        return <div className='img__box'>
            <p className='head__title result'>이상형 월드컵 우승</p>
            <img src={game[0].src} /> <div className='img__name'>{game[0].name}&nbsp;&nbsp; {stat[game[0].name]} 번 승리</div> 
            {/* <table>
                {Object.keys(stat).map(name=>{
                    return <tr key={name}><td>{name}</td><td>{stat[name]}</td></tr>
                })}
            </table> */}
            <div style={{ margin:"20px",fontSize:"1rm"}}><Doughnut data={data} options={options} style={{width:"400px"}}/></div>
        </div>
    }

    if( game.length === 0 || round + 1 > game.length / 2 ) return <p>로딩중입니다</p>;

    const left=round*2, right=round*2+1;
    const leftFunction = () => { 
        setStat({
            ...stat,
            [game[left].name]:stat[game[left].name]+1
        });
        setNextGame((prev) => prev.concat(game[left]));
        setLeftBorder(true);
        setTimeout(()=>{
            setLeftBorder(false);
            setRound(r=>r+1);
        },1000);
    };

    const rightFunction=()=>{
        setStat({
            ...stat,
            [game[right].name]:stat[game[right].name]+1
        });
        setNextGame((prev) => prev.concat(game[right]));
        setRightBorder(true);
            setTimeout(()=>{
                setRightBorder(false);
                setRound(r=>r+1);
            },1000);
    };

    //평소 페이지
    return <div className='game__box'>
        <p className='head__title'>이상형 월드컵 {round + 1} / {game.length / 2}&nbsp;&nbsp; <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className={`img__box ${borderLeft}`}>
                <img src={game[left].src} onClick={leftFunction} />
                <div className='img__name'>{game[round*2].name}</div>
            </div>
            <div className={`img__box ${borderRight}`}>
                <img src={game[right].src} onClick={rightFunction}/>
                <div className='img__name'>{game[round*2+1].name}</div>
            </div>
        </div>
    </div>;
}

export default Worldcup;