import pytest

from src.property_shape.get_cardinality import _get_cardinality_text


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
def test(min_count, max_count, expected):
    result = _get_cardinality_text(min_count, max_count)
    assert result == expected
