# users/managers.py

from django.contrib.auth.models import BaseUserManager
from django.utils.text import slugify

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Crea y guarda un usuario con el email y la contraseña proporcionados.
        """
        if not email:
            raise ValueError('El email debe ser proporcionado')

        email = self.normalize_email(email)
        base_username = slugify(email.split('@')[0])
        username = base_username
        counter = 1
        while self.model.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        extra_fields['username'] = username
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Maneja el hashing de la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crea y guarda un superusuario con el email y la contraseña proporcionados.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # Asegúrate de que el rol de superusuario sea 'admin'

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
