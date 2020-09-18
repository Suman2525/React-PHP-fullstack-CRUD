import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Welcome extends Component {
    render() {
        return (
            <React.Fragment>
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/view">View</Link></li>
                    <li><Link to="/edit">Edit</Link></li>
                </ul>
                
                {/* <div class="vl"></div> */}

            </React.Fragment>
        );
    }
}

export default Welcome;