"""Copies a built site folder into the repository root for GitHub Pages and marks every page noindex (test copy)."""
import glob, os, shutil, sys
site, repo = sys.argv[1], sys.argv[2]
for f in glob.glob(os.path.join(repo, "*.html")):
    if not os.path.basename(f).startswith("google"):
        os.remove(f)
shutil.rmtree(os.path.join(repo, "assets"), ignore_errors=True)
shutil.copytree(site, repo, dirs_exist_ok=True)
for f in glob.glob(os.path.join(repo, "*.html")):
    if os.path.basename(f).startswith("google"):
        continue
    s = open(f, encoding="utf-8").read()
    if "noindex" not in s:
        s = s.replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n<link rel="canonical"')
        open(f, "w", encoding="utf-8").write(s)
