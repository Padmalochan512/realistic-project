from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import RegisterSerializer,ContactSerializer,ListingSerializer, GallerySerializer,AgentSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from api.models import Contact,Listing,Gallery, Agent


# Create your views here.
@api_view(['POST'])
def register(request):
    
    serData = RegisterSerializer(data=request.data)
    
    if(serData.is_valid()):
        serData.save()
        
        return Response({
            "message":"Regsiter Successfully",
            "user":serData.data
        })
        
    return Response(serData.errors)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(
        username=username,
        password=password
    )
    
    if user:
       
       token, created = Token.objects.get_or_create(user=user) 
       
       return Response({
           "token":token.key,
           "username":user.username,
           "is_superuser": user.is_superuser
       })
    
    return Response({
        "message":"Invalid Cred"
    })
   
@api_view(["POST"])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Contact submitted successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

@api_view(["GET"])
def get_contacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)

    return Response(
        {
            "success": True,
            "count": contacts.count(),
            "data": serializer.data,
        }
    )
    
@api_view(["GET"])
def get_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ContactSerializer(contact)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        }
    )
    
@api_view(["PUT"])
def update_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ContactSerializer(contact, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Contact updated successfully.",
                "data": serializer.data,
            }
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


@api_view(["DELETE"])
def delete_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    contact.delete()

    return Response(
        {
            "success": True,
            "message": "Contact deleted successfully.",
        }
    ) 

# Create Listing
@api_view(["POST"])
def create_listing(request):
    serializer = ListingSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Listing created successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get All Listings
@api_view(["GET"])
def get_listings(request):
    listings = Listing.objects.all()

    serializer = ListingSerializer(listings, many=True)

    return Response(
        {
            "success": True,
            "count": listings.count(),
            "data": serializer.data,
        }
    )


# Get Single Listing
@api_view(["GET"])
def get_listing(request, pk):
    try:
        listing = Listing.objects.get(id=pk)
    except Listing.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Listing not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ListingSerializer(listing)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        }
    )


# Update Listing
@api_view(["PUT"])
def update_listing(request, pk):
    try:
        listing = Listing.objects.get(id=pk)
    except Listing.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Listing not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ListingSerializer(
        listing,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Listing updated successfully.",
                "data": serializer.data,
            }
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Listing
@api_view(["DELETE"])
def delete_listing(request, pk):
    try:
        listing = Listing.objects.get(id=pk)
    except Listing.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Listing not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    listing.delete()

    return Response(
        {
            "success": True,
            "message": "Listing deleted successfully."
        }
    )
    
# Create Image
@api_view(["POST"])
def create_gallery(request):
    serializer = GallerySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Image added successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get All Images
@api_view(["GET"])
def get_gallery(request):
    images = Gallery.objects.all()

    serializer = GallerySerializer(images, many=True)

    return Response(
        {
            "success": True,
            "count": images.count(),
            "data": serializer.data,
        }
    )


# Get Single Image
@api_view(["GET"])
def get_gallery_image(request, pk):
    try:
        image = Gallery.objects.get(id=pk)
    except Gallery.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Image not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = GallerySerializer(image)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        }
    )


# Update Image
@api_view(["PUT"])
def update_gallery(request, pk):
    try:
        image = Gallery.objects.get(id=pk)
    except Gallery.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Image not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = GallerySerializer(
        image,
        data=request.data,
        partial=True,
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Image updated successfully.",
                "data": serializer.data,
            }
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Image
@api_view(["DELETE"])
def delete_gallery(request, pk):
    try:
        image = Gallery.objects.get(id=pk)
    except Gallery.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Image not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    image.delete()

    return Response(
        {
            "success": True,
            "message": "Image deleted successfully."
        }
    )    
    

@api_view(["GET", "POST"])
def agent_list(request):
    if request.method == "GET":
        agents = Agent.objects.all().order_by("-id")
        serializer = AgentSerializer(agents, many=True)
        return Response(serializer.data)

    serializer = AgentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def agent_detail(request, pk):
    try:
        agent = Agent.objects.get(pk=pk)
    except Agent.DoesNotExist:
        return Response(
            {"error": "Agent not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = AgentSerializer(agent)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = AgentSerializer(agent, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    agent.delete()
    return Response(
        {"message": "Agent deleted successfully"},
        status=status.HTTP_204_NO_CONTENT
    )    