# Manual

> The rl.prompt() method writes the readline.Interface instances 
configured prompt to a new line in output in order to provide a 
user with a new location at which to provide input.

> When called, rl.prompt() will resume the input stream if it has been paused.
rl.prompt() shows what is set in prompt so user know its input, and takes input if it is paused

> The 'line' event is emitted whenever the input stream receives 
an end-of-line input (\n, \r, or \r\n). This usually occurs when 
the user presses the ```<Enter>```, or ```<Return>``` keys.
