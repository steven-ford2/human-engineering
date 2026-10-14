#!/usr/bin/env python3
"""Audit actual source links, images and catalog-resolved HMD PDFs.
Extracted PDF prose is literal text in the reader, not authored Markdown links.
"""
from __future__ import annotations
import json, re, sys
from pathlib import Path
from urllib.parse import unquote, urlsplit
from markdown_it import MarkdownIt
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'platform'))
from reference_library import load_libraries, strip_frontmatter

def links(raw):
    def walk(tokens):
        for token in tokens:
            if token.type == 'link_open': yield token.attrGet('href')
            if token.type == 'image': yield token.attrGet('src')
            if token.children: yield from walk(token.children)
    return walk(MarkdownIt('default').parse(raw))

def main():
    registry = json.loads((ROOT / 'workspace.json').read_text(encoding='utf-8'))
    references, external = load_libraries(ROOT, registry)
    bad = []; total = 0; external_count = 0
    pages = [p for d in registry['domains'] for p in (ROOT / d['path']).rglob('*.md')]
    for source in pages:
        raw = strip_frontmatter(source.read_text(encoding='utf-8', errors='replace'))
        path = source.relative_to(ROOT).as_posix()
        if path in references:
            raw = re.split(r'^## Page \d+\s*\n', raw, maxsplit=1, flags=re.M)[0] + '\n' + '\n'.join(re.findall(r'^!\[Rendered page \d+\]\([^\n]+\)\s*$', raw, flags=re.M))
        for url in links(raw):
            if not url or url.startswith(('#', '//')): continue
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path or parsed.path.startswith('/'): continue
            target = (source.parent / unquote(parsed.path)).resolve()
            total += 1
            if target.is_relative_to(ROOT) and target.relative_to(ROOT).as_posix() in external:
                external_count += 1
                continue
            if not target.is_relative_to(ROOT) or not target.exists(): bad.append((path, url))
    print(f'Checked {total} local links in {len(pages)} Markdown files; {external_count} original PDFs resolved through the source catalog.')
    for path, url in bad: print(f'BROKEN: {path} -> {url}')
    print(f'{"FAIL" if bad else "PASS"}: {len(bad)} broken local links')
    return int(bool(bad))
if __name__ == '__main__': sys.exit(main())
