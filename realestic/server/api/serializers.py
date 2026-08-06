
from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Contact,Listing,Gallery,Agent

class RegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password'
        ]       
        
        extra_kward = {
            'password' : {'write_only':True},
        }
        
    def  create(self, validate_data):
        
        user = User.objects.create_user(
            username = validate_data['username'],
            email=validate_data['email'],
            password=validate_data['password'],
        )
        
        return user 
  
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"  
        
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"        

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = "__all__"        

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = "__all__"        