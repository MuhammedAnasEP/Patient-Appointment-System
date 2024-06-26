from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Q

class RegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    class Meta:

        model = User
        fields = ("first_name","last_name","username", "email", "password", "password2")
        extra_kwargs = {
            "password" : {"write_only": True},
            "password2" : {"write_only": True}
        }


    def save(self):
        email=self.validated_data["email"],
        username=self.validated_data["username"],

        if User.objects.filter(Q(username=username) | Q(email=email)):
            raise serializers.ValidationError({"error":"username or email already exist"})
        
        user = User(
            email=email,
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            username=username,
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError(
                {"error": "Passwords do not match!"})

        user.set_password(password)
        user.save()

        return user

    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)
    
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")




# {
#     "first_name":"anas",
#     "last_name":"ep",
#     "username":"anas",
#     "email":"anas@gmail.com",
#     "password":"anas",
#     "password2":"anas"

# }