from pathlib import Path

import pytest
from rdflib import Graph


@pytest.fixture(scope="session")
def shapes_graph() -> Graph:
    """Load the canonical TERN SHACL shapes once per test session."""
    repo_root = Path(__file__).resolve().parents[2]
    shapes_path = repo_root / "docs" / "tern.shapes.ttl"
    graph = Graph()
    graph.parse(shapes_path)
    return graph

