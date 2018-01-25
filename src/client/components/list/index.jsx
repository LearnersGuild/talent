import React, { Component } from 'react'

export default class List extends Component {

  renderList(list) {
    return list.map(listItem => {
      return (
        <li className="list-group-item" key={listItem.id}>
          {listItem[this.props.type]}
        </li>
      )
    })
  }
    
  render() {
    return (
      <div>
      <h3>{this.props.type.replace(this.props.type.charAt(0), this.props.type.charAt(0).toUpperCase())}</h3>
      <ul className="list-group">
        {this.renderList(this.props.elements)}
      </ul>
    </div>
    )
  }
}