const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
  const { stdout, stderr, error } = await exec(command);
  if(stderr){console.error('stderr:', stderr);}
  if(error){console.error('error:', error);}
  return stdout;
}


async function pc11off () {

    const command = `shutdown /s -t 1 -m \\\\comp11`;
		const result = await runCommand(command);
//		bot.sendMessage(chatId, "_result", result);
//    const result = await runCommand(command);
//    console.log("_result", result);

}
module.exports = {
    pc11off: pc11off
};

//pcoff();

