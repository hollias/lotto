import React, { PureComponent } from 'react';
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

class Lotto extends PureComponent {
    state = {
        winNumbers: getWinNumber(), //당첨숫자들
        winBalls: [],
        bonus: null,    //보너스공
        redo: false,
    };

    timeout = [];

    runtimeouts = () => {
        const { winNumbers } = this.state;
        for(let i = 0; i < winNumbers.length - 1; i++){
            this.timeout[i] = setTimeout(() => {
                this.setState((prevState) => {                    
                    return {
                        winBalls : [...prevState.winBalls, winNumbers[i]]
                    }
                });
            }, (i + 1) * 100);
        }

        this.timeout[6] = setTimeout(() => {
            this.setState({
                bonus : winNumbers[6],
                redo : true
            });
        }, 700);
    }

    componentDidMount(){
        console.log('componentDidMount start');
        this.runtimeouts();
    }

    componentDidUpdate(prevState){
        console.log('componentDidUpdate start');
        if(this.state.winBalls.length === 0){
            this.runtimeouts();
        }
    }

    componentWillUnmount(){
        this.timeout.forEach((v) => {
            clearTimeout(v);
        })
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumber(), //당첨숫자들
            winBalls: [],
            bonus: null,    //보너스공
            redo: false,
        });

        this.timeout = [];
    }

    render() {
        const { bonus, redo, winBalls } = this.state;
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
                {redo && <button onClick={this.onClickRedo}>한번더!</button>}
            </>
        );
    }
}

export default Lotto;