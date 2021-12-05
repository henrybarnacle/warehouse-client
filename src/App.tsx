import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Warehouse } from './model/Warehouse';

import axios from 'axios';
import EditModal from './components/EditModal';

class App extends Component {
  state = {
    warehouses: [] as Warehouse[],
    showEdit: false,
    selectedEdit: null
  }
  componentWillMount() {
    axios.get('http://localhost:3001/warehouses').then( data => this.mapWarehouses(data.data));
  }

  mapWarehouses(data: Warehouse[]) {
    this.setState({warehouses: data});
  }
  handleShowModal(id: string) {
    const selected = this.state.warehouses.find((entry) => entry.warehouseId === id);
    this.setState({selectedEdit: selected, showEdit: true});
  }
  editClose() {
    this.setState({showEdit: false});
  }

  render() {
      return (
        <div className="App container">
          <Table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.warehouses && this.state.warehouses.map(entry => {
                  return (
                  <tr key={entry.warehouseId}>
                    <td>{entry.warehouseName}</td>
                    <td>{entry.warehouseDescription}</td>
                    <td>
                      <div>{entry.warehouseAddress.buildingName}</div>
                      <div>{entry.warehouseAddress.streetLine1}</div>
                      <div>{entry.warehouseAddress.city}</div>
                      <div>{entry.warehouseAddress.stateProvince}</div>
                      <div>{entry.warehouseAddress.country}</div>
                    </td>
                    <td>
                      <Button color="success" size="sm" className="mr-2" onClick={() => {this.handleShowModal(entry.warehouseId)}}>Edit</Button>
                      <Button color="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
                  )
                }
                )}
            </tbody>
          </Table>
          <EditModal selectedEdit={this.state.selectedEdit} showEdit={this.state.showEdit} editClose={() => {this.editClose()}}/>
        </div>
      );
   }
}

export default App;
