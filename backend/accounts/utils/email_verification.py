# email verficiation

from accounts.firebase_auth.firebase_authentication import auth as firebase_admin_auth
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings


# create custom email verification link


def send_verification_email(email):

    # Generate email verification link
    # action_code_settings = firebase_admin_auth.ActionCodeSettings(
    #     url="http://localhost:5173/onboard",
    #     handle_code_in_app=True,
    # )
    verification_link = firebase_admin_auth.generate_email_verification_link(
        email
        # , action_code_settings
    )

    # Create SendGrid email message
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=email,
        subject="Email Verification for Parrot",
        html_content=f"Click the following link to verify your email: {verification_link}",
    )

    # Send email using SendGrid API
    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
    response = sg.send(message)

    return response.status_code
