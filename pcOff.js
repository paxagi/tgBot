// const util = require('util');
import * as util from 'util'
import { exec } from 'child_process'
const exe = util.promisify(exec)

// запуск команды (в cmd?)
async function runCommand(command) {
  const { stdout, stderr, error } = await exe(command)
  if (stderr) { console.error('stderr:', stderr) }
  if (error) { console.error('error:', error) }
  return stdout; // стандартный вывод
}

const commands = {
  shutdown: (compName) => `shutdown /s -t 1 -m \\\\${compName}`,
}

export async function pcoff(compName) {
  const command = commands.shutdown(compName)
  const result = await runCommand(command)
}

