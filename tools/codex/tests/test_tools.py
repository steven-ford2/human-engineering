import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

def module(name):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).resolve().parents[1] / (name+'.py'))
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value

context = module('context')
check = module('check')

class ContextTests(unittest.TestCase):
    def test_bounded_search_and_line_numbers(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root/'lesson.md').write_text('First\nHMD cue\nhmd frame\n', encoding='utf-8')
            rows = list(context.search(root, 'hmd', limit=1))
            self.assertEqual([(r['path'],r['line']) for r in rows], [('lesson.md',2)])

    def test_excludes_generated_binary_and_oversized_content(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root/'dist').mkdir()
            (root/'dist/a.md').write_text('needle')
            (root/'image.png').write_bytes(b'needle')
            (root/'huge.md').write_text('needle'*10)
            self.assertEqual(list(context.search(root,'needle',max_bytes=10)), [])

    def test_scope_and_escape_rejection(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root/'a').mkdir()
            (root/'a/lesson.md').write_text('needle')
            (root/'b.md').write_text('needle')
            self.assertEqual(len(list(context.search(root,'needle','a'))), 1)
            with self.assertRaises(ValueError): list(context.files(root,'../'))
            with self.assertRaises(ValueError): list(context.files(root,'missing'))

class ConfigTests(unittest.TestCase):
    def test_invalid_command_cannot_be_run_as_a_shell_string(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root/'codex-project.json').write_text(json.dumps({'schemaVersion':1,'checks':{'full':['echo x; evil']}}))
            with self.assertRaises(ValueError): check.load_config(root)

    def test_valid_argv(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = {'schemaVersion':1,'checks':{'platform':[['python','platform/build.py']]}}
            (root/'codex-project.json').write_text(json.dumps(data))
            self.assertEqual(check.load_config(root),data)

    def test_failure_propagates(self):
        import subprocess
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(subprocess.CalledProcessError):
                check.run(['python','-c','raise SystemExit(7)'],Path(directory))

if __name__ == '__main__': unittest.main()
