# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book, BookList
from .serializers import BookSerializer, BookListSerializer


@api_view(['GET', 'POST'])
def book_list_view(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def booklist_view(request):
    if request.method == 'GET':
        booklists = BookList.objects.all()
        serializer = BookListSerializer(booklists, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def booklist_delete_view(request, pk):
    try:
        booklist = BookList.objects.get(pk=pk)
    except BookList.DoesNotExist:
        return Response({'error': 'BookList not found'}, status=status.HTTP_404_NOT_FOUND)

    booklist.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['DELETE'])
def book_delete_view(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

