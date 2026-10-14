"""Compile validated conversions into a page-at-a-time research reader.

Original Markdown and rendered images stay unchanged. Full extracted text is
indexed as unique search terms; document search keeps page-level text separately.
"""
from __future__ import annotations
import html, json, re, shutil
from pathlib import Path
from urllib.parse import quote


def write_changed(path, text):
    if not path.is_file() or path.read_text(encoding='utf-8') != text:
        path.write_text(text, encoding='utf-8')


def strip_frontmatter(raw):
    return re.sub(r'\A---\r?\n.*?\r?\n---\r?\n', '', raw, count=1, flags=re.S)


def load_libraries(root, registry):
    references = {}
    external_files = {}
    for domain in registry['domains']:
        if not domain.get('referenceLibrary'):
            continue
        base = root / domain['path']
        manifest = json.loads((base / domain['referenceLibrary']).read_text(encoding='utf-8'))
        catalog = json.loads((base / domain['sourceCatalog']).read_text(encoding='utf-8'))
        source_by_name = {r['filename']: r for r in catalog['records']}
        for conversion in manifest['records']:
            source = source_by_name[conversion['filename']]
            if conversion['status'] != 'converted' or not conversion['sha256_match'] or not conversion['byte_match']:
                raise ValueError(f"Unvalidated reference: {conversion['filename']}")
            path = (base / conversion['markdown_path']).relative_to(root).as_posix()
            references[path] = {'conversion': conversion, 'source': source, 'base': base}
            pdf_path = (base / 'acquisition' / 'pdfs' / source['filename']).relative_to(root).as_posix()
            external_files[pdf_path] = source.get('drive_url') or source.get('url')
    return references, external_files


def compile_reference(root, out, file, key, reference):
    source, conversion = reference['source'], reference['conversion']
    raw = strip_frontmatter(file.read_text(encoding='utf-8'))
    parts = re.split(r'^## Page (\d+)\s*\n', raw, flags=re.M)
    prefix = parts[0]
    pdf_url = source.get('drive_url') or source.get('url')
    if pdf_url:
        prefix = re.sub(r'^- Local PDF:.*$', f'- Original PDF: [Open source PDF]({pdf_url})', prefix, flags=re.M)
    destination = out / 'references' / key
    destination.mkdir(parents=True, exist_ok=True)
    search_pages = []
    numbers = []
    for i in range(1, len(parts), 2):
        number, block = int(parts[i]), parts[i + 1]
        match = re.search(r'^!\[Rendered page \d+\]\(([^\n]+)\)\s*$', block, re.M)
        if not match:
            raise ValueError(f'Missing page image: {file}, page {number}')
        asset = (file.parent / match.group(1)).resolve()
        if not asset.is_relative_to(root.resolve()) or not asset.is_file():
            raise ValueError(f'Missing or out-of-root asset: {asset}')
        asset_path = asset.relative_to(root.resolve()).as_posix()
        # Relative to the site root: the reader inserts HTML into the app shell.
        image_url = './' + quote(asset_path, safe='/')
        extracted = block[match.end():]
        extracted = re.sub(r'^\s*### Extracted Text\s*\n', '', extracted, count=1).strip()
        rendered = (f'<figure class="reference-image"><a href="{image_url}" target="_blank" rel="noopener noreferrer">'
                    f'<img src="{image_url}" alt="Rendered PDF page {number}" loading="lazy" /></a>'
                    f'<figcaption>PDF page {number} · open image at original render size</figcaption></figure>'
                    f'<section class="reference-text"><h2>Extracted text · page {number}</h2>'
                    f'<pre>{html.escape(extracted)}</pre></section>')
        write_changed(destination / f'{number}.json', json.dumps({'number': number, 'html': rendered}, ensure_ascii=False))
        search_pages.append({'page': number, 'text': extracted.lower()})
        numbers.append(number)
    expected = conversion['pages_rendered']
    if numbers != list(range(1, expected + 1)):
        raise ValueError(f'Page coverage mismatch: {file}; expected {expected}, found {len(numbers)}')
    write_changed(destination / 'search.json', json.dumps(search_pages, ensure_ascii=False, separators=(',', ':')))
    # Do not duplicate the 60 MB text corpus in the global index or truncate long books.
    terms = sorted(set(re.findall(r'[a-z0-9]{2,}', ' '.join(p['text'] for p in search_pages))))
    meta = {field: source.get(field, '') for field in ('title', 'year', 'category', 'publication_type', 'source_url', 'drive_url', 'notes', 'review_status', 'sha256')}
    meta.update({'pageCount': expected, 'pdf_url': source.get('url', ''), 'status': 'Acquired and converted; not fully read or critically appraised', 'slug': conversion['slug']})
    return prefix, meta, ' '.join(terms)


def copy_assets(root, out, references):
    def copy_changed(source, target):
        destination = Path(target)
        if destination.is_file():
            a, b = Path(source).stat(), destination.stat()
            if a.st_size == b.st_size and a.st_mtime_ns == b.st_mtime_ns:
                return str(destination)
        return shutil.copy2(source, target)
    bases = {r['base'] for r in references.values()}
    count = 0
    for base in bases:
        assets = base / 'references_markdown' / 'assets'
        shutil.copytree(assets, out / assets.relative_to(root), dirs_exist_ok=True, copy_function=copy_changed)
        count += sum(1 for p in assets.rglob('*.jpg'))
    expected = sum(r['conversion']['pages_rendered'] for r in references.values())
    if count != expected:
        raise ValueError(f'Asset coverage mismatch: {count} images, expected {expected}')
    return count
