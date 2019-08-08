import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumber(){
    console.log('getWinNumber');

    const candidate = Array(45).fill().map((v, i) => i+1);
    const shuffle = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p -c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumber(), []); //복잡한 함수의 결과값을 기억
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]); //useRef는 일반적인 값을 기억

    useEffect(() => {
        console.log('useEffect')
        for(let i = 0; i < winNumbers.length - 1; i++){
            timeout.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => 
                    [...prevBalls, winNumbers[i]]
                );                
            }, (i + 1) * 100);
        }

        timeout.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 700);

        return () => {
            timeout.current.forEach((v) => {
                clearTimeout(v);
            })
        }   //return은 componentWillUnmount와 같음
    }, [timeout.current]);  //useEffect의 두번째인자가 []이면 componentDidMount와 같음
    //useEffect의 두번째인자가 있으면 componentDidMount와 componentDidUpdate 수행
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo')
        setWinNumbers(getWinNumber());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
      
        timeout.current = [];
    }, []);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <div id="보너스">
                <Ball number={bonus}/>
            </div>}
            {redo && <button onClick={onClickRedo}>한번더!</button>}
        </>
    );
}

export default Lotto;