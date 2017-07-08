import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, InputGroup, Glyphicon } from 'react-bootstrap';

import Preview from './Preview';

import actions, { header } from '../constants/actions';

const { dialog } = require('electron').remote;

class Form extends Component {
  state = {
    form: {
      name: '',
      path: '',
    },
    pathError: 'success',
  };

  getValidationState = () => {
    const length = this.state.form.name.length;
    if (length > 6) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  };

  shouldShowPath = () => {
    return ![actions.ATOM, actions.ORGANISM, actions.MOLECULE].find((item) => item === this.props.template);
  };

  getDefaultPath = () => {
    if ([
        actions.DUCKULE,
        actions.MODULE,
      ].find((item) => item === this.props.template)) {
      return 'src/modules';
    }
    if (actions.ATOM === this.props.template) {
      return 'src/components/atoms';
    }
    if (actions.MOLECULE === this.props.template) {
      return 'src/components/molecules';
    }
    if (actions.ORGANISM === this.props.template) {
      return 'src/components/organisms';
    }
    return 'src/components';
  };

  hasError = () => {
    if (!this.state.form.name) {
      return true;
    }
    const requiredPath = [actions.TEST, actions.SNAPSHOT].find(item => item === this.props.template);

    if (requiredPath && !this.state.path || this.getValidationState() === 'error') {
      return true;
    }
    return false;
  };

  updateStateError = (hasError = false) => {
    if (hasError) {
      this.setState({
        pathError: 'error',
      });
      return;
    }
    this.setState({
      pathError: 'success',
    });
  };


  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const hasError = this.hasError();
    if (hasError) {
      this.updateStateError(hasError);
      return;
    }

    this.props.onSubmit(this.state.form);
  };

  openDialog = (e) => {
    e.preventDefault();
    dialog.showOpenDialog(
      {
        defaultPath: process.cwd(),
        properties: ['openDirectory'],
      },
      (files) => {
        files && this.handleChange('path', files[0])
      },
    )
  };


  render() {
    const { path, name } = this.state.form;
    const { template } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{header[template]}</h2>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Enter component/module name</ControlLabel>
          <FormControl
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => this.handleChange('name', e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Should be in camel case (MyAwesomeComponent)</HelpBlock>
        </FormGroup>
        {this.shouldShowPath() &&
        <FormGroup
          controlId="formBasicText"
          validationState={this.state.pathError}
        >
          <ControlLabel>Enter optional the path e.g. src/modules/MyModule/components</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <a href="#" onClick={this.openDialog}>
                <Glyphicon glyph="folder-open" />
              </a>
            </InputGroup.Addon>
            <FormControl
              type="text"
              value={path}
              placeholder={this.getDefaultPath()}
              onChange={(e) => this.handleChange('path', e.target.value)}
            />
          </InputGroup>
          <FormControl.Feedback />
          <HelpBlock>
            src/modules is default for modules, src/components is default for components
          </HelpBlock>
        </FormGroup>
        }
        <Button disabled={this.hasError()} bsStyle="success" type="submit">
          Generate
        </Button>
        <hr />
        <Preview template={template} path={path || this.getDefaultPath()} name={name} />
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
};

export default Form;
