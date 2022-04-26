import pytest

from rdflib import SH, URIRef, Graph
from jinja2 import Template

from src.property_shape.get_node_kind import get_node_kind_as_str


def get_data(node_kind):
    template = Template(
        """
        @prefix sh: <http://www.w3.org/ns/shacl#> .

        <urn:shape:1> a sh:PropertyShape ;
            {% if node_kind %}
            sh:nodeKind <{{ node_kind }}> ;
            {% endif %}
            .
    """
    )
    return template.render(node_kind=node_kind)


@pytest.mark.parametrize(
    "node_kind, expected",
    [
        (SH.IRI, "link:http://www.w3.org/ns/shacl#IRI[`sh:IRI`]"),
        (
            SH.BlankNodeOrLiteral,
            "link:http://www.w3.org/ns/shacl#BlankNodeOrLiteral[`sh:BlankNodeOrLiteral`]",
        ),
        (None, ""),
    ],
)
def test(node_kind, expected):
    data = get_data(node_kind)
    g = Graph()
    g.parse(data=data, format="turtle")

    result = get_node_kind_as_str(URIRef("urn:shape:1"), g)
    assert result == expected
