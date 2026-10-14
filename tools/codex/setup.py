"""Install this repo's existing renderer requirements; do not build the corpus."""
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[2]
if sys.version_info < (3, 12):
    raise SystemExit('Use Python 3.12 or newer')
requirements = root / 'platform/requirements.txt'
if requirements.is_file():
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', str(requirements)], check=True)
subprocess.run([sys.executable, str(root/'tools/codex/check.py'), 'tooling'], cwd=root, check=True)
print('Setup ready. No site deployment or bulk source conversion was performed.')
