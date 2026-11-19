"""Copies a built site folder into the repository root for GitHub Pages (live site at shopbloomballoons.com; keeps CNAME, no noindex)."""
import glob, os, shutil, sys
site, repo = sys.argv[1], sys.argv[2]
for f in glob.glob(os.path.join(repo, "*.html")):
    if not os.path.basename(f).startswith("google"):
        os.remove(f)
shutil.rmtree(os.path.join(repo, "assets"), ignore_errors=True)
shutil.copytree(site, repo, dirs_exist_ok=True)
open(os.path.join(repo, "CNAME"), "w").write("shopbloomballoons.com\n")
