# Step Recorder Chrome Extension

This repository provides two examples:

1. **A Chrome extension** (`chrome_extension` folder) that captures screenshots to
   help you create step-by-step tutorials similar to ScribeHow or WizardShot.
2. **A simple Python plugin system** that demonstrates dynamic loading of
   plugins.

## Installing the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `chrome_extension` directory.

Once loaded, click the extension icon and use **Capture Step** to grab
screenshots of the current tab. Captured images are stored locally and shown
within the popup.

## Python Plugin System

This repository also demonstrates a simple plugin architecture in Python.
Plugins are located in the `plugins` directory and subclass `Plugin` from
`plugin_base.py`. Use `plugin_manager.py` to load and run all plugins in the
directory.

### Running the Python Plugins

```bash
python3 - <<'PY'
from plugin_manager import load_plugins, run_plugins

plugins = load_plugins('plugins')
run_plugins(plugins)
PY
```
