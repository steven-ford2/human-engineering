"""Bounded, dependency-free discovery. Never indexes binary or generated files."""
import argparse
import json
import os
from pathlib import Path

SKIP = {'.git', '.venv', 'venv', 'node_modules', 'dist', 'dist-pages',
        '__pycache__', '.engineering-library', 'assets', 'context'}
TEXT = {'.md', '.txt', '.adoc', '.py', '.js', '.mjs', '.json', '.csv', '.yml', '.yaml'}

def files(root, prefix=''):
    base = (root / prefix).resolve()
    if not base.is_relative_to(root.resolve()):
        raise ValueError('Path must stay inside the repository')
    if not base.exists():
        raise ValueError('Path does not exist: ' + prefix)
    if base.is_file():
        yield base
        return
    for directory, dirs, names in os.walk(base, followlinks=False):
        dirs[:] = sorted(d for d in dirs if d not in SKIP and not (Path(directory)/d).is_symlink())
        for name in sorted(names):
            path = Path(directory) / name
            if not path.is_symlink() and path.suffix.lower() in TEXT:
                yield path

def search(root, query, prefix='', limit=20, max_bytes=2_000_000):
    count = 0
    for path in files(root, prefix):
        if path.is_symlink() or path.suffix.lower() not in TEXT or path.stat().st_size > max_bytes:
            continue
        for number, line in enumerate(path.read_text(encoding='utf-8', errors='replace').splitlines(), 1):
            if query.casefold() in line.casefold():
                yield {'path': path.relative_to(root).as_posix(), 'line': number, 'text': line.strip()[:350]}
                count += 1
                if count >= limit:
                    return

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('query', nargs='?', help='Literal text; omit to list paths')
    ap.add_argument('--path', default='', help='Narrow to a course/domain/directory')
    ap.add_argument('--limit', type=int, default=20)
    ap.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2])
    args = ap.parse_args()
    if args.limit < 1: ap.error('--limit must be positive')
    root = args.root.resolve()
    try:
        if args.query:
            for row in search(root, args.query, args.path, args.limit):
                print(json.dumps(row, ensure_ascii=False))
        else:
            for i, path in enumerate(files(root, args.path)):
                if i >= args.limit: break
                print(path.relative_to(root).as_posix())
    except ValueError as error:
        ap.error(str(error))

if __name__ == '__main__': main()
