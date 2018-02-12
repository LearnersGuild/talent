import React, { Component } from 'react';
import './index.css';

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <ul>
          <li>CONTACT US</li>
          <hr />
          <li>general inquiries: info@learnersguild.org</li>
          <li>applicants: enrollment@learnersguild.org</li>
          <li>partnerships: info@learnersguild.org</li>
          <li>492 Ninth Street (Garden Level)</li>
          <li>Oakland, CA 94607</li>
        </ul>
      </div>
    );
  }
}
