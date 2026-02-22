from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from utils.pdf_utils import generate_receipt_pdf  # returns BytesIO
import uuid

bp = Blueprint('transaction', __name__)

@bp.route("/checkout", methods=["POST"])
def checkout():
    data = request.json
    email = data.get('email')
    items = data.get('items')
    total = data.get('total')

    if not email or not items or total is None:
        return jsonify({"error": "Missing data"}), 400

    try:
        # 1️⃣ Generate a unique transaction ID
        transaction_id = str(uuid.uuid4())

        # 2️⃣ Generate PDF
        pdf_buffer = generate_receipt_pdf(items, total, transaction_id)

        # 3️⃣ Prepare email
        msg = Message(
            subject="Your DurianApp Order Receipt",
            recipients=[email],
            body=f"Thank you for your purchase! Your receipt (Transaction ID: {transaction_id}) is attached."
        )

        # 4️⃣ Attach PDF
        msg.attach("receipt.pdf", "application/pdf", pdf_buffer.read())

        # 5️⃣ Send email
        current_app.extensions["mail"].send(msg)

        # 6️⃣ Return success + transaction ID to frontend
        return jsonify({
            "success": True,
            "transaction_id": transaction_id,
            "amount": total,
            "email": email
        })

    except Exception as e:
        print("Checkout error:", e)
        return jsonify({"success": False, "message": "Server error"}), 500