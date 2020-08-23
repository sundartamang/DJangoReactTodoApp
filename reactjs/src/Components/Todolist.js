import React,{Component} from 'react'
import TodolistComponent from './TodolistComponent'
import ItemlistComponent from './ItemlistComponent'

class Todolist extends React.Component{
    constructor(){
        super()
        this.state ={
            todolist:[],
            activeitem:{
                id:null,
                title:'',
                complete:false
            },
            editing:false,
        }
        this.fetchTask = this.fetchTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getToken = this.getToken.bind(this)
        this.editItem = this.editItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.strikeUnstrike = this.strikeUnstrike.bind(this)
    }
    componentWillMount(){
        this.fetchTask()
    }
    // fetch data fucntion
    fetchTask(){
        fetch('http://127.0.0.1:8000/')
        .then(response => response.json())
        .then(data =>{
            
            this.setState({
                todolist:data
            })
        })
    }
    // handelevent
    handleChange(event){
        const {name,value} = event.target
        console.log("Vaue is = ",value)
        console.log("Name is  =", name)
        this.setState({
            activeitem:{
                ...this.state.activeitem,
                [name]:value,
            }
        })
    }
    // get csrf toekn fucntion
    getToken(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    // submit data
    handleSubmit(e){
        e.preventDefault()
        console.log("Item = ", this.state.activeitem)
        const csrftoken = this.getToken('csrftoken')

        var url = 'http://127.0.0.1:8000/add-item/'

        if(this.state.editing == true){
            url = `http://127.0.0.1:8000/update/${ this.state.activeitem.id}/`
            console.log("URL",url)
            this.setState({
                editing:false
            })
        }
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type' : 'application/json',
                'X-CSRFToken': csrftoken
            },
            body:JSON.stringify(this.state.activeitem
            )
        }).then((response)=> {
            this.fetchTask()
            this.setState({
                activeitem:{
                    id:null,
                    title:'',
                    complete:false
                },
            })

        }).catch(function(error){
            console.log("Error : ",error)
        })
    }
    // edit function
    editItem(item){
        console.log("Selected item :",item)
        this.setState({
            activeitem:item,
            editing:true,
        })
    }
    // delete function
    deleteItem(item){
        var url = `http://127.0.0.1:8000/delete/${item.id}/`
        const csrftoken = this.getToken('csrftoken')
        fetch(url, {
            method:'DELETE',
            headers:{
                'Content-type' : 'application/json',
                'X-CSRFToken': csrftoken
            },
        }).then((response)=>{
            this.fetchTask()
        })
    }
    // complete and uncomplete task
    strikeUnstrike(item){
        item.complete = !item.complete
        console.log("Task =",item.complete)
        console.log("Title =",item.title)
        const csrftoken = this.getToken('csrftoken')
        var url = `http://127.0.0.1:8000/update/${item.id}/`
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type' : 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({'complete':item.complete, 'title':item.title})
        }).then(()=>{
            this.fetchTask()
        })
    }
    render(){
        var item = this.state.todolist.map(item => <TodolistComponent 
                item={item} 
                editItem={this.editItem}
                deleteItem = {this.deleteItem}
                strikeUnstrike ={this.strikeUnstrike}
            />)
        return(
            <div className="todo-item">
                <ItemlistComponent 
                    handleChange={this.handleChange} 
                    sfsfs
                    handleSubmit={this.handleSubmit} 
                    activeitem={this.state.activeitem}
                />
                <hr />
                {item}
            </div>
        )
    }
}
export default Todolist