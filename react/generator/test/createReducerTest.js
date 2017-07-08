import shell from 'shelljs';
import isEmpty from 'is-empty';
import reducerTestTemplate from '../templates/reducerTest';
import createFile from '../utils/createFile';

const dirs = [
	'/reducers/__tests__',
];

const handle = (moduleName, path) => {
	if (isEmpty(path)) {
		path = process.cwd() + '/src/__tests__';
	}
	dirs.forEach((directory) => {
		shell.mkdir('-p', `${path}${directory}`);
	});

	createFile(reducerTestTemplate(moduleName), `${path}/reducers/__tests__/${moduleName}ReducerTest.js`);
};

export default handle;
