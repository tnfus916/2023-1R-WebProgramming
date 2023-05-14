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
import { useEffect,useState } from 'react'
import './Worldcup.css'

function Worldcup(){
    const candidate=[
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
    ]

    const [game,setGame]=useState([]);
    const [round,setRound]=useState(0);
    const [nextGame,setNextGame]=useState([]);
    const [leftBorder, setLeftBorder]=useState(false);
    const [rightBorder, setRightBorder]=useState(false);
    const borderRight=rightBorder?'border':'';
    const borderLeft=leftBorder?'border':'';
    
    useEffect(()=>{
        setGame(candidate.map(c=>{
            return {name:c.name,src:c.src,order:Math.random()}
        }).sort((l,r)=>{
            return l.order-r.order;
        }));
    },[]); // 맨 처음 렌더링 될 때만 실행

    useEffect(()=>{
        if(game.length>1 && round+1>game.length/2){
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    },[round]); //round가 바뀔 때마다 실행

    if (game.length===1){
        return <div className='img__box'>
            <p className='head__title result'>오늘의 땡기는 음식은!</p>
            <img src={game[0].src}/><div className='img__name'>{game[0].name}</div>
        </div>
    } 

    if (game.length===0 || round+1>game.length/2) return <p>로딩중입니다</p>;
    return <div className='game__box'>
            <p className='head__title'>음식 취향 월드컵 {round +1} / {game.length / 2}&nbsp;&nbsp;<b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
            <div className={`img__box ${borderLeft}`}>
                <img src={game[round*2].src} onClick={()=>{
                    setNextGame((prev) => prev.concat(game[round * 2])); //배열추가
                    setLeftBorder(true);
                    setTimeout(()=>{
                        setLeftBorder(false);
                        setRound(r=>r+1);
                    },3000);
                }}/>
                <div className='img__name'>{game[round*2].name}</div>
            </div>
            <div className={`img__box ${borderRight}`}>
                <img src={game[round*2+1].src} onClick={()=>{
                    setNextGame((prev) => prev.concat(game[round * 2+1])); //배열추가
                    setRightBorder(true);
                    setTimeout(()=>{
                        setRightBorder(false);
                        setRound(r=>r+1);
                    },3000);
                }}/>
                <div className='img__name'>{game[round*2+1].name}</div>
            </div>
        </div>
}
export default Worldcup;