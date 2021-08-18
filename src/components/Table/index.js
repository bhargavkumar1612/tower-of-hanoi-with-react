import {Component} from "react"
import "./index.css"

class Table extends Component {
    state = {stripes: 20}
    render(){
        const {stripes} = this.state
        let stripesArr = []
        for(let i=0;i<stripes;i++){
            stripesArr.push(i)
        }
        return <div className="table">
            {stripesArr.map((_)=>{
                return <div className="table-stripe" key={_}></div>
            })}
        </div>
    }
}
export default Table