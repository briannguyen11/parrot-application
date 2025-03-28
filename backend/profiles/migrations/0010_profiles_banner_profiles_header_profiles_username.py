# Generated by Django 4.2.11 on 2024-05-30 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0009_alter_profiles_github_alter_profiles_linkedin_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profiles',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to='profiles/banners'),
        ),
        migrations.AddField(
            model_name='profiles',
            name='header',
            field=models.CharField(default='empty', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profiles',
            name='username',
            field=models.CharField(default='empty', max_length=100),
            preserve_default=False,
        ),
    ]
