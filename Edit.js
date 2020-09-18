import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            // id: '',
            // fullname: '',
            // gender: '',
            // dob: '',
            // address: '',
            // contact: '',
            // email: '',
            // language: [],
            // country: '',
            // files: [],
            // userdata: [],
            userdata: {
                id: '',
                name: '',
                gender: '',
                dob: '',
                address: '',
                contact: '',
                email: '',
                language: [],
                country: '',
                files: [],
            }
        }
    }

    componentDidMount() {
        // alert(this.props.location.id)
        axios.post('http://localhost/suman_php/CIfullStack/SignUpController/getDataByID', {
            userID: this.props.location.id
        })
            .then(response => {
                if (response.data.success == 1) {
                    // console.log(response.data.userdata);
                    let userdata = response.data.userdata[0];
                    let str = userdata.language;
                    userdata.language = str.split(",");

                    this.setState({ userdata: userdata }, () => {
                        // console.log('userdata', this.state.userdata);
                    });

                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log('Err', err);
            })
    }

    handleChange = (e) => {
        let index;
        let userdata = this.state.userdata;

        // alert('aa');
        if (e.target.name == 'language') {
            // if (e.target.checked) {
            //     this.state.userdata.language.push(e.target.value);
            // }
            // else {
            //     index = this.state.userdata.language.indexOf(+e.target.value);
            //     this.state.userdata.language.splice(index, 1);
            // }
            if (userdata.language.indexOf(e.target.value) > -1) {
                let language = userdata.language.filter((item, i) => {
                    if (item == e.target.value)
                        return false;
                    else
                        return true;
                });
                userdata.language = language;
            } else {
                userdata.language.push(e.target.value)
            }
    
            this.setState({ userdata: userdata }, () => {
    
            });
        }
        else {
            userdata[e.target.name] = e.target.value;
            this.setState({ userdata })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.userdata);
        // return;
        axios.post('http://localhost/suman_php/CIfullStack/SignUpController/editData', {
            id: this.state.userdata.id,
            name: this.state.userdata.name,
            gender: this.state.userdata.gender,
            dob: this.state.userdata.dob,
            address: this.state.userdata.address,
            contact: this.state.userdata.contact,
            email: this.state.userdata.email,
            language: this.state.userdata.language,
            country: this.state.userdata.country,

        })
            .then(response => {
                console.log(response)
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
            formData.append('id', this.state.userdata.id);

            axios.post('http://localhost/suman_php/CIfullStack/SignUpController/editUploadFile', formData)
                .then(response => {
                    console.log(response.data.id)
                    if (response.data.success == 1) {
                        // this.setState({ id: response.data.id });
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

                                    <input type="text" class="form-control" name="name" placeholder="Enter Name" value={this.state.userdata.name} onChange={this.handleChange} />

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Gender</label>&nbsp;&nbsp;

                                        <label class="radio-inline"><input type="radio" value="Male" checked={this.state.userdata.gender == "Male" ? this.state.userdata.gender : ''} name="gender" onChange={this.handleChange} />Male</label>
                                    <label class="radio-inline"><input type="radio" value="Female" checked={this.state.userdata.gender == "Female" ? this.state.userdata.gender : ''} name="gender" onChange={this.handleChange} />Female</label>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Date Of Birth</label>

                                    <input type="date" class="form-control" name="dob" placeholder="Date Of Birth" value={this.state.userdata.dob} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Address</label>

                                    <input type="text" class="form-control" name="address" placeholder="Enter Address" value={this.state.userdata.address} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Contact</label>

                                    <input type="text" class="form-control" name="contact" placeholder="Enter Contact Number" value={this.state.userdata.contact} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Email</label>

                                    <input type="email" class="form-control" name="email" placeholder="Enter email" value={this.state.userdata.email} onChange={this.handleChange} />

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">Language</label>&nbsp;&nbsp;

                                        <label class="checkbox-inline"><input type="checkbox" name="language" value="Bengali" checked={this.state.userdata.language.indexOf("Bengali") > -1} onChange={this.handleChange} />Bengali</label>
                                    <label class="checkbox-inline"><input type="checkbox" name="language" value="Hindi" checked={this.state.userdata.language.indexOf("Hindi") > -1} onChange={this.handleChange} />Hindi</label>
                                    <label class="checkbox-inline"><input type="checkbox" name="language" value="English" checked={this.state.userdata.language.indexOf("English") > -1} onChange={this.handleChange} />English</label>

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
                                    <img src={"http://localhost/suman_php/CIfullStack/uploads/" + this.state.userdata.files} height="100px" width="100px"></img>
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

export default Edit;