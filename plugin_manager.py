import importlib
import pkgutil
from typing import List, Type

from plugin_base import Plugin


def load_plugins(package: str) -> List[Plugin]:
    """Load all plugins in the given package."""
    plugins: List[Plugin] = []
    for loader, name, is_pkg in pkgutil.iter_modules([package]):
        module = importlib.import_module(f"{package}.{name}")
        for attribute_name in dir(module):
            attribute = getattr(module, attribute_name)
            if isinstance(attribute, type) and issubclass(attribute, Plugin) and attribute is not Plugin:
                plugins.append(attribute())
    return plugins


def run_plugins(plugins: List[Plugin]):
    for plugin in plugins:
        print(f"Running plugin: {plugin.name}")
        plugin.run()
