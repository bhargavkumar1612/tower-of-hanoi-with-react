import {Component} from "react"
import "./index.css"
import Table from "../Table"
import Vrod from '../Vrod'
import StatusBar from "../StatusBar"

function range(n){
    let l = []
    for(let i=1;i<=n;i++){
        l.push(i)
    }
    return l
}

function hanoiSol(n){
    let sol = []
    let hanoi = function(disc,src,aux,dst) {
        if (disc > 0) {
            hanoi(disc - 1,src,dst,aux);
            sol.push([src , dst]);
            hanoi(disc - 1,aux,src,dst);
        }
    }
    hanoi(n,0,1,2);
    return sol
}

class Toh extends Component {
    state = {r0: range(8), r1:range(0),r2:range(0),start:null,n:8,moves:0,errMsg:""}

    I

    onSelectN=(e)=>{
      this.setState({r0:range(e.target.value),r1:range(0),r2:range(0),n:e.target.value,moves:0,errMsg:""})
    }

    reset = ()=>{
        const {n} = this.state
        clearInterval(this.I)
        this.setState({r0: range(n), r1:range(0),r2:range(0),start:null,moves:0,errMsg:""})
    }

    solve = ()=>{
        const {n} = this.state
        const sol = hanoiSol(n)
        clearInterval(this.I)
        this.reset()
        let i=0
        let f,l
        this.I = setInterval(() => {
            [f,l]=sol[i]
            if(f===0 && l===1){
                const {r0,r1,moves}=this.state
                this.setState({r0:r0.slice(1),r1:[r0[0],...r1] ,moves:moves+1})
            }else if(f===1 && l===0){
                const {r0,r1,moves}=this.state
                this.setState({r1:r1.slice(1),r0:[r1[0],...r0] ,moves:moves+1})
            }else if(f===0 && l===2){
                const {r0,r2,moves}=this.state
                this.setState({r0:r0.slice(1),r2:[r0[0],...r2] ,moves:moves+1})
            }else if(f===2 && l===0){
                const {r2,r0,moves}=this.state
                this.setState({r2:r2.slice(1),r0:[r2[0],...r0] ,moves:moves+1})
            }else if(f===2 && l===1){
                const {r2,r1,moves}=this.state
                this.setState({r2:r2.slice(1),r1:[r2[0],...r1] ,moves:moves+1})
            }else if(f===1 && l===2){
                const {r1,r2,moves}=this.state
                this.setState({r1:r1.slice(1),r2:[r1[0],...r2] ,moves:moves+1})
            }
            i+=1
            if(i===sol.length){
                clearInterval(this.I)
            }
        }, 500);
    }

    onDragStartFunction = (event)=>{
        if(event.type==="touchstart"){
            let strt = this.getNearestElement(event.changedTouches[0].clientX)
            this.setState({start: strt})
        }
        else if(event.type==="dragstart"){
            let strt = this.getNearestElement(event.clientX)
            this.setState({start: strt})
        }
    }

    onDragEndFunction = (event)=>{
        const {start} = this.state
        let end;
        if(event.type==="touchend"){
            end = this.getNearestElement(event.changedTouches[0].clientX)
        }
        else if(event.type==="dragend"){
            end = this.getNearestElement(event.clientX)
        }
        let startList = this.state[`r${start}`]
        let endList = this.state[`r${end}`]
        let {moves} = this.state
        moves+=1
        if(start===0 && end===1){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r0:startList.slice(1),r1:[startList[0], ...endList],moves:moves,errMsg:""})
            }
        }
        else if(start===1 && end===0){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r1:startList.slice(1),r0:[startList[0], ...endList],moves:moves,errMsg:""})                
            }
        }
        else if(start===0 && end===2){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r0:startList.slice(1),r2:[startList[0], ...endList],moves:moves,errMsg:""})                
            }
        }
        else if(start===2 && end===0){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r2:startList.slice(1),r0:[startList[0], ...endList],moves:moves,errMsg:""})                
            }
        }
        else if(start===1 && end===2){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r1:startList.slice(1),r2:[startList[0], ...endList],moves:moves,errMsg:""})                
            }
        }
        else if(start===2 && end===1){
            if(startList[0]>endList[0]){
                this.setState({errMsg:"Not Allowed"})
            }else{
                this.setState({r2:startList.slice(1),r1:[startList[0], ...endList],moves:moves})                
            }
        }
    }

    getNearestElement = (x)=>{
        for (let i=0;i<3;i++){
            if (this.gameDivCords[i].left<=x && x<=this.gameDivCords[i].right){
                return i
            }
        }
    }

    componentDidMount(){
            let gameDivs = document.querySelectorAll(".game-div")
            this.gameDivCords = []
            for(let div of gameDivs){
                this.gameDivCords.push(div.getBoundingClientRect())
            }
    }


    render(){
        const {r0,r1,r2,n,moves,errMsg} = this.state
        return (<div className="main">
                    <h1 className="game-title">Tower of Hanoi</h1>
                    <StatusBar onSelectN={this.onSelectN} n={n} moves={moves} errMsg={errMsg} onReset={this.reset} onSolve={this.solve}/>
                    <div className="game-area">
                        <Vrod id='1' pieces={r0} onDragStartFunction={this.onDragStartFunction} onDragEndFunction={this.onDragEndFunction}/>
                        <Vrod id='2' pieces={r1} onDragStartFunction={this.onDragStartFunction} onDragEndFunction={this.onDragEndFunction}/>
                        <Vrod id='3' pieces={r2} onDragStartFunction={this.onDragStartFunction} onDragEndFunction={this.onDragEndFunction}/>
                    </div>
                    <Table/>
                </div>)
    }
}
export default Toh