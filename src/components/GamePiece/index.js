import {Component} from "react"
import "./index.css"

const colors = ["rgba(81, 151, 231, 0.9)","rgba(231, 149, 81, 0.9)","rgba(231, 204, 81, 0.9)",
                "rgba(129, 231, 81, 0.9)","rgba(81, 231, 174, 0.9)","rgba(81, 184, 231, 0.9)",
                "rgb(39, 151, 105, 0.9)","rgb(96, 71, 119, 0.9)","rgb(202, 75, 86, 0.9)"]
class GamePiece extends Component {
    render(){
        const {onDragStartFunction,onDragEndFunction,length} = this.props
        return (<div className={`game-piece`} 
                    style={{width:`${length}0%`,backgroundColor:colors[length]}} 
                    onTouchStart={onDragStartFunction}
                    onDragStart={onDragStartFunction} 
                    onDragEnd={onDragEndFunction}
                    onTouchEnd={onDragEndFunction}
                    // onDragOver={(e)=>e.preventDefault()} 
                    // onTouchMove={(e)=>e.preventDefault()} 
                    draggable>
                </div>)
    }
}
export default GamePiece