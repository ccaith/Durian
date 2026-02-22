# backend/authapi/utils/pdf_utils.py
from fpdf import FPDF
from io import BytesIO

def generate_receipt_pdf(items, subtotal, total, transaction_id):
    """
    Generate a PDF receipt and return it as a BytesIO buffer.
    Includes transaction_id at the top.
    """
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Durian App Receipt", ln=True, align="C")
    pdf.ln(5)
    
    # Transaction ID
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, f"Transaction ID: {transaction_id}", ln=True)
    
    # Subtotal
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 10, f"Subtotal: ₱{subtotal}", ln=True)
    pdf.ln(5)
    
    # Items
    pdf.cell(0, 10, "Items:", ln=True)
    for item in items:
        pdf.cell(
            0,
            10,
            f"{item['name']} x {item['quantity']} - ₱{item['price']*item['quantity']}",
            ln=True
        )
    
    pdf.ln(5)
    pdf.cell(0, 10, f"Grand Total: ₱{total}", ln=True)
    
    # Save to buffer
    buffer = BytesIO()
    pdf.output(buffer)
    buffer.seek(0)
    return buffer