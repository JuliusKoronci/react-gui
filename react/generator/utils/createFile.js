import shell from 'shelljs';

export default function(content, path) {
  if (shell.test('-e', path)) {
    throw new Error(`path(${path}) is not empty, generation aborted. Please remove any unwanted files`)
  }
  shell.ShellString(content).to(path);
}
