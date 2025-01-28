# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book, BookList
from .serializers import BookSerializer, BookListSerializer


@api_view(["GET", "POST"])
def book_list_view(request):
    if request.method == "GET":
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def booklist_view(request):
    if request.method == "GET":
        booklists = BookList.objects.all()
        serializer = BookListSerializer(booklists, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = BookListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def booklist_delete_view(request, pk):
    try:
        booklist = BookList.objects.get(pk=pk)
    except BookList.DoesNotExist:
        return Response(
            {"error": "BookList not found"}, status=status.HTTP_404_NOT_FOUND
        )

    booklist.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def booklist_remove_books_view(request, pk):
    """
    Remove specific books from a booklist using query parameters.
    Example: /api/booklists/1/remove/?book_ids=1,3
    """
    try:
        booklist = BookList.objects.get(pk=pk)
    except BookList.DoesNotExist:
        return Response(
            {"error": "BookList not found"}, status=status.HTTP_404_NOT_FOUND
        )

    book_ids = request.query_params.get("book_ids", "")
    if not book_ids:
        return Response(
            {"error": "No book IDs provided in query parameters."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    book_ids = [int(id) for id in book_ids.split(",") if id.isdigit()]

    for book_id in book_ids:
        try:
            book = Book.objects.get(pk=book_id)
            booklist.books.remove(book)
        except Book.DoesNotExist:
            return Response(
                {"error": f"Book with ID {book_id} not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

    booklist.save()
    serializer = BookListSerializer(booklist)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def book_delete_view(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
