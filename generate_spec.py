from src.template_settings import template_settings


if __name__ == "__main__":
    for item in template_settings:
        item.callable(item)
