import pytest

from rdflib import URIRef

from src.property_shape.get_class_type import get_base_uri_and_local_name

testdata = [
    (URIRef("http://example.com/person#me"), ("http://example.com/person#", "me")),
    (URIRef("http://example.com/person/me"), ("http://example.com/person/", "me")),
]


@pytest.mark.parametrize(
    "uri, expected",
    testdata,
)
def test_get_base_uri_and_local_name(uri: URIRef, expected: str):
    result = get_base_uri_and_local_name(uri)
    assert result == expected
