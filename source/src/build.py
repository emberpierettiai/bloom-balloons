"""Builds the Bloom Balloons static site into ../bloom-site and a single-file offline preview into ../out."""
import json, re, os, shutil, base64, glob, html, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
HAND = sys.argv[1]            # extracted handoff folder
SITE = sys.argv[2]            # output site folder
OUT = sys.argv[3]             # output folder for the preview file
BASE = "https://shopbloomballoons.com/"
rd = lambda p: open(p, encoding="utf-8").read()

old = rd(os.path.join(HAND, "reference/OLD-index-OUTDATED.html"))
live = rd(os.path.join(HAND, "reference/LIVE-inline-script.js"))
data = json.load(open(os.path.join(SRC, "data.json"), encoding="utf-8"))

# ---------- CSS ----------
css0 = old[old.find("<style>") + 7: old.find("</style>")]
css = css0 + rd(os.path.join(SRC, "extra.css")) + rd(os.path.join(SRC, "header.css")) + rd(os.path.join(SRC, "shop.css")) + rd(os.path.join(SRC, "store.css")) + rd(os.path.join(SRC, "bunch.css"))

# ---------- JS: keep the live script's data and helpers, replace rendering ----------
def cut(a, b):
    i, j = live.index(a), live.index(b)
    assert i < j
    return live[i:j]
part_a = cut("const SMS_NUM", "function gtgCard")
part_gal = cut("const GAL=", '$("#lbx").onclick')
lead_fn = re.search(r"^function lead\(\)\{.*$", live, re.M).group(0)
part_form = cut("function fmtDate", '$("#sms-form").addEventListener("click"')
submit = cut('$("#qf").addEventListener("submit"', "\nrender();")
shop = rd(os.path.join(SRC, "shop.js")).replace("/*HOME_SUBMIT*/", submit.strip())
bunch = rd(os.path.join(SRC, "bunch.js"))
js = "\n".join([part_a, part_gal, lead_fn, part_form, "const DATA=" + json.dumps(data, ensure_ascii=False) + ";", bunch, shop])
assert "</script" not in js

# ---------- HTML ----------
IG = '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 1.8A3.2 3.2 0 003.8 7v10A3.2 3.2 0 007 20.2h10a3.2 3.2 0 003.2-3.2V7A3.2 3.2 0 0017 3.8z"/></svg>'
CART = '<svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.2a1.6 1.6 0 001.6 1.3h8.3a1.6 1.6 0 001.6-1.2L20.5 7H6.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="19.3" r="1.5"/><circle cx="17" cy="19.3" r="1.5"/></svg>'
SRCH = '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>'
HEADER = f'''<a class="ann" data-sms="ann" data-i="ann"></a>
<header class="hd"><div class="wrap hd-top">
<div class="hd-l"><button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav">☰</button>
<form class="srch" role="search">{SRCH}<input name="q" type="search" data-ph="search_ph"></form></div>
<a class="logo" href="index.html" aria-label="Bloom Balloons"><img alt="Bloom Balloons" src="assets/img/logo.jpg"></a>
<div class="tools">
<div class="lang" role="group" aria-label="Language"><button data-l="en" aria-pressed="true">🇺🇸 EN</button><button data-l="es" aria-pressed="false">🇪🇸 ES</button></div>
<a class="ic hide-m" href="https://www.instagram.com/bigdreamevents.usa/" target="_blank" rel="noopener" aria-label="Instagram">{IG}</a>
<a class="ic cartl" href="cart.html" aria-label="Cart">{CART}<span class="cart-n" hidden>0</span></a>
</div></div>
<nav id="nav" aria-label="Main">
<form class="srch m" role="search">{SRCH}<input name="q" type="search" data-ph="search_ph"></form>
<ul class="menu">
<li><a href="index.html" data-i="home"></a></li>
<li><a href="shop-by-occasion.html" data-i="m_occs"></a></li>
<li class="has"><button type="button" aria-expanded="false" data-i="m_decor"></button><ul class="sub"><li><a href="shop-garlands.html" data-i="m_gar"></a></li><li><a href="shop-columns.html" data-i="m_col"></a></li><li><a href="shop-sculptures.html" data-i="m_sc"></a></li><li><a href="shop-bouquets.html" data-i="m_bq"></a></li><li><a href="shop-helium.html" data-i="m_hel"></a></li><li><a href="shop-centerpieces.html" data-i="m_cen"></a></li><li><a href="garland-to-go.html" data-i="m_gtg"></a></li></ul></li>
<li><a href="garland-to-go.html" data-i="m_gtg"></a></li>
<li><a href="index.html#gallery" data-i="n_gal"></a></li>
<li><a href="index.html#about" data-i="n_about"></a></li>
<li><a href="index.html#faq" data-i="m_faq"></a></li>
<li><a href="index.html#quote" data-i="m_q"></a></li>
</ul></nav></header>
'''
FOOTER = '''<footer><div class="wrap fgrid">
<div><strong style="font:500 1.7rem 'Cormorant Garamond',serif">Bloom Balloons</strong><p style="margin:.4rem 0 .8rem" data-i="slogan2"></p><p data-i="foot_area"></p></div>
<div><h3 data-i="ql_h"></h3><ul class="fl"><li><a href="shop-garlands.html" data-i="m_gar"></a></li><li><a href="shop-columns.html" data-i="m_col"></a></li><li><a href="shop-sculptures.html" data-i="m_sc"></a></li><li><a href="shop-bouquets.html" data-i="m_bq"></a></li><li><a href="shop-helium.html" data-i="m_hel"></a></li><li><a href="shop-centerpieces.html" data-i="m_cen"></a></li><li><a href="garland-to-go.html" data-i="m_gtg"></a></li><li><a href="index.html#gallery" data-i="n_gal"></a></li><li><a href="index.html#about" data-i="n_about"></a></li><li><a href="index.html#faq" data-i="m_faq"></a></li><li><a href="index.html#quote" data-i="m_q"></a></li><li><a href="cart.html" data-i="cart"></a></li></ul></div>
<div><h3 data-i="ci_h"></h3><ul class="fl"><li><a href="mailto:contact@bigdreamevents.com">contact@bigdreamevents.com</a></li><li><a href="https://www.instagram.com/bigdreamevents.usa/" target="_blank" rel="noopener">bigdreamevents.usa</a></li><li><a href="tel:+19734447348">+1 (973) 444-7348</a></li><li><a data-sms="default" data-i="sms_talk"></a></li><li><a href="https://bigdreamevents.com" target="_blank" rel="noopener" data-i="bde"></a></li></ul></div>
</div><div class="wrap copy">Copyright © Bloom Balloons 2026</div></footer>
<a class="chat" data-sms="default" aria-label="Text Us"><svg viewBox="0 0 24 24"><path d="M5 3.5h14A2.5 2.5 0 0121.5 6v9a2.5 2.5 0 01-2.5 2.5h-6.6L7.5 21.3V17.5H5A2.5 2.5 0 012.5 15V6A2.5 2.5 0 015 3.5zm2.5 5v1.6h9V8.5zm0 3.4v1.6h6v-1.6z"/></svg></a>
<dialog id="lb" aria-label="Photo"><button id="lbx" aria-label="Close">×</button><img id="lbi" alt=""><div class="lbt"><h3 id="lbh"></h3><p id="lbm"></p><button class="btn pri" id="lbc"></button></div></dialog>
'''
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">'
home_main = rd(os.path.join(SRC, "home-main.html"))
e = html.escape

def head(title, desc, file, inline=False):
    canon = BASE + ("" if file == "index.html" else file)
    style = f"<style>{css}</style>" if inline else '<link rel="stylesheet" href="assets/site.css">'
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{canon}">
<link rel="icon" href="assets/img/logo.jpg">
{FONTS}
{style}
</head>
'''

def app(h1, p):
    return f'<div class="wrap page" id="app"><h1 class="ph1">{e(h1)}</h1><p class="lead">{e(p)}</p></div>'

CAT_P = "Every piece is custom and made to order in your colors."
pages = [dict(file="index.html", page="home", id="", title="Custom Balloon Arches & Garlands in South Florida | Bloom Balloons",
              desc="Custom, made-to-order balloon arches, garlands, sculptures and helium bouquets for South Florida celebrations since 2019. Request a quote from Bloom Balloons.", main=home_main)]
for c in data["cats"]:
    pages.append(dict(file=f"shop-{c['id']}.html", page="category", id=c["id"], title=f"{c['en']} | Bloom Balloons", desc=c["den"], main=app(c["en"], c["den"])))
for p in data["products"]:
    f = "garland-to-go.html" if p["id"] == "gtg" else f"product-{p['id']}.html"
    d = "A ready-made balloon garland in your colors. Pick it up at our studio or have it delivered. Installation is not included." if p["id"] == "gtg" else f"{p['en']}. {CAT_P}"
    pages.append(dict(file=f, page="product", id=p["id"], title=f"{p['en']} | Bloom Balloons", desc=d, main=app(p["en"], d)))
for h in data.get("hthemes", []):
    pages.append(dict(file=f"helium-{h['id']}.html", page="htheme", id=h["id"], title=f"{h['en']} Helium Balloons | Bloom Balloons", desc=f"{h['en']} helium balloons. {CAT_P}", main=app(h["en"], CAT_P)))
pages.append(dict(file="shop-by-occasion.html", page="occasions", id="", title="Shop by Occasion | Bloom Balloons", desc="Balloon decor for birthdays, corporate events and seasonal celebrations in South Florida.", main=app("Shop by Occasion", "")))
for o in data["occs"]:
    pages.append(dict(file=f"occasion-{o['id']}.html", page="occasion", id=o["id"], title=f"{o['en']} | Bloom Balloons", desc=f"{o['en']}. {CAT_P}", main=app(o["en"], CAT_P)))
pages.append(dict(file="search.html", page="search", id="", title="Search | Bloom Balloons", desc="Search Bloom Balloons products.", main=app("All products", "")))
NF_MAIN = ('<div class="wrap page" style="text-align:center;max-width:720px">'
           '<h1 class="ph1" data-i="nf_h"></h1><p class="lead" data-i="nf_p"></p>'
           '<div class="row" style="justify-content:center;margin-top:26px">'
           '<a class="btn pri big" href="index.html" data-i="nf_b"></a>'
           '<a class="btn big" data-sms="default" data-i="b_sms"></a></div></div>')
pages.append(dict(file="404.html", page="notfound", id="", title="Page not found | Bloom Balloons",
                  desc="That page doesn't exist. Browse custom balloon decor by Bloom Balloons.", main=NF_MAIN))
pages.append(dict(file="cart.html", page="cart", id="", title="Your cart | Bloom Balloons", desc="Review your Bloom Balloons order and send it to us by text.", main=app("Your cart", "")))

def body(pg, script):
    return f'<body data-page="{pg["page"]}" data-id="{pg["id"]}" data-file="{pg["file"]}">\n{HEADER}<main id="top">\n{pg["main"]}\n</main>\n{FOOTER}{script}\n</body>\n</html>\n'

# ---------- write site ----------
os.makedirs(os.path.join(SITE, "assets"), exist_ok=True)
for f in glob.glob(os.path.join(SITE, "*.html")):
    if not os.path.basename(f).startswith("google"):
        os.remove(f)
if not os.path.isdir(os.path.join(SITE, "assets/img")):
    shutil.copytree(os.path.join(HAND, "site-assets/img"), os.path.join(SITE, "assets/img"))
for f in glob.glob(os.path.join(SRC, "img-extra", "*")):
    shutil.copy(f, os.path.join(SITE, "assets/img", os.path.basename(f)))
for f in ("robots.txt", "googleb4bad141569fb441.html"):
    shutil.copy(os.path.join(HAND, "root-files", f), os.path.join(SITE, f))
open(os.path.join(SITE, "assets/site.css"), "w", encoding="utf-8").write(css)
open(os.path.join(SITE, "assets/site.js"), "w", encoding="utf-8").write(js)
for pg in pages:
    html_out = head(pg["title"], pg["desc"], pg["file"]) + body(pg, '<script src="assets/site.js"></script>')
    if pg["file"] == "404.html":
        # served for any missing path, so relative links would break
        html_out = re.sub(r'(href|src)="(?!https?:|//|#|mailto:|tel:|/)', r'\1="/', html_out)
    open(os.path.join(SITE, pg["file"]), "w", encoding="utf-8").write(html_out)
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(
    f'  <url><loc>{BASE}{"" if pg["file"] == "index.html" else pg["file"]}</loc></url>\n' for pg in pages if pg["page"] not in ("cart", "search", "notfound")) + "</urlset>\n"
open(os.path.join(SITE, "sitemap.xml"), "w", encoding="utf-8").write(sm)

# ---------- single-file offline preview ----------
imgs = {"assets/img/" + os.path.basename(f): "data:image/" + ("webp" if f.endswith(".webp") else "jpeg") + ";base64," + base64.b64encode(open(f, "rb").read()).decode()
        for f in glob.glob(os.path.join(SITE, "assets/img/*.jpg")) + glob.glob(os.path.join(SITE, "assets/img/*.webp"))}
shim = ("<script>/* preview only */\nconst __IMG=" + json.dumps(imgs) + ";\n"
        "const __sw=i=>{const u=i.getAttribute('src');if(u&&__IMG[u])i.src=__IMG[u]};\n"
        "new MutationObserver(m=>m.forEach(x=>{if(x.type==='attributes'){if(x.target.tagName==='IMG')__sw(x.target)}else x.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.tagName==='IMG')__sw(n);n.querySelectorAll('img').forEach(__sw)}})})).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});\n"
        "window.__PAGES=" + json.dumps({pg["file"]: {"page": pg["page"], "id": pg["id"], "main": pg["main"]} for pg in pages}, ensure_ascii=False).replace("</", "<\\/") + ";</script>\n")
home = pages[0]
h = head(home["title"], home["desc"], "index.html", inline=True).replace('<link rel="icon" href="assets/img/logo.jpg">\n', "").replace("</head>", shim + "</head>")
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "bloom-balloons-previa.html"), "w", encoding="utf-8").write(h + body(home, "<script>\n" + js + "\n</script>"))
print(len(pages), "pages;", len(js), "js bytes")
