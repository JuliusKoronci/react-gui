import actions from '../constants/actions';
import createComponent from './component/createComponent';
import createDuckule from './ducks/createDuckule';
import createModule from './module/createModule';


export default (name, path, type) => {

  const operations = {
    [actions.MODULE]: () => createModule(name, path),
    [actions.CLASS]: () => createComponent(name, path),
    [actions.DUMB]: () => createComponent(name, path, undefined, true),
    [actions.MOLECULE]: () => createComponent(name, path, 'molecules'),
    [actions.ATOM]: () => createComponent(name, path, 'atoms', true),
    [actions.ORGANISM]: () => createComponent(name, path, 'organisms'),
    [actions.DUCKULE]: () => createDuckule(name, path),
  };
  if (!operations[type]) {
    throw new Error(`Undefined operation ${type}`)
  }
  return operations[type]();
}
