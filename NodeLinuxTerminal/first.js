console.log("NODE JS LINUX LIKE TERMINAL")
let readline = require("readline")
let process = require('process');
let InitDir = process.cwd();
const BASH_FILE = 'PS1.sh'
const LINUX_PS1 = `${InitDir}/${BASH_FILE}`

let rl = readline.createInterface(process.stdin, process.stdout)

function changeDir(Dir) {
    try {
        process.chdir(Dir);
    } catch (e) {
        console.log(e);
    }
}

function ConsoleOut(msg) {
    console.log(msg)
}

var exec = require('child_process').exec;
function execute(command, callbacks) {
    let arg = arguments
    let words = String(command).split(' ');//split the cmd
    let cmd = words[0];
    if (cmd === 'cd') {
        let Dir = command.replace('cd', '').trim();
        callbacks[1](Dir);
        return;
    }

    exec(command, function (error, stdout, stderr) {//error is nodejs error
        if (!(command === LINUX_PS1)) {
            stdout && callbacks[0](stdout)
            stderr && callbacks[0](stderr)
        }
        else {
            let str = String(stdout)
            str = str.replace(' ', "");
            rl.setPrompt(str);
            rl.prompt();
            return;
        }
    });
};
execute(LINUX_PS1);

rl.on('line', (line) => {
    execute(line, [ConsoleOut, changeDir])
    execute(LINUX_PS1)
})

