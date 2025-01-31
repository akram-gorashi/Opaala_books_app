from django.urls import path, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from .views import (
    book_list_view,
    booklist_view,
    booklist_delete_view,
    booklist_remove_books_view,
    book_delete_view,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Book API",
        default_version="v1",
        description="API documentation for the Book App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="akramgorashi6@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path("books/", book_list_view, name="books_list"),
    path("books/<int:pk>/", book_delete_view, name="books_delete"),
    path("booklists/", booklist_view, name="booklists_list"),
    path("booklists/<int:pk>/", booklist_delete_view, name="booklists_delete"),
    path(
        "booklists/<int:pk>/remove/",
        booklist_remove_books_view,
        name="booklists_remove",
    ),
]
