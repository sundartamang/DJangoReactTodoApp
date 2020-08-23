import React,{Component} from 'react'

class ItemlistComponent extends React.Component{
    render(props){
        return(
            <div id="form-wrapper">
                <p>Item: {this.props.activeitem.title}</p>
                <form id="form" onSubmit={this.props.handleSubmit}>
                    <div className="flex-wrapper">
                        <div style={{flex:6}}>
                            <input  
                                type="text"
                                placeholder="add an item.."
                                name="title" 
                                value={this.props.activeitem.title}
                                onChange={this.props.handleChange}
                            />
                            
                        </div>
                        <div style={{flex:1}}>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default ItemlistComponent