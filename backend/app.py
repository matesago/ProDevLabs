"""
ProDev Labs — Backend del formulario de contacto
=================================================

API construida con FastAPI que expone el endpoint POST /api/contacto.
Recibe los datos del formulario (nombre, email, servicio, mensaje) y
envía un correo de notificación usando smtplib (SMTP de Gmail) al
correo de la empresa.

Ejecutar en desarrollo:
    uvicorn app:app --reload --port 8000

Variables de entorno requeridas (ver .env.example):
    EMAIL_USER        Cuenta de Gmail que envía el correo
    EMAIL_PASS        Contraseña de aplicación de esa cuenta (no la contraseña normal)
    RECIPIENT_EMAIL   Correo que recibe los mensajes del formulario
"""

import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

# ---------------------------------------------------------------------------
# Configuración
# ---------------------------------------------------------------------------
load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "mariat018@gmail.com")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("prodevlabs.contacto")

app = FastAPI(
    title="ProDev Labs API",
    description="API del formulario de contacto de ProDev Labs",
    version="1.0.0",
)

# CORS: permite que el frontend estático (servido desde otro puerto/origen
# durante el desarrollo) pueda llamar a esta API. En producción, restringe
# `allow_origins` al dominio real del sitio.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Modelos
# ---------------------------------------------------------------------------
class ContactoRequest(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    servicio: str = Field(..., min_length=2, max_length=120)
    mensaje: str = Field(..., min_length=10, max_length=3000)


class ContactoResponse(BaseModel):
    success: bool
    message: str


# ---------------------------------------------------------------------------
# Envío de correo
# ---------------------------------------------------------------------------
def enviar_correo(datos: ContactoRequest) -> None:
    """Construye y envía el correo de notificación vía SMTP (Gmail)."""
    if not EMAIL_USER or not EMAIL_PASS:
        logger.error("Faltan EMAIL_USER / EMAIL_PASS en las variables de entorno.")
        raise RuntimeError("Configuración de correo incompleta en el servidor.")

    asunto = f"Nuevo contacto desde el sitio web — {datos.nombre}"
    cuerpo = (
        f"Has recibido un nuevo mensaje desde el formulario de contacto de ProDev Labs.\n\n"
        f"Nombre: {datos.nombre}\n"
        f"Correo: {datos.email}\n"
        f"Servicio de interés: {datos.servicio}\n"
        f"Mensaje:\n{datos.mensaje}\n"
    )

    mensaje = MIMEMultipart()
    mensaje["From"] = EMAIL_USER
    mensaje["To"] = RECIPIENT_EMAIL
    mensaje["Reply-To"] = datos.email
    mensaje["Subject"] = asunto
    mensaje.attach(MIMEText(cuerpo, "plain", "utf-8"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as servidor:
        servidor.starttls()
        servidor.login(EMAIL_USER, EMAIL_PASS)
        servidor.sendmail(EMAIL_USER, RECIPIENT_EMAIL, mensaje.as_string())


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.get("/api/health", tags=["General"])
def health_check():
    """Endpoint simple para verificar que la API está viva."""
    return {"status": "ok", "service": "ProDev Labs API"}


@app.post(
    "/api/contacto",
    response_model=ContactoResponse,
    status_code=status.HTTP_200_OK,
    tags=["Contacto"],
)
def contacto(payload: ContactoRequest):
    """Recibe el formulario de contacto y envía la notificación por correo."""
    try:
        enviar_correo(payload)
    except smtplib.SMTPAuthenticationError:
        logger.exception("Error de autenticación SMTP")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="No fue posible autenticar el servicio de correo. Contacta al administrador.",
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Error enviando el correo de contacto")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ocurrió un error al enviar tu mensaje. Intenta nuevamente más tarde.",
        ) from exc

    logger.info("Mensaje de contacto enviado correctamente (%s)", payload.email)
    return ContactoResponse(
        success=True,
        message="¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.",
    )
