import React from "react";
import { IState } from "./crudstates";
import { IProps } from "./crudprops";
import './crud.css';

export class Crud extends React.Component<IProps,IState>
{
    constructor(props:any)
    {
        super(props)
        this.state = {
            name: "",
            age: "",
            date: "",
            peopleArray:[]
        }
        console.log("Test"); }

    private Count = 1;
    private StoreID : any;
    private handelsubmit(e :any){
        e.preventDefault();
        let emp = [...this.state.peopleArray]
        emp.push({
            Count : this.Count++ , 
            name : this.state.name , 
            age : this.state.age,
            date : this.state.date 
        });
        this.setState({peopleArray : [...emp]});
    }
    private handeldelete(ID :any){  
      //  ID.preventDefault();
      //  let emp = [...this.state.peopleArray]
        let filtered = this.state.peopleArray.filter((e: { Count: any; }) => e.Count !== ID )
        this.setState({peopleArray : [...filtered]});
    }
    private handeledit(ID :any){
        this.StoreID = ID;  
       
        let emp = [...this.state.peopleArray];
        let FilterData = emp.filter((e)=> e.Count === ID);
        console.log(FilterData);
        this.setState({name: FilterData[0].name , 
             age : FilterData[0].age,
             date: FilterData[0].date });
      }

      private handelEditdata(e :any)
      {
          e.preventDefault();
          const storeindex = this.state.peopleArray.findIndex((index: { Count: any; }) => index.Count === this.StoreID);
          const updateobj = {
              Count : this.StoreID , 
              name : this.state.name ,
              age : this.state.age ,
              date : this.state.date
          };
          this.setState({peopleArray :  [
              ...this.state.peopleArray.slice(0 , storeindex),
              updateobj,
              ...this.state.peopleArray.slice(storeindex + 1 )
          ]});

      }
    public render()
    { 
        const emp = this.state.peopleArray;
        return(
            <div className="App">
            <h2>CRUD UI</h2>
            <form id="form">
            <label>Name : <br/>
            <input 
            type="text" 
            id="name" 
            name="name"
            placeholder="Enter your name" 
            value={this.state.name} 
            onChange={(event) => {   this.setState({ name: event.target.value });
            }} /></label><br/><br/>
            <label>Age : <br/>
               <input 
               type="text" 
               id="age" 
               name="name"
               placeholder="Select your Age"
               value={this.state.age} 
            onChange={(event) => {this.setState({ age: event.target.value });
            }} /></label><br/><br/>
            <label>Date : <br/>
              <input 
              type="date" 
              id="date" 
              name="date"
              value={this.state.date} 
            onChange={(event) => {
                this.setState({ date: event.target.value });
            }}/></label><br/><br/>
            {/* <input type="submit" onClick={handleClick} value="Submit"></input> */}
            <button className="button" onClick={(e)=> this.handelsubmit(e)} >
            Submit 
          </button>
          <button className="button" onClick={(e)=> this.handelEditdata(e)} >
            Update 
          </button>
            </form>
            
    <div className="table">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Date</th>
    </tr>
    </thead>
    <tbody>
        {emp.map((person: any ) => {return (
            <tr key={0}>
                <td>{person.Count}</td>
               <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.date}</td>
                <button className="button" onClick={(e)=> this.handeledit(person.Count)} > Edit </button>
                <button className="button" onClick={(e)=> this.handeldelete(person.Count)} > Delete </button>

            </tr> 
        )})
        }
        </tbody>    
        </div>

            </div>
        );
    }
} 