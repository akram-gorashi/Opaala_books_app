from rest_framework import serializers
from .models import Book, BookList

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class BookListSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True)
    book_ids = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), write_only=True, many=True, source='books')

    class Meta:
        model = BookList
        fields = ['id', 'name', 'books', 'book_ids']
