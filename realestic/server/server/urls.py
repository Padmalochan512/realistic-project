from django.contrib import admin
from django.http import JsonResponse
from django.urls import path
from api import views


def home(request):
    return JsonResponse({
        "message": "ATS Score API is running",
        "status": "success"
    })


urlpatterns = [
    # Homepage / server health check
    path("", home, name="home"),

    # Authentication
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),

    # Contact APIs
    path("contacts/", views.get_contacts, name="get_contacts"),
    path("contacts/create/", views.create_contact, name="create_contact"),
    path("contacts/<int:pk>/", views.get_contact, name="get_contact"),
    path("contacts/<int:pk>/update/", views.update_contact, name="update_contact"),
    path("contacts/<int:pk>/delete/", views.delete_contact, name="delete_contact"),

    # Listing APIs
    path("listings/", views.get_listings, name="get_listings"),
    path("listings/create/", views.create_listing, name="create_listing"),
    path("listings/<int:pk>/", views.get_listing, name="get_listing"),
    path("listings/<int:pk>/update/", views.update_listing, name="update_listing"),
    path("listings/<int:pk>/delete/", views.delete_listing, name="delete_listing"),

    # Gallery APIs
    path("gallery/", views.get_gallery, name="get_gallery"),
    path("gallery/create/", views.create_gallery, name="create_gallery"),
    path("gallery/<int:pk>/", views.get_gallery_image, name="get_gallery_image"),
    path("gallery/<int:pk>/update/", views.update_gallery, name="update_gallery"),
    path("gallery/<int:pk>/delete/", views.delete_gallery, name="delete_gallery"),

    # Agent APIs
    path("agents/", views.agent_list, name="agent_list"),
    path("agents/<int:pk>/", views.agent_detail, name="agent_detail"),

    # Public contact form on an agent profile
    path("inquiries/", views.create_inquiry, name="create_inquiry"),

    # Django Admin
    path("admin/", admin.site.urls),
]
