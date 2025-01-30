from django.db import migrations


def seed_books_and_booklists(apps, schema_editor):
    # Get models dynamically to avoid direct import issues
    Book = apps.get_model('books', 'Book')
    BookList = apps.get_model('books', 'BookList')

    # Seed books
    books = [
        {"title": "Dune", "year": 1965, "author": "Frank Herbert"},
        {"title": "Ender's Game", "year": 1985, "author": "Orson Scott Card"},
        {"title": "1984", "year": 1949, "author": "George Orwell"},
        {"title": "Fahrenheit 451", "year": 1953, "author": "Ray Bradbury"},
        {"title": "Brave New World", "year": 1932, "author": "Aldous Huxley"},
    ]

    book_instances = []
    for book in books:
        book_instances.append(Book(title=book["title"], year=book["year"], author=book["author"]))

    # Bulk create books
    Book.objects.bulk_create(book_instances)

    # Seed book lists
    book_lists = [
        {"name": "Science Fiction Classics"},
        {"name": "Dystopian Novels"},
    ]

    booklist_instances = []
    for booklist in book_lists:
        booklist_instances.append(BookList(name=booklist["name"]))

    # Save book lists
    BookList.objects.bulk_create(booklist_instances)

    # Add books to book lists
    scifi_books = Book.objects.filter(title__in=["Dune", "Ender's Game"])
    dystopian_books = Book.objects.filter(title__in=["1984", "Fahrenheit 451", "Brave New World"])

    # Assign books to book lists
    sci_fi_list = BookList.objects.get(name="Science Fiction Classics")
    sci_fi_list.books.set(scifi_books)

    dystopian_list = BookList.objects.get(name="Dystopian Novels")
    dystopian_list.books.set(dystopian_books)


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),  # Replace with the name of the migration file for your models
    ]

    operations = [
        migrations.RunPython(seed_books_and_booklists),
    ]
