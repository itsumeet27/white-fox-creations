#!/usr/bin/env python3
"""Generate cinematic portfolio placeholder images (fast)."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
import math
import random
import os
import struct

OUT = "/workspace/assets/images"
ICONS = "/workspace/assets/icons"
os.makedirs(OUT, exist_ok=True)
os.makedirs(ICONS, exist_ok=True)
os.makedirs("/workspace/assets/videos", exist_ok=True)
random.seed(42)

ACCENT = (184, 255, 0)
BG = (8, 8, 8)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def vertical_gradient(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        c = tuple(lerp(top[i], bottom[i], t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=c)
    return img


def radial_glow(img, cx, cy, radius, color, intensity=0.85):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    r, g, b = color[:3]
    steps = 28
    for i in range(steps, 0, -1):
        t = i / steps
        a = int(255 * intensity * (1 - t) ** 1.8)
        rad = int(radius * t)
        draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(r, g, b, a))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def film_grain(img, amount=18):
    """Fast grain via resized noise."""
    w, h = img.size
    nw, nh = max(1, w // 4), max(1, h // 4)
    noise = Image.effect_noise((nw, nh), amount).convert("L")
    noise = noise.resize((w, h), Image.BILINEAR)
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    # Blend lightly
    return Image.blend(img.convert("RGB"), noise_rgb, 0.06)


def mountain(draw, w, h, base_y, peaks, color):
    pts = [(0, h), (0, base_y)] + list(peaks) + [(w, base_y), (w, h)]
    draw.polygon(pts, fill=color)


def make_hero():
    w, h = 1200, 1400
    img = vertical_gradient(w, h, (14, 16, 20), (6, 6, 8))
    draw = ImageDraw.Draw(img)
    mountain(
        draw, w, h, int(h * 0.55),
        [(int(w * 0.1), int(h * 0.48)), (int(w * 0.25), int(h * 0.38)),
         (int(w * 0.4), int(h * 0.5)), (int(w * 0.55), int(h * 0.32)),
         (int(w * 0.7), int(h * 0.46)), (int(w * 0.85), int(h * 0.36)), (w, int(h * 0.5))],
        (18, 20, 24),
    )
    mountain(
        draw, w, h, int(h * 0.68),
        [(0, int(h * 0.62)), (int(w * 0.18), int(h * 0.52)),
         (int(w * 0.35), int(h * 0.64)), (int(w * 0.5), int(h * 0.45)),
         (int(w * 0.68), int(h * 0.6)), (int(w * 0.9), int(h * 0.48)), (w, int(h * 0.62))],
        (10, 11, 12),
    )
    cx, cy = int(w * 0.62), int(h * 0.42)
    img = radial_glow(img, cx, cy, 260, ACCENT, 0.5)
    img = radial_glow(img, cx, cy, 110, ACCENT, 0.85)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], outline=(*ACCENT, 220), width=5)
    draw.ellipse([cx - 78, cy - 78, cx + 78, cy + 78], outline=(*ACCENT, 140), width=2)
    draw.ellipse([cx - 55, cy - 55, cx + 55, cy + 55], fill=(184, 255, 0, 55))
    draw.ellipse([cx - 28, cy - 28, cx + 28, cy + 28], fill=(220, 255, 140, 100))

    mist = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    md = ImageDraw.Draw(mist)
    for i in range(5):
        y0 = int(h * 0.55) + i * 45
        md.ellipse([-80, y0, w + 80, y0 + 90], fill=(28, 32, 38, 35 + i * 10))
    mist = mist.filter(ImageFilter.GaussianBlur(22))
    img = Image.alpha_composite(img.convert("RGBA"), mist)

    draw = ImageDraw.Draw(img, "RGBA")
    fx, fy = int(w * 0.38), int(h * 0.72)
    draw.ellipse([fx - 9, fy - 52, fx + 9, fy - 34], fill=(0, 0, 0, 235))
    draw.polygon([(fx - 13, fy - 30), (fx + 13, fy - 30), (fx + 16, fy + 18), (fx - 16, fy + 18)], fill=(0, 0, 0, 235))
    draw.polygon([(fx - 8, fy + 18), (fx - 2, fy + 18), (fx - 6, fy + 52), (fx - 14, fy + 52)], fill=(0, 0, 0, 235))
    draw.polygon([(fx + 2, fy + 18), (fx + 8, fy + 18), (fx + 14, fy + 52), (fx + 6, fy + 52)], fill=(0, 0, 0, 235))

    img = film_grain(img.convert("RGB"), 20)
    img.save(f"{OUT}/hero-cinematic.jpg", quality=85, optimize=True)
    print("hero")


def make_echoes():
    w, h = 1400, 900
    img = vertical_gradient(w, h, (10, 12, 16), (4, 5, 6))
    draw = ImageDraw.Draw(img)
    peaks = []
    x = 0
    while x < w:
        peaks.append((x, int(h * 0.38 + math.sin(x / 70) * 90 + math.cos(x / 40) * 40)))
        x += 55
    mountain(draw, w, h, int(h * 0.72), peaks, (14, 16, 18))
    peaks2 = [(x, int(h * 0.55 + math.sin(x / 50) * 60)) for x in range(0, w, 40)]
    mountain(draw, w, h, int(h * 0.85), peaks2, (8, 9, 10))
    img = radial_glow(img, int(w * 0.35), int(h * 0.38), 320, ACCENT, 0.42)
    img = radial_glow(img, int(w * 0.72), int(h * 0.55), 180, ACCENT, 0.22)
    draw = ImageDraw.Draw(img, "RGBA")
    for i in range(6):
        x0 = int(w * 0.28) + i * 35
        draw.polygon([(x0, int(h * 0.22)), (x0 + 18, int(h * 0.22)), (x0 + 70, h), (x0 + 18, h)], fill=(184, 255, 0, 14))
    img = film_grain(img.convert("RGB"), 18)
    img.save(f"{OUT}/project-echoes.jpg", quality=85, optimize=True)
    print("echoes")


def make_fluidity():
    w, h = 800, 1100
    img = Image.new("RGB", (w, h), (8, 6, 18))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    colors = [(80, 40, 160, 55), (40, 80, 200, 50), (120, 60, 220, 45), (20, 30, 80, 65), (184, 255, 0, 28)]
    for i in range(35):
        cx, cy = random.randint(0, w), random.randint(0, h)
        rx, ry = random.randint(70, 260), random.randint(50, 200)
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=colors[i % len(colors)])
    overlay = overlay.filter(ImageFilter.GaussianBlur(38))
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    ribbon = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ribbon)
    for wave in range(5):
        pts = [(x, int(h * 0.28 + wave * 90 + math.sin(x / 55 + wave) * 48)) for x in range(0, w, 6)]
        rd.line(pts, fill=(180, 140, 255, 100), width=3)
        rd.line([(p[0], p[1] + 10) for p in pts], fill=(184, 255, 0, 40), width=1)
    img = Image.alpha_composite(img, ribbon.filter(ImageFilter.GaussianBlur(1.5)))
    img = film_grain(img.convert("RGB"), 16)
    img.save(f"{OUT}/project-fluidity.jpg", quality=85, optimize=True)
    print("fluidity")


def make_kinetic():
    w, h = 800, 1100
    img = Image.new("RGB", (w, h), (10, 10, 10))
    draw = ImageDraw.Draw(img)
    try:
        font_lg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 96)
        font_md = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
    except OSError:
        font_lg = font_md = ImageFont.load_default()
    words = ["KINETIC", "MOTION", "TYPE", "FORM", "PULSE"]
    y = 70
    for i, word in enumerate(words):
        x = 36 if i % 2 == 0 else 100
        for j in range(10):
            shade = 18 + j * 18
            draw.rectangle([x + j * 16, y + 18, x + j * 16 + 8, y + 78], fill=(shade, shade, shade))
        fill = (235, 235, 235) if i % 3 else (45, 45, 45)
        draw.text((x, y), word, font=font_lg if i < 3 else font_md, fill=fill)
        y += 150 if i < 3 else 115
    draw.polygon([(w - 50, 0), (w, 0), (w - 160, h), (w - 210, h)], fill=ACCENT)
    for i in range(18):
        y = 90 + i * 55
        a = 35 + (i % 5) * 18
        draw.line([(0, y), (w, y)], fill=(a, a, a), width=1)
    img = film_grain(img, 12)
    img.save(f"{OUT}/project-kinetic.jpg", quality=85, optimize=True)
    print("kinetic")


def make_portrait():
    w, h = 800, 1100
    img = vertical_gradient(w, h, (48, 48, 48), (16, 16, 16))
    draw = ImageDraw.Draw(img)
    cx, cy = w // 2, int(h * 0.36)
    draw.ellipse([cx - 105, cy - 130, cx + 105, cy + 95], fill=(195, 195, 198))
    draw.ellipse([cx - 115, cy - 140, cx + 85, cy + 35], fill=(28, 28, 30))
    draw.ellipse([cx - 35, cy - 55, cx + 85, cy + 65], fill=(225, 225, 228))
    draw.polygon([(cx - 45, cy + 85), (cx + 45, cy + 85), (cx + 170, h), (cx - 170, h)], fill=(150, 150, 152))
    draw.polygon([(cx - 150, int(h * 0.52)), (cx + 150, int(h * 0.52)), (cx + 210, h), (cx - 210, h)], fill=(42, 42, 44))
    light = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(light).polygon([(0, 0), (int(w * 0.42), 0), (int(w * 0.18), h), (0, h)], fill=(0, 0, 0, 130))
    img = Image.alpha_composite(img.convert("RGBA"), light).convert("RGB")
    img = img.filter(ImageFilter.GaussianBlur(0.8))
    img = film_grain(img, 22)
    img.save(f"{OUT}/portrait.jpg", quality=85, optimize=True)
    print("portrait")


def make_signature():
    w, h = 560, 180
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    strokes = [
        [(30, 130), (60, 35), (90, 130)],
        [(48, 95), (75, 95)],
        [(110, 130), (110, 65), (140, 65), (150, 85), (150, 130)],
        [(172, 130), (172, 75)],
        [(172, 50), (172, 45)],
        [(195, 35), (195, 130)],
        [(195, 95), (235, 65)],
        [(195, 95), (240, 130)],
        [(265, 105), (295, 85), (325, 105), (295, 125), (265, 105)],
        [(345, 45), (345, 130), (375, 130)],
        [(330, 70), (365, 70)],
        [(390, 115), (450, 85), (510, 125), (540, 75)],
    ]
    for stroke in strokes:
        if len(stroke) == 2 and abs(stroke[0][0] - stroke[1][0]) < 2 and abs(stroke[0][1] - stroke[1][1]) < 8:
            x, y = stroke[0]
            draw.ellipse([x - 3, y - 3, x + 3, y + 3], fill=(*ACCENT, 255))
        else:
            draw.line(stroke, fill=(*ACCENT, 255), width=3, joint="curve")
    img.save(f"{OUT}/signature.png", optimize=True)
    print("signature")


def make_gallery():
    items = [
        ("gallery-01.jpg", "visor", (720, 980)),
        ("gallery-02.jpg", "motion", (640, 900)),
        ("gallery-03.jpg", "portal", (700, 960)),
        ("gallery-04.jpg", "fluid", (620, 880)),
        ("gallery-05.jpg", "orbit", (680, 940)),
    ]
    for name, kind, (w, h) in items:
        if kind == "visor":
            img = vertical_gradient(w, h, (28, 28, 32), (8, 8, 10))
            d = ImageDraw.Draw(img)
            cx, cy = w // 2, int(h * 0.38)
            d.ellipse([cx - 90, cy - 115, cx + 90, cy + 95], fill=(190, 190, 195))
            d.ellipse([cx - 100, cy - 125, cx + 65, cy + 15], fill=(14, 14, 16))
            d.polygon([(cx - 70, cy + 85), (cx + 70, cy + 85), (cx + 150, h), (cx - 150, h)], fill=(38, 38, 42))
            img = radial_glow(img, cx, cy, 85, ACCENT, 0.65)
            d = ImageDraw.Draw(img)
            d.rectangle([cx - 60, cy - 16, cx + 60, cy + 12], fill=ACCENT)
        elif kind == "motion":
            img = Image.new("RGB", (w, h), (8, 8, 8))
            d = ImageDraw.Draw(img)
            for i in range(50):
                y = int(h * 0.08 + i * (h * 0.82 / 50))
                offset = int(math.sin(i / 3.5) * 70)
                shade = 22 + (i % 9) * 18
                d.arc([40 + offset, y - 35, w - 40 + offset, y + 35], 0, 180, fill=(shade, shade, shade), width=2)
            for i in range(7):
                y = int(h * 0.2 + i * 90)
                d.line([(30, y), (w - 30, y + 28)], fill=ACCENT if i % 3 == 0 else (70, 70, 70), width=1)
        elif kind == "portal":
            img = vertical_gradient(w, h, (10, 10, 12), (4, 4, 5))
            cx, cy = int(w * 0.5), int(h * 0.42)
            img = radial_glow(img, cx, cy, 160, ACCENT, 0.55)
            img = radial_glow(img, int(w * 0.32), int(h * 0.55), 70, ACCENT, 0.3)
            img = radial_glow(img, int(w * 0.68), int(h * 0.55), 70, ACCENT, 0.3)
            d = ImageDraw.Draw(img)
            for s in (110, 75, 40):
                d.ellipse([cx - s, cy - s, cx + s, cy + s], outline=ACCENT, width=2 if s > 50 else 3)
            d.ellipse([cx - 25, cy - 25, cx + 25, cy + 25], fill=(50, 70, 12))
            fx, fy = cx, int(h * 0.7)
            d.ellipse([fx - 7, fy - 45, fx + 7, fy - 31], fill=(0, 0, 0))
            d.rectangle([fx - 11, fy - 30, fx + 11, fy + 18], fill=(0, 0, 0))
        elif kind == "fluid":
            img = Image.new("RGB", (w, h), (5, 5, 5))
            overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
            d = ImageDraw.Draw(overlay)
            for i in range(22):
                cx, cy = random.randint(0, w), random.randint(0, h)
                rx, ry = random.randint(50, 180), random.randint(40, 160)
                col = ACCENT + (random.randint(22, 55),) if i % 4 == 0 else (42, 42, 48, random.randint(35, 75))
                d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=col)
            img = Image.alpha_composite(img.convert("RGBA"), overlay.filter(ImageFilter.GaussianBlur(32))).convert("RGB")
            d = ImageDraw.Draw(img)
            for i in range(12):
                pts = [(int(w * 0.08 + j * 18), int(h * 0.25 + i * 45 + math.sin(j / 3 + i) * 22)) for j in range(35)]
                d.line(pts, fill=ACCENT if i % 4 == 0 else (55, 55, 55), width=1)
        else:  # orbit
            img = Image.new("RGB", (w, h), (8, 8, 10))
            cx, cy = w // 2, h // 2
            img = radial_glow(img, cx, cy, 280, ACCENT, 0.32)
            d = ImageDraw.Draw(img)
            for r in (70, 130, 190, 260):
                d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT if r == 130 else (42, 42, 48), width=3 if r == 130 else 2)
            d.ellipse([cx - 26, cy - 26, cx + 26, cy + 26], fill=ACCENT)
            for ang in (40, 130, 220, 310):
                rad = math.radians(ang)
                ox = cx + int(190 * math.cos(rad))
                oy = cy + int(190 * math.sin(rad))
                d.ellipse([ox - 5, oy - 5, ox + 5, oy + 5], fill=(220, 220, 220))

        img = film_grain(img.convert("RGB"), 16)
        img.save(f"{OUT}/{name}", quality=84, optimize=True)
        print(name)


def make_icons():
    with open(f"{ICONS}/play.svg", "w") as f:
        f.write(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">'
            '<circle cx="12" cy="12" r="11" stroke="#b8ff00" stroke-width="1"/>'
            '<path d="M10 8l6 4-6 4V8z" fill="#b8ff00"/>'
            "</svg>\n"
        )
    with open(f"{ICONS}/star.svg", "w") as f:
        f.write(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">'
            '<path d="M32 4 L36 28 L60 32 L36 36 L32 60 L28 36 L4 32 L28 28 Z" fill="#b8ff00"/>'
            "</svg>\n"
        )
    with open(f"{ICONS}/location.svg", "w") as f:
        f.write(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">'
            '<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" stroke="#b8ff00" stroke-width="1.5"/>'
            '<circle cx="12" cy="9" r="2.5" fill="#b8ff00"/>'
            "</svg>\n"
        )
    open("/workspace/assets/videos/.gitkeep", "w").close()
    print("icons")


if __name__ == "__main__":
    make_hero()
    make_echoes()
    make_fluidity()
    make_kinetic()
    make_portrait()
    make_signature()
    make_gallery()
    make_icons()
    print("Done.")
