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

Once loaded, click the extension icon and use **Start Recording** to begin
tracking your actions. Interactions such as clicks, inputs and scrolling will
be captured along with screenshots. Use **Stop Recording** when finished.
Recorded steps appear in the popup where you can also **Export Steps** to a
JSON file.

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
