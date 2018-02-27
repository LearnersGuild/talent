import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeContactForm } from '../../actions';
import './index.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFrom: '',
      emailSubject: '',
      emailBody: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleCloseClick(event) {
    event.preventDefault();
    this.props.closeContactForm();
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: Send form data from state to nodemailer or whatever we decide to use
  }

  render() {
    return (
      <div className="modal-container">
        <div className="contact-form-modal-shadow" onClick={this.handleCloseClick} />
        <div className="contact-form-container">
          <form onSubmit={this.handleSubmit} className="contact-form">
            <button type="button" name="closeContactForm" className="contact-form-button-close" onClick={this.handleCloseClick}>X</button>
            <div className="contact-form-title">Contact Info</div>
            <label className="contact-form-label"> From:&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="contact-form-input" type="text" name="emailFrom" value={this.state.emailFrom} onChange={this.handleChange} />
            </label>
            <label className="contact-form-label"> Subject:&nbsp;
              <input className="contact-form-input" type="text" name="emailSubject" value={this.state.emailSubject} onChange={this.handleChange} />
            </label>
            <label className="contact-form-label message"> Message:&nbsp;
              <br></br>
              <textarea className="contact-form-text-area" name="emailBody" value={this.state.emailBody} onChange={this.handleChange} />
            </label>
            <button type="submit" name="emailFormButton" className="contact-form-button">Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ guild }) {
  return { guild };
};

export default connect(mapStateToProps, { closeContactForm })(ContactForm);
