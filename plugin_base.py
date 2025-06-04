class Plugin:
    """Base class for plugins."""
    name = "base"

    def run(self, *args, **kwargs):
        raise NotImplementedError("Plugin must implement run method")
