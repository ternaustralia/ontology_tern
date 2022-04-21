port=3000

watch:
	watchmedo shell-command \
		--patterns="*.adoc;*.css" \
		--ignore-directories \
		--recursive \
		--command='make build' \
		.

build:
	asciidoctor --trace -a stylesheet=./static/styles.css -o ../build/index.html ./source/index.adoc

build-pdf:
	asciidoctor --trace -a stylesheet=./static/styles.css -r asciidoctor-pdf -b pdf -o ../build/index.pdf ./source/index.adoc

run:
	python3 -m http.server ${port} -d ../build