import {Component} from "react"
import "./index.css"

const colors = ["yellow","blue","red","yellowgreen","violet","blueviolet","rgb(39, 151, 105)","rgb(96, 71, 119)","rgb(202, 75, 86)"]
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