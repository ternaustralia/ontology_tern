# TERN Ontology

The TERN Ontology is an OWL Ontology with SHACL profiles to facilitate the representation of ecological survey data. The TERN Ontology is used as a common information model to represent and facilitate the sharing of survey data across different systems.

View classes: https://linkeddata.tern.org.au/viewers/tern-ontology
Online documentation: https://linkeddata.tern.org.au/information-models/tern-ontology
Specification document: https://ternaustralia.github.io/ontology_tern

## Releases

The TERN Ontology makes GitHub Releases for each version. See [TERN Ontology releases](https://github.com/ternaustralia/ontology_tern/releases) for a list of releases.

## Source files

Source files are maintained as RDF Turtle files and they are located in the [docs/](docs/) directory as files ending in `.ttl`.

> Only edit the source files in TopBraid Composer.

Source files:

- [docs/tern.profile.ttl](docs/tern.profile.ttl) TERN Ontology Profiles declaration
- [docs/tern.ttl](docs/tern.ttl) TERN Ontology in OWL
- [docs/tern.shacl.ttl](docs/tern.shapes.ttl) TERN Ontology's SHACL shapes
- [docs/tern.ecoplots.shacl.ttl](docs/tern.ecoplots.shapes.ttl) TERN Ontology's EcoPlots' SHACL shapes
- [docs/meta.shapes.ttl](docs/meta.shapes.ttl) TERN Ontology's meta SHACL shapes

## Version control

The main branch (master) is the working branch of the TERN Ontology. Changes must be made in another branch along with a GitHub pull request to merge into the main branch.

Each push to a branch will trigger GitHub Actions to run validations and tests. These validations and tests must pass before the branch can be merged into the main branch.

## Editing the TERN Ontology

We use ontotools, a Python command line application to normalize the source files.

Ensure the following instructions are performed whenever edits are made to the source files before committing to git.

### Create a Python 3 virtual environment

```bash
python3 -m venv venv
```

### Activate the virtual environment

```bash
source venv/bin/activate
```

### Install the required packages

```bash
pip install -r requirements.txt
```

### Run ontotools to normalize the source file for TERN Ontology

This will normalize the `tern.ttl` file.

```bash
ontotools file normalize docs/tern.ttl
```

### Run ontotools to normalize the source file for TERN Ontology TERN Ontology SHACL shapes

This will normalize the `tern.shacl.ttl` file.

```bash
ontotools file normalize docs/tern.shacl.ttl
```

## Making modifications

- Bump the version number in the ontology, the version information, and the modified date.
- Enter the new changes into `CHANGELOG.md` following the conventions of semantic versioning.

Each version should:

- List its release date in the above format.
- Group changes to describe their impact on the project, as follows:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for once-stable features removed in upcoming releases.
- `Removed` for deprecated features removed in this release.
- `Fixed` for any bug fixes.
- `Security` to invite users to upgrade in case of vulnerabilities.

## Contact

**Edmond Chuc**  
e.chuc@uq.edu.au
