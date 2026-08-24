from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Agent, Contact, Listing


class ApiAccessTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser("admin", "admin@example.com", "safe-password-123")
        self.token = Token.objects.create(user=self.admin)
        self.listing = Listing.objects.create(
            category="house", name="Test home", description="A test property",
            price="1000000", location="Bhubaneswar", area="1000 sq ft",
        )
        self.agent = Agent.objects.create(
            name="Test agent", email="agent@example.com", phone="9999999999", address="Office",
        )

    def test_public_catalogue_and_agent_inquiry_work(self):
        self.assertEqual(self.client.get("/listings/").status_code, 200)
        response = self.client.post("/inquiries/", {
            "agent_name": self.agent.name,
            "name": "Prospect",
            "email": "prospect@example.com",
            "phone": "8888888888",
            "message": "Please contact me.",
        }, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Contact.objects.filter(email="prospect@example.com").exists())

    def test_admin_writes_require_an_admin_token(self):
        payload = {
            "category": "house", "name": "New home", "description": "Description",
            "price": 2000000, "location": "Cuttack", "area": "900 sq ft",
        }
        self.assertEqual(self.client.post("/listings/create/", payload, format="json").status_code, 401)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        self.assertEqual(self.client.post("/listings/create/", payload, format="json").status_code, 201)

# Create your tests here.
