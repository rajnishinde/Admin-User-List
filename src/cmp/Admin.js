import React from "react";
import Table from 'react-bootstrap/Table'


class Admin extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
        items: [],
      };
    }
  
    componentDidMount() {
      fetch('http://localhost:5000/api/admin')
        .then(res => res.json())
        .then(result => {
          this.setState({
            items: result.user
          });
        });
        console.log(this.state.items)
    }
  
    render() {
    
        return (
              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email id</th>
                      </tr>
                  </thead>
                  
                  <tbody>
                      {this.state.items.map((item,index) =>(
                         <tr key={index}>
                             <td>{item.id}</td>
                             <td>{item.fname}</td>
                             <td>{item.lname}</td>
                             <td>{item.email}</td>
                         </tr> 
                      ))}  
                  </tbody>
                  
              </Table>
           
        );
    }
  }

  export default Admin;