import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Alert } from 'react-bootstrap';

import { toggleProvider } from '../hoc/Toggle';
import generatorState from '../utils/generatorState';
import actions from '../constants/actions';
import generator from '../generator/index';

import Form from './Form';

const shell = require('electron').shell;

import { getRootPath } from '../utils/pathHelper';

class App extends Component {

  state = generatorState();


  handleSubmit = (formValues) => {
    try {
      generator(formValues.name, formValues.path, this.props.toggled);
    } catch (error) {
      this.setState(generatorState({ error: error.message }));
      return;
    }
    this.setState(generatorState({ success: 'Successfully generated' }));
  };

  renderContent = () => {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} template={this.props.toggled} />
      </div>
    );
  };

  render() {
    const { toggled, toggle } = this.props;

    getRootPath();
    return (
      <div style={{ padding: '10px' }}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" onClick={() => toggle()}>React Boilerplate Generator &nbsp;
                <small>0.0.1</small>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={() => toggle(actions.MODULE)} href="#">Module</NavItem>
              <NavItem onClick={() => toggle(actions.DUCKULE)} href="#">Duck Module</NavItem>
              <NavDropdown title="Atomic" id="basic-nav-dropdown">
                <MenuItem onClick={() => toggle(actions.ATOM)}>Atom</MenuItem>
                <MenuItem onClick={() => toggle(actions.MOLECULE)}>Molecule</MenuItem>
                <MenuItem onClick={() => toggle(actions.ORGANISM)}>Organism</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={() => toggle(actions.DUMB)}>Dumb component</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem onClick={() => toggle(actions.CLASS)} href="#">Class</NavItem>
              <NavItem onClick={() => toggle(actions.CONTAINER)} href="#">Container</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ padding: '0 20px' }}>
          {this.state.showPopup &&
          <Alert bsStyle={this.state.style} onDismiss={() => this.setState(generatorState())}>
            <p>{this.state.message}</p>
          </Alert>
          }
          {toggled && this.renderContent()}
          {!toggled && <div>
            <h1>
              Julius Koronci &lt;jk@web-solutions.sk&gt;
              <a onClick={() => {
                shell.openExternal('http://www.web-solutions.sk')
              }
              } href="#">www.web-solutions.sk</a>
            </h1>
            <p>A simple Gui tool created to ease React development, especially working with boilerplate code</p>
          </div>}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  toggled: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default toggleProvider(App);
