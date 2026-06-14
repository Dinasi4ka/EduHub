from .models import CustomUser, TutorGroupMeetings, TutorMeetings, StudentMeetings
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'user_type', 'experience', 'first_name', 'last_name', 'years_old',
                  'about', 'google_drive_link']


class StudentMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentMeetings
        fields = ['id', 'user', 'meet', 'hours', 'comment']


class TutorMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorMeetings
        fields = ['id', 'user', 'datetime']


class GroupMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorGroupMeetings
        fields = ['id', 'user', 'theme', 'about', 'datetime', 'hours', 'max_students', 'price']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (optional)
        token['email'] = user.email
        return token

    def validate(self, attrs):
        email = attrs.get("username")  # SimpleJWT expects 'username' by default
        password = attrs.get("password")

        user = CustomUser.objects.get(email=email)

        user = authenticate(request=self.context.get("request"), username=user.username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        # Validate and return tokens
        refresh = self.get_token(user)
        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return data
