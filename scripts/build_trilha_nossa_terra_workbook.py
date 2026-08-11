from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "lib" / "rural-pilot.ts"
HERO = ROOT / "public" / "images" / "journeys" / "nossa-terra-mapa.png"
OUTPUT = ROOT / "output" / "pdf" / "trilha-nossa-terra-caderno-da-crianca.pdf"

PAGE_W, PAGE_H = A4
FOREST = colors.HexColor("#256F5A")
CLAY = colors.HexColor("#B95D41")
GOLD = colors.HexColor("#D99D34")
INK = colors.HexColor("#1F2B25")
MUTED = colors.HexColor("#667166")
PAPER = colors.HexColor("#FFFDF7")
CREAM = colors.HexColor("#F8E7C7")
LIGHT_GREEN = colors.HexColor("#E7F2E9")
LINE = colors.HexColor("#D9CDB7")


def parse_phases() -> list[dict[str, str]]:
    source = SOURCE.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\n\s+phase: (\d+),(.*?)\n\s+\},", source, re.S)
    phases: list[dict[str, str]] = []
    for phase_number, body in blocks:
        values = {"phase": phase_number}
        for key, value in re.findall(r"(\w+): '([^']*)'", body):
            values[key] = value
        if "childCall" in values:
            phases.append(values)
    if len(phases) != 14:
        raise ValueError(f"Esperava 14 fases, encontrei {len(phases)}")
    return phases


def rounded_box(pdf: canvas.Canvas, x: float, y: float, w: float, h: float, fill, stroke=LINE, radius=12):
    pdf.setFillColor(fill)
    pdf.setStrokeColor(stroke)
    pdf.roundRect(x, y, w, h, radius, fill=1, stroke=1)


def wrapped_lines(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(pdf: canvas.Canvas, text: str, x: float, y: float, width: float, *, size=11, leading=15, color=INK, font="Helvetica", max_lines=None):
    pdf.setFillColor(color)
    pdf.setFont(font, size)
    lines = wrapped_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def label(pdf: canvas.Canvas, text: str, x: float, y: float, color=FOREST):
    pdf.setFillColor(color)
    pdf.setFont("Helvetica-Bold", 8.5)
    pdf.drawString(x, y, text.upper())


def footer(pdf: canvas.Canvas, page_number: int):
    pdf.setStrokeColor(LINE)
    pdf.line(38, 28, PAGE_W - 38, 28)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(38, 17, "BROTA! - TRILHA NOSSA TERRA - CADERNO DA CRIANÇA")
    pdf.drawRightString(PAGE_W - 38, 17, str(page_number))


def cover(pdf: canvas.Canvas):
    image = ImageReader(str(HERO))
    pdf.drawImage(image, 0, 0, PAGE_W, PAGE_H, preserveAspectRatio=False, mask="auto")
    pdf.saveState()
    pdf.setFillAlpha(0.84)
    pdf.setFillColor(FOREST)
    pdf.roundRect(42, 84, PAGE_W - 84, 264, 24, fill=1, stroke=0)
    pdf.restoreState()
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 13)
    pdf.drawString(68, 328, "BROTA!")
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(68, 304, "UMA TRILHA PARA CRIANÇAS DE 7 A 10 ANOS")
    pdf.setFont("Helvetica-Bold", 38)
    pdf.drawString(68, 250, "NOSSA TERRA")
    draw_text(pdf, "Caderno de pistas, ideias, testes e descobertas", 68, 214, PAGE_W - 136, size=18, leading=23, color=colors.white, font="Helvetica-Bold")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(68, 132, "MEU NOME: ______________________________________")
    pdf.drawString(68, 106, "MINHA TURMA: ____________________________________")
    pdf.showPage()


def how_to_use(pdf: canvas.Canvas, page_number: int):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(pdf, "ANTES DE COMEÇAR", 44, PAGE_H - 54)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 28)
    pdf.drawString(44, PAGE_H - 92, "Este caderno vai com você")
    draw_text(pdf, "Aqui não existe resposta pronta. Cada missão pede que você olhe, escute, experimente e guarde uma pista do lugar onde vive.", 44, PAGE_H - 126, PAGE_W - 88, size=13, leading=19)
    steps = [
        ("1", "Leia o chamado", "Descubra qual pergunta vai guiar a missão."),
        ("2", "Faça o movimento", "Use o corpo, uma conversa, um desenho ou um objeto simples."),
        ("3", "Guarde uma pista", "Registre algo que você viu, ouviu, testou ou mudou de ideia."),
        ("4", "Conte como foi", "Marque se deu conta, precisou de ajuda ou quer tentar de outro jeito."),
    ]
    y = PAGE_H - 220
    for number, title, text in steps:
        rounded_box(pdf, 44, y - 78, PAGE_W - 88, 66, LIGHT_GREEN if number in {"1", "3"} else colors.white)
        pdf.setFillColor(FOREST)
        pdf.circle(72, y - 45, 18, fill=1, stroke=0)
        pdf.setFillColor(colors.white)
        pdf.setFont("Helvetica-Bold", 15)
        pdf.drawCentredString(72, y - 50, number)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 13)
        pdf.drawString(104, y - 37, title)
        draw_text(pdf, text, 104, y - 55, PAGE_W - 170, size=10.5, leading=14, color=MUTED)
        y -= 82
    rounded_box(pdf, 44, 70, PAGE_W - 88, 72, CREAM, stroke=GOLD)
    label(pdf, "LEMBRETE", 60, 122, CLAY)
    draw_text(pdf, "Pedir ajuda, mudar de ideia e parar uma tentativa com um bom motivo também fazem parte da aprendizagem.", 60, 102, PAGE_W - 120, size=11.5, leading=16, font="Helvetica-Bold")
    footer(pdf, page_number)
    pdf.showPage()


def chapter_page(pdf: canvas.Canvas, chapter: str, phases: str, text: str, page_number: int, index: int):
    fill = [FOREST, CLAY, colors.HexColor("#477F95"), GOLD][index]
    pdf.setFillColor(fill)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setStrokeColor(colors.Color(1, 1, 1, alpha=0.22))
    for row in range(7):
        for col in range(5):
            pdf.circle(80 + col * 110, 100 + row * 110, 27 + ((row + col) % 3) * 8, fill=0, stroke=1)
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(54, PAGE_H - 100, f"TRECHO {index + 1} DO CAMINHO - MISSÕES {phases}")
    pdf.setFont("Helvetica-Bold", 36)
    for offset, line in enumerate(wrapped_lines(chapter, "Helvetica-Bold", 36, PAGE_W - 108)):
        pdf.drawString(54, PAGE_H - 162 - offset * 42, line)
    draw_text(pdf, text, 54, PAGE_H - 275, PAGE_W - 108, size=16, leading=23, color=colors.white, font="Helvetica-Bold")
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica", 12)
    pdf.drawString(54, 62, "Abra espaço para observar, conversar, construir e mudar de ideia.")
    pdf.setFont("Helvetica", 8)
    pdf.drawRightString(PAGE_W - 38, 20, str(page_number))
    pdf.showPage()


def mission_page(pdf: canvas.Canvas, phase: dict[str, str], page_number: int):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(FOREST)
    pdf.roundRect(38, PAGE_H - 124, PAGE_W - 76, 78, 18, fill=1, stroke=0)
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(58, PAGE_H - 72, f"{phase['chapter'].upper()} - MISSÃO {int(phase['phase']):02d}")
    draw_text(pdf, phase["childCall"], 58, PAGE_H - 94, PAGE_W - 116, size=16, leading=19, color=colors.white, font="Helvetica-Bold", max_lines=2)

    rounded_box(pdf, 38, PAGE_H - 250, PAGE_W - 76, 102, CREAM, stroke=GOLD)
    label(pdf, "MEU MOVIMENTO", 54, PAGE_H - 172, CLAY)
    draw_text(pdf, phase["childMove"], 54, PAGE_H - 194, PAGE_W - 108, size=11.5, leading=16, max_lines=4)

    rounded_box(pdf, 38, PAGE_H - 330, PAGE_W - 76, 60, LIGHT_GREEN, stroke=FOREST)
    label(pdf, "PISTA QUE PRECISA FICAR", 54, PAGE_H - 292)
    draw_text(pdf, phase["evidence"], 54, PAGE_H - 312, PAGE_W - 108, size=10.5, leading=14, font="Helvetica-Bold", max_lines=2)

    label(pdf, "MEU REGISTRO", 42, PAGE_H - 364, CLAY)
    pdf.setStrokeColor(LINE)
    pdf.setDash(1, 3)
    pdf.roundRect(38, 164, PAGE_W - 76, PAGE_H - 550, 14, fill=0, stroke=1)
    pdf.setDash()
    for y in range(186, int(PAGE_H - 392), 28):
        pdf.setStrokeColor(colors.HexColor("#E9DECB"))
        pdf.line(54, y, PAGE_W - 54, y)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Oblique", 9.5)
    pdf.drawString(54, PAGE_H - 390, "Desenhe, escreva, cole ou marque aqui o que você descobriu.")

    label(pdf, "COMO FOI PARA MIM?", 42, 132, FOREST)
    options = [("DEI CONTA", FOREST), ("PRECISEI DE AJUDA", GOLD), ("QUERO TENTAR DE OUTRO JEITO", CLAY)]
    x = 44
    for text, color in options:
        pdf.setStrokeColor(color)
        pdf.circle(x + 8, 104, 8, fill=0, stroke=1)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 8.5)
        pdf.drawString(x + 22, 101, text)
        x += 164 if text != "PRECISEI DE AJUDA" else 176
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(44, 76, "Uma coisa que quero contar: _________________________________________________")
    footer(pdf, page_number)
    pdf.showPage()


def cutout_cards(pdf: canvas.Canvas, page_number: int):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    label(pdf, "CARTAS PARA RECORTAR", 42, PAGE_H - 48)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 27)
    pdf.drawString(42, PAGE_H - 84, "Ajuda para quando a missão apertar")
    cards = [
        ("PISTA", "Algo que vimos, ouvimos ou testamos de verdade.", LIGHT_GREEN, FOREST),
        ("PALPITE", "Uma ideia que ainda precisa ser conferida.", CREAM, CLAY),
        ("PEDIR AJUDA", "Dizer para quem e em qual parte o grupo travou.", colors.white, FOREST),
        ("TROCAR A ROTA", "Mudar a primeira ideia depois de encontrar uma pista nova.", LIGHT_GREEN, FOREST),
        ("TESTAR PEQUENO", "Fazer a menor versão que consegue conversar com alguém.", CREAM, CLAY),
        ("CUIDADO", "Parar quando faltar segurança, consentimento ou respeito.", colors.white, CLAY),
    ]
    card_w = (PAGE_W - 102) / 2
    card_h = 188
    for index, (title, text, fill, accent) in enumerate(cards):
        col, row = index % 2, index // 2
        x = 38 + col * (card_w + 26)
        y = PAGE_H - 126 - (row + 1) * card_h - row * 18
        pdf.setDash(4, 3)
        rounded_box(pdf, x, y, card_w, card_h, fill, stroke=accent, radius=18)
        pdf.setDash()
        pdf.setFillColor(accent)
        pdf.circle(x + 38, y + card_h - 38, 17, fill=1, stroke=0)
        pdf.setFillColor(colors.white)
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawCentredString(x + 38, y + card_h - 42, str(index + 1))
        pdf.setFillColor(accent)
        pdf.setFont("Helvetica-Bold", 15)
        pdf.drawString(x + 66, y + card_h - 43, title)
        draw_text(pdf, text, x + 22, y + card_h - 78, card_w - 44, size=11, leading=16, max_lines=4)
        pdf.setFillColor(MUTED)
        pdf.setFont("Helvetica", 8)
        pdf.drawString(x + 22, y + 22, "QUANDO USAMOS: __________________________")
    footer(pdf, page_number)
    pdf.showPage()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    phases = parse_phases()
    chapter_texts = {
        "Abrir os olhos": "Perceber lugares, pessoas, trabalhos e perguntas que já vivem no território.",
        "Escutar quem vive aqui": "Trocar palpites por conversas, pistas reais e mais de uma ideia possível.",
        "Fazer e melhorar": "Construir com o que temos, testar pequeno e usar a crítica para mudar.",
        "Devolver para a comunidade": "Contar o que aprendemos, abrir a oficina e escolher um próximo cuidado.",
    }
    chapter_ranges = {
        "Abrir os olhos": "1-4",
        "Escutar quem vive aqui": "5-7",
        "Fazer e melhorar": "8-11",
        "Devolver para a comunidade": "12-14",
    }
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("Brota! - Trilha Nossa Terra - Caderno da Criança")
    pdf.setAuthor("Empreendedor Rural Mirim")
    cover(pdf)
    page_number = 2
    how_to_use(pdf, page_number)
    page_number += 1
    current_chapter = None
    chapter_index = -1
    for phase in phases:
        if phase["chapter"] != current_chapter:
            current_chapter = phase["chapter"]
            chapter_index += 1
            chapter_page(pdf, current_chapter, chapter_ranges[current_chapter], chapter_texts[current_chapter], page_number, chapter_index)
            page_number += 1
        mission_page(pdf, phase, page_number)
        page_number += 1
    cutout_cards(pdf, page_number)
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
