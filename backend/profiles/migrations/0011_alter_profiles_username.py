# Generated by Django 4.2.13 on 2024-06-05 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0010_profiles_banner_profiles_header_profiles_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profiles',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
