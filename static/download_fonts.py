import os
import requests
import re
from urllib.parse import unquote


def download_font(font_name, output_dir):
    url = f"https://fonts.googleapis.com/css2?family={font_name}"
    response = requests.get(url)
    if response.status_code == 200:
        font_urls = re.findall(r"src: url\((.*?)\)", response.text)
        if font_urls:
            font_url = unquote(font_urls[0])
            font_response = requests.get(font_url)
            if font_response.status_code == 200:
                filename = os.path.join(
                    output_dir, f"{font_name.replace('+', '')}.woff2"
                )
                with open(filename, "wb") as f:
                    f.write(font_response.content)
                print(f"Downloaded: {filename}")
            else:
                print(f"Failed to download font file for {font_name}")
        else:
            print(f"No font URL found for {font_name}")
    else:
        print(f"Failed to fetch CSS for {font_name}")


def main():
    fonts = [
        "Coda",
        "K2D",
        "Noto+Sans+Display",
        "Saira+Semi+Condensed",
        "Titillium+Web",
        "Alike+Angular",
        "Gilda+Display",
        "Inria+Serif",
        "Mate",
        "Piazzolla",
        "Port+Lligat+Slab",
        "Sedan",
    ]

    output_dir = "fonts"
    os.makedirs(output_dir, exist_ok=True)

    for font in fonts:
        download_font(font, output_dir)


if __name__ == "__main__":
    main()
