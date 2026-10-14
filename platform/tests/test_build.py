from __future__ import annotations
import importlib.util, json, tempfile, unittest, sys
from pathlib import Path
THIS=Path(__file__).resolve().parents[1]
sys.path.insert(0, str(THIS))
spec=importlib.util.spec_from_file_location('atlas_builder',THIS/'build.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)

class BuildTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name);self.out=self.root/'site'
  (self.root/'workspace.json').write_text(json.dumps({'domains':[{'path':'domains/task-analysis','number':'01','title':'Task Analysis'}]}))
  a=self.root/'domains'/'task-analysis'/'micro-study-sheets';a.mkdir(parents=True)
  (a.parent/'README.md').write_text('# Foundations of Flight\n\nThis course teaches aircraft systems.\n')
  (a/'001-reference-frames.md').write_text('# 001 — Reference Frames: Earth, Body, Wind, Flight Path\n\n## COPY TO JOURNAL\n\nA concept with [more](../README.md). <script>alert(1)</script>\n\n**Recall:**\n1. In which frame is lift defined?\n2. How does the body frame move?\n\n## ENRICHMENT\nRead [sources](https://example.org).\n')
 def tearDown(self):self.tmp.cleanup()
 def test_build_output(self):
  result=mod.build(self.root,self.out)
  self.assertEqual(result['courses'],1)
  self.assertEqual(result['docs'],2)
  self.assertEqual(result['questions'],2)
  meta=json.loads((self.out/'manifest.json').read_text())
  self.assertEqual(meta['questions'][0]['question'],'In which frame is lift defined?')
  pages=[json.loads(p.read_text()) for p in (self.out/'pages').glob('*.json')]
  lesson=next(x for x in pages if 'Reference Frames' in x['title'])
  self.assertNotIn('<script>',lesson['html'])
  self.assertIn('href="../README.md"',lesson['html'])
  self.assertIn('id="copy-to-journal"',lesson['html'])
  self.assertTrue((self.out/'index.html').exists())
  self.assertTrue((self.out/'search.json').exists())
 def test_structured_data_included(self):
  a=self.root/'domains'/'task-analysis'
  (a/'sample.csv').write_text('id,value\nA,1\n')
  (a/'sample.json').write_text('{"sample":true}')
  result=mod.build(self.root,self.out)
  self.assertEqual(result['docs'],4)
  m=json.loads((self.out/'manifest.json').read_text())
  self.assertEqual(sum(1 for d in m['docs'] if d['kind']=='data'),2)
 def test_pages_allowlist_excludes_unreviewed_material(self):
  cfg=json.loads((self.root/'workspace.json').read_text())
  cfg['domains'][0]['pagesAllowedPaths']=['README.md']
  (self.root/'workspace.json').write_text(json.dumps(cfg))
  (self.root/'domains'/'task-analysis'/'micro-study-sheets'/'sensitive.md').write_text('# Not for publication')
  result=mod.build(self.root,self.out,profile='pages')
  self.assertEqual(result['docs'],1)
  manifest=json.loads((self.out/'manifest.json').read_text())
  self.assertEqual(manifest['profile'],'pages')
  self.assertEqual(len(manifest['docs']),1)
  self.assertNotIn('sensitive',json.dumps(manifest))
 def test_pages_profile_requires_explicit_registry(self):
  with self.assertRaises(ValueError):mod.build(self.root,self.out,profile='invalid')
 def test_no_empty_publish(self):
  with self.assertRaises(SystemExit):mod.build(self.root/'missing',self.out)
 def test_recall_without_numbering(self):
  self.assertEqual(mod.get_questions('**Recall:**\nWhy is the sky blue?\n\n## END'),['Why is the sky blue?'])
 def test_slug_safe(self):
  self.assertEqual(mod.slug('Ground · Air / G'), 'ground-air-g')

if __name__=='__main__':unittest.main()
