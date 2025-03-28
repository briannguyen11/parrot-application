# Generated by Django 4.2.11 on 2024-05-12 21:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('showcase_projects', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='showcaseproject',
            name='photos',
        ),
        migrations.AlterField(
            model_name='like',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                                       related_name='likes', to='showcase_projects.showcaseproject'),
        ),
        migrations.AlterField(
            model_name='like',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                    related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
