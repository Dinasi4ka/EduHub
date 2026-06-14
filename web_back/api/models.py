from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    USER_TYPES = [
        ('student', 'Student'),
        ('tutor', 'Tutor'),
    ]

    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    experience = models.PositiveIntegerField(null=True, blank=True)
    years_old = models.PositiveIntegerField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    google_drive_link = models.TextField(null=True, blank=True)


class CustomUserDetails(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='details')
    price = models.PositiveIntegerField(null=False, blank=False, default=200)


class TutorMeetings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tutor_meeting')
    datetime = models.DateTimeField()


class TutorGroupMeetings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tutor_group_meeting')
    theme = models.TextField(null=False, blank=False, default='')
    about = models.TextField(null=True, blank=True, default='')
    datetime = models.DateTimeField()
    hours = models.PositiveIntegerField(null=False, blank=False)
    price = models.PositiveIntegerField(null=False, blank=False, default=200)
    max_students = models.PositiveIntegerField(null=False, blank=False)


class StudentMeetings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='student')
    meet = models.OneToOneField(TutorMeetings, on_delete=models.CASCADE, related_name='student_meeting')
    hours = models.FloatField(null=False, blank=False)
    comment = models.TextField(null=True, blank=True, default='')


class StudentGroupMeetings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='student_group')
    meet = models.ForeignKey(TutorGroupMeetings, on_delete=models.CASCADE, related_name='student_group_meeting')
