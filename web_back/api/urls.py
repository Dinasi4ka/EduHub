from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, VerifyEndpointView, CustomTokenObtainPairView, GetTutorsView, GetUserDetails, \
    GetGroupMeetingView, AddStudentToGroupMeetingView, GetTutorMeetingView, AddStudentToTutorMeetingView, \
    UpdateUserDetails, CreateMeetingView

urlpatterns = [
    path('create-meet/', CreateMeetingView.as_view(), name='create-meet'),
    path('join-tutor-meetings/', AddStudentToTutorMeetingView.as_view(), name='join-tutor-meetings'),
    path('get-tutor-meetings/', GetTutorMeetingView.as_view(), name='get-tutor-meetings'),
    path('join-group-meetings/', AddStudentToGroupMeetingView.as_view(), name='join-group-meetings'),
    path('get-group-meetings/', GetGroupMeetingView.as_view(), name='get-group-meetings'),
    path('update-user/', UpdateUserDetails.as_view(), name='update-user'),
    path('user/', GetUserDetails.as_view(), name='user'),
    path('get-tutors/', GetTutorsView.as_view(), name='get-tutors'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify', VerifyEndpointView.as_view(), name='verify'),
]
