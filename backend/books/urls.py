from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.book_list_view, name='book-list'),
    path('booklists/', views.booklist_view, name='booklist-list'),
    path('booklists/<int:pk>/', views.booklist_delete_view, name='booklist-delete'),
    path('booklists/<int:pk>/', views.booklist_update_view, name='booklist-update'),
    path('books/<int:pk>/', views.book_delete_view, name='book-delete'),
]
