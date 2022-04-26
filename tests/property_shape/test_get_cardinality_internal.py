import pytest

from rdflib import Graph, URIRef
from jinja2 import Template

from src.property_shape.get_cardinality import _get_cardinality


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
    [(1, 5, (1, 5)), (2, None, (2, None)), (None, 3, (None, 3)), (2, 2, (2, 2)), (None, None, (None, None))],
)
def test_cardinality_internal(min_count, max_count, expected):
    g = Graph()
    data = get_data(min_count, max_count)
    g.parse(data=data, format="turtle")

    result = _get_cardinality(URIRef("urn:shape:1"), g)
    assert result == expected
