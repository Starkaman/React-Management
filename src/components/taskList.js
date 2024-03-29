import React, { Component } from "react";
import Item from './taskItem'

class List extends Component {
  render() {
    var {tasks} = this.props
    var elementTasks= tasks.map((task, index) =>{
      return <Item 
      key ={tasks.id} 
      index ={index} 
      task = {task}
      onUpdateStatus = {this.props.onUpdateStatus}
      onDelete = {this.props.onDelete}
      onUpdate = {this.props.onUpdate}
      />
    })
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <select className="form-control">
                <option value="-1">Tất Cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
        {elementTasks}
        </tbody>
      </table>
    );
  }
}

export default List;
