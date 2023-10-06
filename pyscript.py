import sys
import os
from convert_pdftodocx import convert

def convert_pdf_to_docx(pdf_path, output_path):
    convert(pdf_path, output_path)
    print("Conversion complete")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <path_to_pdf>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    output_path = os.path.splitext(pdf_path)[0] + ".docx"

    convert_pdf_to_docx(pdf_path, output_path)
