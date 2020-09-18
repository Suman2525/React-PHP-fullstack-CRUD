import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            fullname: '',
            gender: '',
            dob: '',
            address: '',
            contact: '',
            email: '',
            password: '',
            language: [],
            country: '',
            files: []
        }
    }

    handleChange = (e) => {
        let index;
        if (e.target.name == 'language') {
            if (e.target.checked) {
                this.state.language.push(e.target.value);
            }
            else {
                index = this.state.language.indexOf(+e.target.value);
                this.state.language.splice(index, 1);
            }
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        let headers = new Headers();
        headers.append('Content-type','application/json');      
        headers.append('Access-Control-Allow-Origin','*');      

        axios.post('http://localhost/suman_php/CIfullStack/SignUpController/insertData',
            {
                id: this.state.id,
                name: this.state.fullname,
                gender: this.state.gender,
                dob: this.state.dob,
                address: this.state.address,
                contact: this.state.contact,
                email: this.state.email,
                password: this.state.password,
                language: this.state.language,
                country: this.state.country,
            },
            {headers}
        )
            .then(response => {
                // console.log(response)
                if (response.data.success == "1") {
                    swal('Success!', response.data.msg, 'success');
                }
                else {
                    swal('Error!', response.data.msg, 'error');
                }
            })
            .catch(err => {
                swal('Error!', 'Something went wrong', 'error')
            })

    }

    handleFileUpload = (e) => {
        if (e.target.files.length > 0) {
            let formData = new FormData();
            for (let i = 0; i < e.target.files.length; i++) {
                formData.append('files[' + i + ']', e.target.files[i], e.target.files[i].name);
            }

            axios.post('http://localhost/suman_php/CIfullStack/SignUpController/uploadFile', formData)
                .then(response => {
                    // console.log(response.data.id)
                    if (response.data.success == 1) {
                        this.setState({ id: response.data.id });
                        swal('Success!', response.data.msg, 'success');
                    }
                    else {
                        swal('Error!', response.data.msg, 'error');
                    }
                })
                .catch(err => {
                    console.log(err);
                    // swal('Error!','Something went wrong','error');  
                })

        }


    }


    render() {
        return (
            <React.Fragment>
                <form className="form-horizontal" onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Name</label>

                                    <input type="text" class="form-control" name="fullname" placeholder="Enter Name" value={this.state.fullname} onChange={this.handleChange} />

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Gender</label>&nbsp;&nbsp;

                                        <label class="radio-inline"><input type="radio" value="Male" name="gender" onChange={this.handleChange} />Male</label>
                                    <label class="radio-inline"><input type="radio" value="Female" name="gender" onChange={this.handleChange} />Female</label>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Date Of Birth</label>

                                    <input type="date" class="form-control" name="dob" placeholder="Date Of Birth" value={this.state.dob} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Address</label>

                                    <input type="text" class="form-control" name="address" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Contact</label>

                                    <input type="text" class="form-control" name="contact" placeholder="Enter Contact Number" value={this.state.contact} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Email</label>

                                    <input type="email" class="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Password</label>

                                    <input type="password" class="form-control" name="password" placeholder="Enter email" value={this.state.password} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Language</label>&nbsp;&nbsp;

                                        <label class="checkbox-inline"><input type="checkbox" name="language" value="Bengali" onChange={this.handleChange} />Bengali</label>
                                    <label class="checkbox-inline"><input type="checkbox" name="language" value="Hindi" onChange={this.handleChange} />Hindi</label>
                                    <label class="checkbox-inline"><input type="checkbox" name="language" value="English" onChange={this.handleChange} />English</label>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Country</label>&nbsp;&nbsp;
                                <select name="country" onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Upload File</label>
                                    <input type="file" name="files[]" onChange={this.handleFileUpload} multiple={true}></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <input type="submit" class="btn btn-info" value="Submit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default Signup;