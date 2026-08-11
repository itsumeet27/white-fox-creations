#!/usr/bin/env python3
"""Generate gallery page artworks with #FF6600 accents."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math, random, os

OUT = "/workspace/assets/images/gallery"
os.makedirs(OUT, exist_ok=True)
random.seed(77)
ACCENT = (255, 102, 0)
BG = (7, 7, 7)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        d.line([(0, y), (w, y)], fill=tuple(lerp(top[i], bottom[i], t) for i in range(3)))
    return img


def glow(img, cx, cy, r, color, intensity=0.7):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for i in range(28, 0, -1):
        t = i / 28
        a = int(255 * intensity * (1 - t) ** 1.8)
        rad = int(r * t)
        d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(*color[:3], a))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def grain(img, amount=16):
    w, h = img.size
    n = Image.effect_noise((max(1, w // 4), max(1, h // 4)), amount).convert("L").resize((w, h), Image.BILINEAR)
    return Image.blend(img.convert("RGB"), Image.merge("RGB", (n, n, n)), 0.06)


def font(size, bold=True):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                pass
    return ImageFont.load_default()


def save(img, name):
    path = f"{OUT}/{name}.jpg"
    grain(img.convert("RGB")).save(path, quality=85, optimize=True)
    print(name)


def hero_asteroid():
    w, h = 1200, 1200
    img = Image.new("RGB", (w, h), BG)
    cx, cy = int(w * 0.52), int(h * 0.48)
    # rocky mass via overlapping ellipses
    d = ImageDraw.Draw(img)
    for i in range(40):
        ang = random.random() * math.tau
        dist = random.uniform(0, 220)
        rx, ry = random.randint(40, 160), random.randint(30, 120)
        ox = cx + int(math.cos(ang) * dist * 0.6)
        oy = cy + int(math.sin(ang) * dist * 0.5)
        shade = random.randint(18, 55)
        d.ellipse([ox - rx, oy - ry, ox + rx, oy + ry], fill=(shade, shade, shade + 2))
    # orange ring
    img = glow(img, cx, cy, 340, ACCENT, 0.45)
    d = ImageDraw.Draw(img)
    for r, width in ((260, 10), (248, 3), (272, 2)):
        d.ellipse([cx - r, cy - r // 3, cx + r, cy + r // 3], outline=ACCENT, width=width)
    # particles
    for _ in range(80):
        px, py = random.randint(0, w), random.randint(0, h)
        s = random.randint(1, 3)
        col = ACCENT if random.random() > 0.55 else (180, 180, 180)
        d.ellipse([px, py, px + s, py + s], fill=col)
    # smoke
    mist = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    md = ImageDraw.Draw(mist)
    for i in range(8):
        md.ellipse([cx - 300 + i * 20, cy + 80 + i * 30, cx + 300, cy + 220 + i * 40], fill=(40, 40, 40, 25))
    img = Image.alpha_composite(img.convert("RGBA"), mist.filter(ImageFilter.GaussianBlur(30)))
    save(img, "hero-gallery")


def liquid_frequency():
    w, h = 1400, 900
    img = Image.new("RGB", (w, h), (8, 8, 8))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for i in range(30):
        cx, cy = random.randint(0, w), random.randint(0, h)
        rx, ry = random.randint(80, 280), random.randint(40, 160)
        col = ACCENT + (random.randint(20, 50),) if i % 5 == 0 else (random.randint(40, 200),) * 3 + (random.randint(40, 90),)
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=col)
    img = Image.alpha_composite(img.convert("RGBA"), overlay.filter(ImageFilter.GaussianBlur(28)))
    d = ImageDraw.Draw(img)
    for i in range(18):
        pts = [(x, int(h * 0.35 + i * 28 + math.sin(x / 50 + i) * 40)) for x in range(0, w, 6)]
        d.line(pts, fill=ACCENT if i % 4 == 0 else (200, 200, 200), width=2 if i % 4 else 1)
    save(img, "liquid-frequency")


def chaos_theory():
    w, h = 900, 1200
    img = Image.new("RGB", (w, h), (10, 10, 10))
    d = ImageDraw.Draw(img)
    f = font(92)
    words = ["CHAOS", "ORDER", "SHIFT", "NOISE", "FORM"]
    y = 80
    for i, word in enumerate(words):
        x = 40 if i % 2 == 0 else 90
        for j in range(12):
            d.rectangle([x + j * 14, y + 10, x + j * 14 + 6, y + 70], fill=(20 + j * 15,) * 3)
        d.text((x, y), word, font=f, fill=(240, 240, 240) if i % 2 == 0 else (50, 50, 50))
        y += 180
    d.polygon([(w - 40, 0), (w, 0), (w - 160, h), (w - 210, h)], fill=ACCENT)
    for i in range(15):
        d.line([(0, 60 + i * 70), (w, 80 + i * 70)], fill=ACCENT if i % 4 == 0 else (60, 60, 60), width=1)
    save(img, "chaos-theory")


def unseen():
    w, h = 800, 1200
    img = vgrad(w, h, (40, 40, 42), (12, 12, 12))
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, int(h * 0.38)
    d.ellipse([cx - 100, cy - 130, cx + 100, cy + 100], fill=(190, 190, 195))
    d.ellipse([cx - 110, cy - 140, cx + 70, cy + 20], fill=(20, 20, 22))
    d.ellipse([cx - 40, cy - 50, cx + 85, cy + 70], fill=(220, 220, 225))
    d.polygon([(cx - 60, cy + 90), (cx + 60, cy + 90), (cx + 160, h), (cx - 160, h)], fill=(45, 45, 48))
    # orange brush stroke across eyes
    stroke = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stroke)
    sd.polygon([(40, cy - 10), (w - 30, cy - 35), (w - 20, cy + 25), (50, cy + 40)], fill=(*ACCENT, 230))
    stroke = stroke.filter(ImageFilter.GaussianBlur(1.5))
    img = Image.alpha_composite(img.convert("RGBA"), stroke)
    img = glow(img, cx, cy, 80, ACCENT, 0.25)
    save(img, "unseen")


def threshold():
    w, h = 900, 1100
    img = vgrad(w, h, (14, 14, 16), (4, 4, 5))
    cx, cy = w // 2, int(h * 0.45)
    # doorway
    door_w, door_h = 160, 320
    img = glow(img, cx, cy, 200, ACCENT, 0.55)
    d = ImageDraw.Draw(img)
    d.rectangle([cx - door_w // 2, cy - door_h // 2, cx + door_w // 2, cy + door_h // 2], outline=ACCENT, width=4)
    d.rectangle([cx - door_w // 2 + 10, cy - door_h // 2 + 10, cx + door_w // 2 - 10, cy + door_h // 2 - 10], fill=(40, 18, 5))
    # silhouette
    fx, fy = cx, cy + door_h // 2 + 40
    d.ellipse([fx - 8, fy - 50, fx + 8, fy - 34], fill=(0, 0, 0))
    d.rectangle([fx - 12, fy - 32, fx + 12, fy + 30], fill=(0, 0, 0))
    save(img, "threshold")


def pulse():
    w, h = 1000, 1000
    img = Image.new("RGB", (w, h), BG)
    cx, cy = w // 2, h // 2
    img = glow(img, cx, cy, 280, ACCENT, 0.5)
    d = ImageDraw.Draw(img)
    for r in (80, 140, 200, 280, 360):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT if r in (140, 280) else (45, 45, 45), width=3 if r == 140 else 2)
    d.ellipse([cx - 36, cy - 36, cx + 36, cy + 36], fill=ACCENT)
    # motion arcs
    for i in range(12):
        ang = i * 30
        d.arc([cx - 220, cy - 220, cx + 220, cy + 220], ang, ang + 18, fill=(180, 180, 180), width=2)
    save(img, "pulse")


def momentum():
    w, h = 1400, 800
    img = Image.new("RGB", (w, h), (8, 8, 8))
    d = ImageDraw.Draw(img)
    f = font(140)
    d.text((60, 280), "MOMENTUM", font=f, fill=(240, 240, 240))
    for i in range(20):
        d.line([(80 + i * 60, 200), (200 + i * 60, 600)], fill=ACCENT if i % 3 == 0 else (50, 50, 50), width=2)
    d.rectangle([0, h - 12, w, h], fill=ACCENT)
    save(img, "momentum")


def interval():
    w, h = 750, 1100
    img = Image.new("RGB", (w, h), (9, 9, 9))
    d = ImageDraw.Draw(img)
    f = font(72)
    letters = list("INTERVAL")
    for i, ch in enumerate(letters):
        x = 80 + (i % 2) * 180
        y = 60 + i * 120
        d.text((x, y), ch, font=f, fill=(230, 230, 230) if i % 2 == 0 else ACCENT)
        d.line([(40, y + 90), (w - 40, y + 90)], fill=(40, 40, 40), width=1)
    save(img, "interval")


def orbital_silence():
    w, h = 1000, 1000
    img = Image.new("RGB", (w, h), BG)
    cx, cy = w // 2, h // 2
    img = glow(img, cx + 40, cy - 20, 200, ACCENT, 0.35)
    d = ImageDraw.Draw(img)
    d.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=(18, 18, 20))
    d.ellipse([cx - 170, cy - 170, cx + 170, cy + 170], fill=(12, 12, 14))
    # crescent
    d.arc([cx - 190, cy - 190, cx + 190, cy + 190], -40, 100, fill=ACCENT, width=8)
    for i in range(40):
        ang = random.random() * math.tau
        r = random.randint(220, 420)
        px = cx + int(math.cos(ang) * r)
        py = cy + int(math.sin(ang) * r)
        d.point((px, py), fill=(200, 200, 200))
    save(img, "orbital-silence")


def flow_state():
    w, h = 1100, 900
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    for i in range(40):
        pts = []
        for x in range(0, w, 8):
            y = int(h * 0.2 + i * 16 + math.sin(x / 40 + i / 3) * 35 + math.cos(x / 70) * 20)
            pts.append((x, y))
        d.line(pts, fill=ACCENT if i % 7 == 0 else (220, 220, 220), width=1)
    save(img, "flow-state")


def cubic_light():
    w, h = 1000, 1000
    img = Image.new("RGB", (w, h), (6, 6, 8))
    d = ImageDraw.Draw(img)
    cubes = [(200, 300, 120), (400, 200, 100), (550, 380, 140), (300, 500, 90), (650, 520, 110)]
    for i, (x, y, s) in enumerate(cubes):
        # isometric-ish
        top = ACCENT if i % 2 == 0 else (40, 40, 42)
        d.polygon([(x, y), (x + s, y - s // 2), (x + 2 * s, y), (x + s, y + s // 2)], fill=top)
        d.polygon([(x, y), (x + s, y + s // 2), (x + s, y + s + s // 2), (x, y + s)], fill=(25, 25, 28))
        d.polygon([(x + s, y + s // 2), (x + 2 * s, y), (x + 2 * s, y + s), (x + s, y + s + s // 2)], fill=(15, 15, 16))
    img = glow(img, 520, 380, 180, ACCENT, 0.3)
    save(img, "cubic-light")


def make_variant(name, kind, seed):
    random.seed(seed)
    w, h = (1100, 800) if kind == "wide" else (800, 1100) if kind == "tall" else (1000, 1000)
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    if kind == "wide":
        for i in range(25):
            y = int(h * 0.2 + i * 22)
            d.arc([50, y - 40, w - 50, y + 40], 0, 180, fill=ACCENT if i % 5 == 0 else (80, 80, 80), width=2)
    elif kind == "tall":
        for i in range(8):
            x = 60 + i * 90
            d.rectangle([x, 40, x + 40, h - 40], fill=(30 + i * 10,) * 3)
            if i % 2 == 0:
                d.rectangle([x, 200 + i * 50, x + 40, 280 + i * 50], fill=ACCENT)
    else:
        cx, cy = w // 2, h // 2
        for r in range(40, 400, 35):
            d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT if r % 70 == 0 else (35, 35, 35), width=2)
        d.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=ACCENT)
    save(img, name)


if __name__ == "__main__":
    hero_asteroid()
    liquid_frequency()
    chaos_theory()
    unseen()
    threshold()
    pulse()
    momentum()
    interval()
    orbital_silence()
    flow_state()
    cubic_light()
    # additional pieces toward 24
    extras = [
        ("void-signal", "wide", 101),
        ("amber-rift", "tall", 102),
        ("glass-noise", "square", 103),
        ("neon-fold", "wide", 104),
        ("static-bloom", "tall", 105),
        ("vector-heat", "square", 106),
        ("dark-prism", "wide", 107),
        ("echo-form", "tall", 108),
        ("rift-study", "square", 109),
        ("mono-flare", "wide", 110),
        ("burn-grid", "tall", 111),
        ("silent-arc", "square", 112),
        ("phase-cut", "wide", 113),
    ]
    for name, kind, seed in extras:
        make_variant(name, kind, seed)
    print("Done", len(os.listdir(OUT)))
