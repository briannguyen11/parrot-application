# utils/email_verification_link.py

from accounts.firebase_auth.firebase_authentication import auth as firebase_admin_auth


# send Firebase email verification link
def send_firebase_email_verification_link(user_email):
    action_code_settings = firebase_admin_auth.ActionCodeSettings(
        url="http://localhost:5173/",
        handle_code_in_app=True,
    )
    firebase_admin_auth.generate_email_verification_link(
        user_email, action_code_settings
    )
