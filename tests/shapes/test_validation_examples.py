from pathlib import Path

import pytest
from pyshacl import validate
from rdflib import Graph


DATA_DIR = Path(__file__).resolve().parent / "data"
VALID_DIR = DATA_DIR / "valid"
INVALID_DIR = DATA_DIR / "invalid"


def _iter_case_files(case_dir: Path):
    return sorted(case_dir.glob("*.ttl"))


def _load_graph(path: Path) -> Graph:
    graph = Graph()
    graph.parse(path)
    return graph


def test_example_directories_have_cases():
    assert _iter_case_files(VALID_DIR), f"No valid SHACL example data found in {VALID_DIR}"
    assert _iter_case_files(INVALID_DIR), f"No invalid SHACL example data found in {INVALID_DIR}"


@pytest.mark.parametrize("case_path", _iter_case_files(VALID_DIR))
def test_valid_examples_conform(case_path: Path, shapes_graph: Graph):
    data_graph = _load_graph(case_path)
    conforms, _, results_text = validate(
        data_graph,
        shacl_graph=shapes_graph,
        inference="rdfs",
    )
    assert conforms, f"{case_path.name} expected to conform, got:\n{results_text}"


@pytest.mark.parametrize("case_path", _iter_case_files(INVALID_DIR))
def test_invalid_examples_fail(case_path: Path, shapes_graph: Graph):
    data_graph = _load_graph(case_path)
    conforms, _, results_text = validate(
        data_graph,
        shacl_graph=shapes_graph,
        inference="rdfs",
    )
    assert not conforms, f"{case_path.name} expected to fail, got:\n{results_text}"
