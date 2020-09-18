import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';

class MockAPI extends React.Component{

    constructor(){
        super();
        this.state={
            username:'',
            address:''
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit=(e)=>{
        // console.log(this.state)
        axios.post('https://run.mocky.io/v3/fe39c2c0-b3e5-4b24-b998-8226ec02ba15',
        {
            username:this.state.username,
            address:this.state.address
        })
        .then(response=>{
            console.log('Success');
        })
        .catch(err=>{
            console.log('Error ',err);
        })
    }

    render(){
        return(
            <React.Fragment>
                <label>Name</label>
                <input type="text" name="username" placeholder="Enter Name" value={this.state.username} onChange={this.handleChange} />
                <label>Address</label>
                <input type="text" name="address" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} />
                <input type="button" value="SUBMIT" onClick={this.handleSubmit}></input>
                
            </React.Fragment>
        );
    }
}

export default MockAPI;