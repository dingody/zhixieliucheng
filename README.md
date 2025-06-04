# Plugin System

This repository demonstrates a simple plugin architecture in Python. Plugins are
located in the `plugins` directory and subclass `Plugin` from `plugin_base.py`.
Use `plugin_manager.py` to load and run all plugins in the directory.

## Usage

```bash
python3 - <<'PY'
from plugin_manager import load_plugins, run_plugins

plugins = load_plugins('plugins')
run_plugins(plugins)
PY
```
