import React,{Component} from 'react'

class TodolistComponent extends React.Component{
    render(props){
        const completedstyle = {
            color:"red",
            textDecoration:"line-through",
            fontStyle:"italic",
        }
        return(
            <div>
                <div className="flex-wrapper">
                    <div style={{flex:5,}} id="title" >
                        <p 
                            style={this.props.item.complete ? completedstyle:null}
                            onClick={()=> this.props.strikeUnstrike(this.props.item)}
                        >
                            {this.props.item.title}
                            
                        </p>
                    </div>
                    <div style={{flex:1}}>
                        <button id="edit" onClick={()=> this.props.editItem(this.props.item)}>
                            Edit
                        </button>
                    </div>
                    <div style={{flex:1}}>
                        <button id="delete" onClick={()=> this.props.deleteItem(this.props.item)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default TodolistComponent