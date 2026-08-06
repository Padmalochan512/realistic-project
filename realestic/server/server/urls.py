"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
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
    
    path("agents/", views.agent_list, name="agent_list"),
    path("agents/<int:pk>/", views.agent_detail, name="agent_detail"),

    # Django Admin
    path("admin/", admin.site.urls),
]
