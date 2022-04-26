import pytest

from rdflib import Graph, URIRef
from jinja2 import Template

from src.property_shape import get_cardinality


def get_data(min_count, max_count):
    template = Template(
        """
        @prefix sh: <http://www.w3.org/ns/shacl#> .

        <urn:shape:1> a sh:PropertyShape ;
            {% if min_count %}
            sh:minCount {{ min_count }} ;
            {% endif %}

            {% if max_count %}
            sh:maxCount {{ max_count }} ;
            {% endif %}
            .
    """
    )
    return template.render(min_count=min_count, max_count=max_count)


@pytest.mark.parametrize(
    "min_count, max_count, expected",
    [
        (1, 1, "Exactly 1"),
        (2, None, "Minimum 2"),
        (None, 3, "Maximum 3"),
        (1, 4, "Minimum 1 +\nMaximum 4"),
        (None, None, ""),
    ],
)
def test_cardinality_internal(min_count, max_count, expected):
    g = Graph()
    data = get_data(min_count, max_count)
    g.parse(data=data, format="turtle")

    result = get_cardinality(URIRef("urn:shape:1"), g)
    assert result == expected
