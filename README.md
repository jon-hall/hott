## hott
##### Simple global hotkeys for Windows, with node

### Install
```sh
npm i hott -g
```

### Configuration
Hott currently has to be manually configured in the `.hott` file found in your home directory (`%USERPROFILE%`).  The basic structure of a hotkey config file is:

```json
[{
	"key": "VK_KEY_K",
	"modifiers": ["MOD_CONTROL", "MOD_SHIFT"],
	"cmd": "start chrome"
}]
```

- key: The [virtual key code identifier](http://www.kbdedit.com/manual/low_level_vk_list.html) for the key that the hotkey is bound against.
- modifiers: (optional) An array of modifier keys (currently, it must be an array - even if it only has one item). Valid modifier keys are `MOD_SHIFT`, `MOD_ALT`, and `MOD_CONTROL`.
- cmd: A string which will be executed using `child_process.exec` when the hotkey is triggered.

### Programmatic usage
You can also use hott within scripts to establish (currently only **global**) key bindings and exec code, or invoke callbacks, when the hotkeys are pressed.

```js
var hott = require('hott').Api;

// Register a hotkey to execute some code (using child_process.exec)
hott.registerHotkey(
	"VK_NUMPAD5",
	["MOD_SHIFT"],
	"node %USERPROFILE%/Documents/my-script.js --some_param=5",
	function(err, stdout, stderr) {
		// Callback to be passed to child_process.exec
	});

// Now accepting callbacks too
hott.registerHotkey("VK_NUMPAD8", ["MOD_SHIFT"], function onShiftEightPressed() {
	/* ... */
});

// Eval javascript!
hott.registerHotkey("VK_NUMPAD2", ["MOD_ALT"], {js: 'console.log("Yowzah!")'});

// Or spawn a process
hott.registerHotkey("VK_NUMPAD9", ["MOD_CONTROL"], {
	spawn: {
		cmd: 'node',
		args: ['--harmony', './src/index.js'],
		opts: {
			cwd: './src'
		}
	}
});

// You MUST then tell hott to monitor for the hotkeys being pressed!
// You can pass in options if you want (currently only poll-rate, in ms)
hott.monitorHotkeys({ poll: 50 });
```

### How it works
Hott uses native winapi methods to register global hotkeys, and monitors them using a daemonised process that always runs in the background.  You can manually stop and restart the daemon using:
```sh
hott stop
```
and
```sh
hott start
```

### TODO
- CLI actions for adding, modifying and removing shortcuts more easily.
- Watching the `.hott` file for changes and refreshing the daemon as required.
- Non-global key-binding via API.
