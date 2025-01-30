from django.db import migrations, models

# Function to seed initial data
def seed_books_and_lists(apps, schema_editor):
    Book = apps.get_model('books', 'Book')
    BookList = apps.get_model('books', 'BookList')

    # Creating Books
    dune = Book.objects.create(title="Dune", year=1965, author="Frank Herbert")
    enders_game = Book.objects.create(title="Ender's Game", year=1985, author="Orson Scott Card")
    book_1984 = Book.objects.create(title="1984", year=1949, author="George Orwell")
    fahrenheit = Book.objects.create(title="Fahrenheit 451", year=1953, author="Ray Bradbury")
    brave_new_world = Book.objects.create(title="Brave New World", year=1932, author="Aldous Huxley")

    # Creating Book Lists and Adding Books
    scifi_classics = BookList.objects.create(name="Science Fiction Classics")
    scifi_classics.books.add(dune, enders_game, book_1984)

    dystopian_fiction = BookList.objects.create(name="Dystopian Fiction")
    dystopian_fiction.books.add(book_1984, fahrenheit, brave_new_world)

# Migration Class
class Migration(migrations.Migration):
    dependencies = [
        ('books', '0001_initial'),  # Make sure this is the correct previous migration
    ]

    operations = [
        migrations.RunPython(seed_books_and_lists),
    ]
