from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Book, BookList
from .serializers import BookSerializer, BookListSerializer


@swagger_auto_schema(
    method="get",
    operation_description="Retrieve a list of all books in the system.",
    responses={200: BookSerializer(many=True)},
)
@swagger_auto_schema(
    method="post",
    operation_description="Create a new book with a title, author, and year.",
    request_body=BookSerializer,
    responses={201: BookSerializer, 400: "Bad Request"},
)
@api_view(["GET", "POST"])
def book_list_view(request):
    """
    Handles GET (list all books) and POST (create a book).
    """
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


@swagger_auto_schema(
    method="delete",
    operation_description="Delete a book by ID.",
    manual_parameters=[
        openapi.Parameter(
            "id", openapi.IN_PATH, description="Book ID", type=openapi.TYPE_INTEGER
        )
    ],
    responses={204: "No Content", 404: "Book Not Found"},
)
@api_view(["DELETE"])
def book_delete_view(request, pk):
    """
    Deletes a book from the database by its ID.
    """
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    method="get",
    operation_description="Retrieve all book lists.",
    responses={200: BookListSerializer(many=True)},
)
@swagger_auto_schema(
    method="post",
    operation_description="Create a new book list with a name and list of book IDs.",
    request_body=BookListSerializer,
    responses={201: BookListSerializer, 400: "Bad Request"},
)
@api_view(["GET", "POST"])
def booklist_view(request):
    """
    Handles GET (list all book lists) and POST (create a book list).
    """
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


@swagger_auto_schema(
    method="delete",
    operation_description="Delete a book list by ID.",
    manual_parameters=[
        openapi.Parameter(
            "id", openapi.IN_PATH, description="Book List ID", type=openapi.TYPE_INTEGER
        )
    ],
    responses={204: "No Content", 404: "BookList Not Found"},
)
@api_view(["DELETE"])
def booklist_delete_view(request, pk):
    """
    Deletes a book list by its ID.
    """
    try:
        booklist = BookList.objects.get(pk=pk)
    except BookList.DoesNotExist:
        return Response(
            {"error": "BookList not found"}, status=status.HTTP_404_NOT_FOUND
        )

    booklist.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    method="delete",
    operation_description="Remove specific books from a book list using query parameters.",
    manual_parameters=[
        openapi.Parameter(
            "book_ids",
            openapi.IN_QUERY,
            description="Comma-separated list of book IDs to remove",
            type=openapi.TYPE_STRING,
        )
    ],
    responses={
        200: BookListSerializer,
        400: "Bad Request",
        404: "Book or BookList Not Found",
    },
)
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
