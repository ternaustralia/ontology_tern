from typing import Tuple, Union
from jinja2 import Template

from rdflib import SH, BNode, Graph, Literal, URIRef


def get_cardinality(uri: URIRef, g: Graph) -> str:
    min_count, max_count = _get_cardinality(uri, g)
    return _get_cardinality_text(min_count, max_count)


def _get_cardinality(
    uri: Union[URIRef, BNode], g: Graph
) -> Tuple[Union[int, None], Union[int, None]]:
    min_count: Literal = g.value(uri, SH.minCount)
    max_count: Literal = g.value(uri, SH.maxCount)

    if min_count is not None:
        min_count = min_count.toPython()
    if max_count is not None:
        max_count = max_count.toPython()

    return min_count, max_count


def _get_cardinality_text(min_count: int = None, max_count: int = None) -> str:
    if min_count is None and max_count is None:
        return ""

    if min_count is not None and min_count == max_count:
        return f"Exactly {min_count}"

    if min_count and max_count is None:
        return f"Minimum {min_count}"

    if max_count and min_count is None:
        return f"Maximum {max_count}"

    # Both min_count and max_count are not None and are not the same value.
    return f"Minimum {min_count} +\nMaximum {max_count}"
