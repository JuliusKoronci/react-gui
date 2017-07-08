import shell from 'shelljs';
import isEmpty from 'is-empty';
import indexTemplate from '../templates/indexModule';
import actionTemplate from '../templates/actionTemplate';
import constantsTemplate from '../templates/constantsTemplate';
import reducerTemplate from '../templates/reducerTemplate';
import containerTemplate from '../templates/containerTemplate';
import createComponent from '../component/createComponent';
import actionTest from '../templates/actionTest';
import reducerTestTemplate from '../templates/reducerTest';
import snapshotTestContainer from '../templates/snapshotTestContainer';
import createFile from '../utils/createFile';

const dirs = [
	'/components',
	'/constants',
	'/containers',
	'/containers/__tests__',
	'/reducers',
	'/reducers/__tests__',
	'/actions',
	'/actions/__tests__',
	'/selectors',
];

const handle = (moduleName, path) => {
	if (isEmpty(path)) {
		path = process.cwd() + '/src/modules';
	}
	path += `/${moduleName}`;
	dirs.forEach((directory) => {
		shell.mkdir('-p', `${path}${directory}`);
	});

	createFile(indexTemplate(moduleName), `${path}/index.js`);
	createFile(constantsTemplate(moduleName), `${path}/constants/${moduleName}Constants.js`);
	createFile(actionTemplate(moduleName), `${path}/actions/${moduleName}Actions.js`);
	createFile(actionTest(moduleName), `${path}/actions/__tests__/${moduleName}ActionsTest.js`);
	createFile(reducerTemplate(moduleName), `${path}/reducers/${moduleName}Reducer.js`);
	createFile(reducerTestTemplate(moduleName), `${path}/reducers/__tests__/${moduleName}ReducerTest.js`);
	createFile(containerTemplate(moduleName), `${path}/containers/${moduleName}.js`);
	createComponent(`${moduleName}`, `${path}/components`);
	createFile(snapshotTestContainer(moduleName), `${path}/containers/__tests__/${moduleName}SnapshotTest.js`);
};

export default handle;
