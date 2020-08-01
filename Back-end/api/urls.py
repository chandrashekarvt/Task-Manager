from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TaskViewSet, Logout
#  tasks_completed, tasks_inProgress, tasks_new

router = routers.DefaultRouter()
router.register('tasks',TaskViewSet )
router.register('users', UserViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('logout/', Logout.as_view()),

]
urlpatterns += [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
# urlpatterns += [
#     path('api-auth/', include('rest_framework.urls')),
# ]