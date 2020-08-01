from rest_framework import serializers
from .models import Tasks
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class TaskSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source = 'owner.username')
    class Meta:
        model = Tasks
        fields = ['id','task_content','status','label','date_added','due_date','owner']
        extra_kwargs = {'date_added':{'read_only':True, 'required':True}}



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

