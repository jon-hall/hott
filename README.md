## hott
##### Simple global hotkeys for Windows, with node

### Install
---
```sh
npm i hott -g
```

### Configuration
---
Hott currently has to be manually configured in the `.hott` file found in your home directory (`%USERPROFILE%`).  The basic structure of a hotkey config file is:

```json
[{
	"key": "VK_KEY_K",
	"modifiers": ["MOD_CONTROL", "MOD_SHIFT"],
	"cmd": "start chrome"
}]
```

- key: The [virtual key code identifier](http://www.kbdedit.com/manual/low_level_vk_list.html) for the key that the hotkey is bound against.
- modifiers: (optional) An array of modifier keys (currently, it must be an array even if it only had one item). Valid modifier keys are `MOD_SHIFT`, `MOD_ALT`, and `MOD_CONTROL`.
- cmd: A string which will be executed using `child_process.exec` when the hotkey is triggered.

### How it works
---
Hott uses native winapi methods to register global hotkeys, and monitors them using a daemonised process that always runs in the background.  You can manually stop and restart the daemon using:
```sh
hott stop
```
and
```sh
hott start
```

### Roadmap
---
Features which should be coming soon:
- CLI actions for adding, modifying and removing shortcuts more easily
- More flexible `cmd` options supporting inline JS and `spawn` support.
- Watching the `.hott` file for changes and refreshing the daemon as required.
