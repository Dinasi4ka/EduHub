from .models import CustomUser, CustomUserDetails, TutorGroupMeetings, StudentGroupMeetings, StudentMeetings, \
    TutorMeetings
from .serializers import UserSerializer, GroupMeetingSerializer, TutorMeetingSerializer, StudentMeetingSerializer
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .utils import generate_comment
from datetime import datetime, timedelta


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CreateMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        meet_type = request.data.get('type')
        date = request.data.get('date')
        time = request.data.get('time')
        theme = request.data.get('theme')
        about = request.data.get('about')
        hours = request.data.get('hours')
        price = request.data.get('price')
        max = request.data.get('max')

        provided = datetime.strptime(f"{date}T{time}", "%Y-%m-%dT%H:%M")
        start = provided - timedelta(hours=3)
        end = provided + timedelta(hours=3)
        meet = TutorMeetings.objects.filter(user=user, datetime__range=(start, end))
        meet_group = TutorGroupMeetings.objects.filter(user=user, datetime__range=(start, end))
        if meet or meet_group:
            return Response({"status": "this time already busy"}, status=status.HTTP_201_CREATED)

        if meet_type == "individual":
            TutorMeetings.objects.create(user=user, datetime=f"{date}T{time}:00")
        if meet_type == "group":
            TutorGroupMeetings.objects.create(user=user, theme=theme, about=about, datetime=f"{date}T{time}:00",
                                              hours=hours, price=price, max_students=max)
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class UpdateUserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        if 'first_name' in request.data:
            user.first_name = request.data['first_name']
        if 'last_name' in request.data:
            user.last_name = request.data['last_name']
        if 'years' in request.data:
            user.years_old = request.data['years']
        if 'about' in request.data:
            user.about = request.data['about']
        if 'google_drive_link' in request.data:
            user.google_drive_link = request.data['google_drive_link']
        if 'price' in request.data:
            try:
                item = CustomUserDetails.objects.get(user=user)
                item.price = request.data['price']
                item.save()
            except Exception:
                CustomUserDetails.objects.create(user=user, price=request.data['price'])
        user.save()
        return Response(UserSerializer(user).data, status=200)


class GetUserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_id = request.query_params.get('user_id')

        if user_id and user_id != "undefined":
            user = CustomUser.objects.get(id=user_id)

        try:
            user_details = CustomUserDetails.objects.get(user=user)
            price = user_details.price
        except Exception:
            price = 0

        if user.user_type == "tutor":
            meetings = [TutorMeetingSerializer(meet).data for meet in TutorMeetings.objects.filter(user=user)]
            for meet in meetings:
                meet['datetime'] = meet['datetime'].replace('T', " ")[:16]
            group_meetings = [GroupMeetingSerializer(meet).data for meet in TutorGroupMeetings.objects.filter(user=user)]
            for meet in group_meetings:
                meet['datetime'] = meet['datetime'].replace('T', " ")[:16]
        else:
            meetings = [StudentMeetingSerializer(meet).data | UserSerializer(meet.user).data for meet in StudentMeetings.objects.filter(user=user).select_related('user')]
            for meet in meetings:
                meeting = TutorMeetings.objects.get(id=meet['meet'])
                meet['datetime'] = str(meeting.datetime).replace('T', " ")[:16]
            group_meet_ids = StudentGroupMeetings.objects.filter(user=user).values_list('meet_id', flat=True)
            group_meetings = [GroupMeetingSerializer(meet).data | UserSerializer(meet.user).data for meet in TutorGroupMeetings.objects.filter(id__in=group_meet_ids).select_related('user')]
            for meet in group_meetings:
                meet['datetime'] = meet['datetime'].replace('T', " ")[:16]
        user_serialized = UserSerializer(user).data
        data = {
            **user_serialized,
            "meetings": meetings,
            "group_meetings": group_meetings,
            "price": price,
        }
        if user.user_type == "tutor":
            data['comments'] = generate_comment()
        return Response(data, status=200)


class AddStudentToTutorMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        meet_id = request.data.get('meet_id')
        hours = request.data.get('hours')
        comment = request.data.get('comment')
        record = StudentMeetings.objects.filter(user=user, meet_id=meet_id)
        if len(record) > 0:
            return Response({"status": "it was already created"}, status=status.HTTP_201_CREATED)
        StudentMeetings.objects.create(user=user, meet_id=meet_id, hours=hours, comment=comment)
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class GetTutorMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        tutor_id = request.data.get('tutor_id')
        connected_meets = StudentMeetings.objects.filter(user=user).values_list('meet_id', flat=True)
        meetings = TutorMeetings.objects.filter(user_id=tutor_id).exclude(id__in=connected_meets)
        tutor_data = CustomUser.objects.get(id=tutor_id)
        return Response({"meetings": [TutorMeetingSerializer(meet).data for meet in meetings], "tutor": UserSerializer(tutor_data).data}, status=200)


class AddStudentToGroupMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        meet_id = request.data.get('meet_id')
        record = StudentGroupMeetings.objects.filter(user=user, meet_id=meet_id)
        if len(record) > 0:
            return Response({"status": "it was already created"}, status=status.HTTP_201_CREATED)
        StudentGroupMeetings.objects.create(user=user, meet_id=meet_id)
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class GetGroupMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        connected_meets = StudentGroupMeetings.objects.filter(user=user).values_list('meet_id', flat=True)
        meetings = TutorGroupMeetings.objects.exclude(id__in=connected_meets)
        data = []
        for meet in meetings:
            meet_data = GroupMeetingSerializer(meet).data
            meet_data['busy_amount'] = len(StudentGroupMeetings.objects.filter(meet=meet)) or 0
            meet_data['tutor'] = UserSerializer(meet.user).data
            meet_data['datetime'] = str(meet_data['datetime'])[:16].replace('T', ' ')
            data.append(meet_data)
        return Response(data, status=200)


class GetTutorsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = CustomUser.objects.filter(user_type='tutor')
        data = []
        for user in users:
            user_data = UserSerializer(user).data
            try:
                details = CustomUserDetails.objects.get(user_id=user.id)
            except Exception:
                continue
            user_data['price'] = details.price
            data.append(user_data)
        return Response(data, status=200)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        password = request.data.get('password')
        user_type = request.data.get('user_type')
        experience = request.data.get('experience')
        if experience:
            experience = int(experience)

        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(username=username, first_name=first_name, last_name=last_name,
                                              email=email, password=password, user_type=user_type,
                                              experience=experience)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class VerifyEndpointView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "JWT is valid and active!"}, status=200)
