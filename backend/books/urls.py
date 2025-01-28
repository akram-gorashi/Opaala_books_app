from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.book_list_view, name='book-list'),
    path('booklists/', views.booklist_view, name='booklist-list'),
]
