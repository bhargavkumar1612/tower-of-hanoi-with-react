import { Component } from "react"
import './index.css'

function range(m,n){
    let l = []
    for(let i=m;i<=n;i++){
        l.push(i)
    }
    return l
}

class StatusBar extends Component{
    render(){
        const {moves,n,onReset,onSolve,errMsg,onSelectN} = this.props
        return (<div className="status-bar">
            <select className='select-n' onChange={onSelectN}>
                {range(3,8).map((i)=>(<option key={i} value={i} selected={i===8}>{i}</option>))}
            </select>
            <div className="moves">
                <p>
                    Moves:<span className="moves-span">{moves}</span>/<span className="move-total">{2**n-1}</span>
                </p>
            </div>
            <button className="reset-btn" onClick={onReset}>Reset</button>
            <button className="solve-btn" onClick={onSolve}>Solve</button>
            <p className="err-msg">{errMsg}</p>
        </div>)
    }
}

export default StatusBar