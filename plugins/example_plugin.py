from plugin_base import Plugin

class ExamplePlugin(Plugin):
    name = "example"

    def run(self):
        print("Hello from ExamplePlugin!")
