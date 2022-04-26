from src.template_settings import template_settings


if __name__ == "__main__":
    for template_setting in template_settings:
        template_setting.callable(template_setting)
