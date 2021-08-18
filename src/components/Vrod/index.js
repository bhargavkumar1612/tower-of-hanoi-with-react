import {Component} from "react"
import "./index.css"
import GamePiece from "../GamePiece"

class Vrod extends Component {
    render(){
        const {id, pieces, onDragStartFunction,onDragEndFunction} = this.props
        return (<div className="game-div" key={id} id={`game-div${id}`}>
                    <div className="vrod"></div>
                    <div className="pieces-div">
                        {pieces.reverse().map((length)=><GamePiece key={length} length={length} onDragStartFunction={onDragStartFunction} onDragEndFunction={onDragEndFunction}/>)}
                    </div>
                </div>)
    }
}
export default Vrod