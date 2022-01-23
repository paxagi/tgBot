const util = require('util');
const exec = util.promisify(require('child_process').exec)

// запуск команды (в cmd?)
async function runCommand(command) {
  const { stdout, stderr, error } = await exec(command)
  if (stderr) { console.error('stderr:', stderr) }
  if (error) { console.error('error:', error) }
  return stdout; // стандартный вывод
}

const commands = {
  shutdown: (compName) => `shutdown /s -t 1 -m \\\\${compName}`,
}

async function pcoff(compName) {
  const command = commands.shutdown(compName)
  const result = await runCommand(command)
}
module.exports = {
  pcoff: pcoff
}

