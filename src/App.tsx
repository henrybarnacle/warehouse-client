import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Warehouse } from './model/Warehouse';

import axios from 'axios';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';

class App extends Component {
  state = {
    warehouses: [] as Warehouse[],
    showEdit: false,
    showDelete: false,
    selectedEdit: null,
    selectedDelete: null
  }
  componentWillMount() {
    axios.get('http://localhost:3001/warehouses').then( data => this.mapWarehouses(data.data));
  }

  mapWarehouses(data: Warehouse[]) {
    console.log(data);
    this.setState({warehouses: data});
  }
  handleShowModal(id: string, action: string) {
    const selected = this.state.warehouses.find((entry) => entry.id === id);
    if (action === 'update') {
      this.setState({selectedEdit: selected, showEdit: true});
    } else if (action === 'delete') {
      this.setState({selectedDelete: selected, showDelete: true});
    }
  }

  modalClose() {
    this.setState({showEdit: false, showDelete: false});
    axios.get('http://localhost:3001/warehouses').then( data => this.mapWarehouses(data.data));
  }

  render() {
      return (
        <div className="App container">
          <hr/>
          <h1>Warehouses</h1>
          <hr/>
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
                  <tr key={entry.id}>
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
                      <Button color="success" size="sm" className="mr-2 action-button"  onClick={() => {this.handleShowModal(entry.id, 'update')}}>Edit</Button>
                      <Button color="danger" size="sm" className="mr-2 action-button" onClick={() => {this.handleShowModal(entry.id, 'delete')}}>Delete</Button>
                    </td>
                  </tr>
                  )
                }
                )}
            </tbody>
          </Table>
          <EditModal selectedEdit={this.state.selectedEdit} showEdit={this.state.showEdit} modalClose={() => {this.modalClose()}}/>
          <DeleteModal selectedDelete={this.state.selectedDelete} showDelete={this.state.showDelete} modalClose={() => {this.modalClose()}}/>
        </div>
      );
   }
}

export default App;
