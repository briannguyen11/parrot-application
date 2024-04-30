# utils/email_verification_link.py
import os
from dotenv import load_dotenv
from accounts.firebase_auth.firebase_authentication import auth as firebase_admin_auth

load_dotenv()

# send Firebase email verification link
def send_firebase_email_verification_link(user_email, display_name):
    action_code_settings = firebase_admin_auth.ActionCodeSettings(
        url=f"{os.getenv("VITE_FRONTEND_URL")}/",
        handle_code_in_app=True,
    )
    firebase_admin_auth.generate_email_verification_link(
        user_email, action_code_settings
    )
