"""Run repository-owned check profiles, failing on the first failure."""
import argparse
import ast
import json
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]

def load_config(root):
    data = json.loads((root / 'codex-project.json').read_text(encoding='utf-8'))
    if data.get('schemaVersion') != 1: raise ValueError('Unsupported configuration version')
    profiles = data.get('checks')
    if not isinstance(profiles, dict): raise ValueError('checks must be an object')
    for name, commands in profiles.items():
        if not isinstance(commands, list): raise ValueError('Profile must be a command list: ' + name)
        for command in commands:
            if not isinstance(command, list) or not command or not all(isinstance(s, str) and s for s in command):
                raise ValueError('Commands must be nonempty arrays of nonempty strings')
    return data

def run(command, root):
    args = [sys.executable if command[0] == 'python' else command[0], *command[1:]]
    if not shutil.which(args[0]): raise ValueError('Missing executable: ' + args[0])
    print('+ ' + ' '.join(command), flush=True)
    subprocess.run(args, cwd=root, check=True)

def self_check(root):
    for path in sorted((root/'tools/codex').glob('*.py')):
        ast.parse(path.read_text(encoding='utf-8'), filename=str(path))
    load_config(root)
    for required in ['AGENTS.md', 'CODEX.md', 'docs/codex/REPO_MAP.md', 'docs/codex/STATUS.md']:
        if not (root/required).is_file(): raise ValueError('Missing ' + required)
    run(['python', '-m', 'unittest', 'discover', '-s', 'tools/codex/tests', '-v'], root)

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('profile', nargs='?', default='tooling', choices=['tooling', 'platform', 'full'])
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    try:
        config = load_config(ROOT)
        if args.profile != 'tooling' and args.profile not in config['checks']:
            raise ValueError('No ' + args.profile + ' profile exists yet; this repository is a scaffold')
        if not args.dry_run: self_check(ROOT)
        for command in config['checks'].get(args.profile, []):
            if args.dry_run: print(json.dumps(command))
            else: run(command, ROOT)
        print('PLANNED' if args.dry_run else 'PASS', args.profile)
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        print('FAIL: ' + str(error), file=sys.stderr)
        return 1
    return 0

if __name__ == '__main__': sys.exit(main())
