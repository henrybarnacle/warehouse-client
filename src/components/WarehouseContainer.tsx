import { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { Warehouse } from '../model/Warehouse';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { getItems, removeItem, selectItem, editItem, showDelete, showEdit } from '../globalState/warehouses';

export const WarehouseContainer = (props: any) => {
    useEffect(() => {
       props.getItems();
    },[])
    const onClickDelete = (item: Warehouse) => {
        props.selectItem(item);
        props.showDelete(true);
    }
    const onClickEdit = (item: Warehouse) => {
        props.selectItem(item);
        props.showEdit(true);
    }

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
            {props.list.map((entry: Warehouse) => {
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
                    <Button color="success" size="sm" className="mr-2 action-button" onClick={() => {onClickEdit(entry)}}>Edit</Button>
                    <Button color="danger" size="sm" className="mr-2 action-button" onClick={() => {onClickDelete(entry)}}>Delete</Button>
                  </td>
                </tr>
                )
              }
              )}
          </tbody>
        </Table>
        <Button color="primary" size="sm" className="mr-2 update-buttons">Create</Button>
<div id="main"> MAIN</div>
        <EditModal editVisible={props.editVisible} showEdit={props.showEdit} editItem={props.editItem} getItems={props.getItems} selectedItem={props.selectedItem}/>
        <DeleteModal deleteVisible={props.deleteVisible} showDelete={props.showDelete} removeItem={props.removeItem} selectedItem={props.selectedItem} />
      </div>
    );
}

const mapStateToProps = (state: any) => {
    return { list: state.warehouses.list,
             selectedItem: state.warehouses.selectedItem, 
             deleteVisible: state.warehouses.deleteVisible, 
             editVisible: state.warehouses.editVisible };
};
  
const mapDispatchToProps = {
    getItems,
    removeItem, 
    editItem,
    selectItem,
    showDelete,
    showEdit
  };
  
const WarehouseContainerRedux = connect(mapStateToProps, mapDispatchToProps)(WarehouseContainer);
  
export default WarehouseContainerRedux;

