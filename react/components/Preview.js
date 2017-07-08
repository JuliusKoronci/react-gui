import React, { Component } from 'react';
import PropTypes from 'prop-types';

import indexTemplate from '../generator/templates/indexComponent';
import classTemplate from '../generator/templates/classTemplate';
import dumpTemplate from '../generator/templates/dumpTemplate';
import componentTest from '../generator/templates/componentTest';
import snapshotTest from '../generator/templates/snapshotTest';

import actionTemplate from '../generator/templates/actionTemplate';
import constantsTemplate from '../generator/templates/constantsTemplate';
import reducerTemplate from '../generator/templates/reducerTemplate';
import containerTemplate from '../generator/templates/containerTemplate';
import actionTest from '../generator/templates/actionTest';
import reducerTestTemplate from '../generator/templates/reducerTest';

import indexDuckModule from '../generator/templates/indexDuckModule';
import duckTemplate from '../generator/templates/duckTemplate';
import containerDuckTemplate from '../generator/templates/containerDuckTemplate';

import actions from '../constants/actions';

class Preview extends Component {
  static defaultProps = {
    path: 'defaultPath',
    name: 'EnterName',
  };

  static propTypes = {
    template: PropTypes.string,
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  renderModule = () => {
    const { name, path } = this.props;

    return (
      <div>
        <p>file: {`${path}/index.js`}</p>
        <p>file: {`${path}/constants/${name}Constants.js`}</p>
        <p>file: {`${path}/actions/${name}Actions.js`}</p>
        <p>file: {`${path}/reducers/${name}Reducer.js`}</p>
        <p>file: {`${path}/containers/${name}.js`}</p>
        <p>file: {`${path}/components/${name}.js`}</p>
        <p>file: {`${path}/actions/__tests__/${name}ActionTest.js`}</p>
        <p>file: {`${path}/reducers/__tests__/${name}ReducerTest.js`}</p>
        <p>file: {`${path}/containers/__tests__/${name}SnapshotTest.js`}</p>
        <p>file: {`${path}/components/__tests__/${name}Test.js`}</p>
        <p>file: {`${path}/components/__tests__/${name}SnapshotTest.js`}</p>
        <br />
        <pre>
          {indexTemplate(name)}
        </pre>
        <br />
        <pre>
          {constantsTemplate(name)}
        </pre>
        <br />
        <pre>
          {actionTemplate(name)}
        </pre>
        <br />
        <pre>
          {reducerTemplate(name)}
        </pre>
        <br />
        <pre>
          {containerTemplate(name)}
        </pre>
        <br />
        <pre>
          {classTemplate(name)}
        </pre>
        <br />
        <pre>
          {actionTest(name)}
        </pre>
        <br />
        <pre>
          {reducerTestTemplate(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
        <br />
        <pre>
          {componentTest(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
      </div>
    )
  };
  renderDuckule = () => {
    const { name, path } = this.props;

    return (
      <div>
        <p>file: {`${path}/index.js`}</p>
        <p>file: {`${path}/ducks/${name}Duck.js`}</p>
        <p>file: {`${path}/containers/${name}.js`}</p>
        <p>file: {`${path}/components/${name}.js`}</p>
        <p>file: {`${path}/containers/__tests__/${name}SnapshotTest.js`}</p>
        <p>file: {`${path}/components/__tests__/${name}Test.js`}</p>
        <p>file: {`${path}/components/__tests__/${name}SnapshotTest.js`}</p>
        <br />
        <pre>
          {indexDuckModule(name)}
        </pre>
        <br />
        <pre>
          {duckTemplate(name)}
        </pre>
        <br />
        <pre>
          {containerDuckTemplate(name)}
        </pre>
        <br />
        <pre>
          {classTemplate(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
        <br />
        <pre>
          {componentTest(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
      </div>
    )
  };
  renderDumb = () => {
    const { name, path } = this.props;

    return (
      <div>
        <p>file: {`${path}/index.js`}</p>
        <p>file: {`${path}/${name}.js`}</p>
        <p>file: {`${path}/__tests__/${name}Test.js`}</p>
        <p>file: {`${path}/__tests__/${name}SnapshotTest.js`}</p>
        <br />
        <pre>
          {indexTemplate(name)}
        </pre>
        <br />
        <pre>
          {dumpTemplate(name)}
        </pre>
        <br />
        <pre>
          {componentTest(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
      </div>
    );
  };
  renderComponent = () => {
    const { name, path } = this.props;

    return (
      <div>
        <p>file: {`${path}/index.js`}</p>
        <p>file: {`${path}/${name}.js`}</p>
        <p>file: {`${path}/__tests__/${name}Test.js`}</p>
        <p>file: {`${path}/__tests__/${name}SnapshotTest.js`}</p>
        <br />
        <pre>
          {indexTemplate(name)}
        </pre>
        <br />
        <pre>
          {classTemplate(name)}
        </pre>
        <br />
        <pre>
          {componentTest(name)}
        </pre>
        <br />
        <pre>
          {snapshotTest(name)}
        </pre>
      </div>
    )
  };

  render() {
    const { template } = this.props;
    if (!template) {
      return null;
    }

    if ([actions.CLASS, actions.ORGANISM, actions.MOLECULE].find(item => item === template)) {
      return this.renderComponent()
    }
    if ([actions.DUMB, actions.ATOM].find(item => item === template)) {
      return this.renderDumb()
    }
    if (actions.MODULE === template) {
      return this.renderModule();
    }
    if (actions.DUCKULE === template) {
      return this.renderDuckule();
    }
    return null;
  }
}


export default Preview;
