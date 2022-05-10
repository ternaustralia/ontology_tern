import logging

from src.template_settings import template_settings


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    for item in template_settings:
        logger.info("Generating %s... ", item.target_path)
        item.callable(item)
        logger.info("Done.")
