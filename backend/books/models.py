from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    author = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class BookList(models.Model):
    name = models.CharField(max_length=255)
    books = models.ManyToManyField(Book, related_name='lists')

    def __str__(self):
        return self.name
