# Book App Rest A pi
A REST api written in Django for Books Application

## Technologies used
* [Django](https://www.djangoproject.com/): The web framework for perfectionists with deadlines (Django builds better web apps with less code).
* [DRF](www.django-rest-framework.org/): A powerful and flexible toolkit for building Web APIs


## Installation
* If you wish to run your own build, first ensure you have python globally installed in your computer. If not, you can get python [here](https://www.python.org").
* After doing this, confirm that you have installed virtualenv globally as well. If not, run this:
    ```bash
        $ pip install virtualenv
    ```
* Then, Git clone this repo to your PC
    ```bash
        $ git clone https://github.com/akram-gorashi/Opaala_books_app.git
    ```

* #### Dependencies
    1. Cd into your the cloned repo as such:
        ```bash
            $ cd book_full_stack_app/backend
        ```
    2. Create and fire up your virtual environment:
        ```bash
            $ virtualenv  venv -p python3
            $ source venv/bin/activate
        ```
    3. Install the dependencies needed to run the app:
        ```bash
            $ pip install -r requirements.txt
        ```
    4. Make those migrations work
        ```bash
            $ python manage.py makemigrations
            $ python manage.py migrate
        ```
    5. You can just migrate seed data avialable in migrations folder in [SeedBooks]
    ('https://github.com/akram-gorashi/Opaala_books_app/blob/readme/backend/books/migrations/0003_seed_books.py') 
        ```bash
            $ python manage.py migrate
        ```

* #### Run It
   * Fire up the server using this one simple command:
    ```bash
        $ python manage.py runserver
    ```
   * You can now access the file api service on your browser by using
    ```
        http://127.0.0.1:8000/api/
    ```
  
* #### API Documentation
    This API follows RESTful conventions and is documented using Swagger.
    * #### Swagger Documentation
    * Interactive API Docs:
    ```bash
        http://127.0.0.1:8000/swagger/
    ```
    * ReDoc API Documentation (Alternative UI):
    ```bash
        http://127.0.0.1:8000/redoc/
    ```


# Book App (Angular Frontend)

A frontend web application built with Angular for managing books and book lists.

## Technologies used
* [Angular](https://angular.io/): A platform for building web applications using TypeScript.
SCSS – A modern styling language for better UI/UX.
* [RXJS](https://rxjs.dev/): Reactive programming for handling state and HTTP requests.
* Angular Signals – For optimized state management.
* [ESLint] For code linting and enforcing best practices.
* [ngMocks](https://ng-mocks.sudo.eu/) Testing library which helps with mocking services, components, directives, pipes and modules in tests for Angular applications. 

## Installation
* Cd into your the cloned repo as such:
    ```bash
        $ cd book_full_stack_app/frontend/book-app
    ```
* Install the dependencies using this command:
    ```bash
        $ npm install
    ```

* #### Run It
   * Fire up the server using this one simple command:
    ```bash
        $ ng serve
    ```
   * You can now access the UI  on your browser by using
    ```
        http://localhost:4200
    ```
* ####  Run unit tests
   * To run unit tests:
    ```bash
        $ ng test
    ```
   * To run tests with coverage report:
    ```
       ng test --code-coverage

    ```
   * After running, open the coverage report:
    ```
        open coverage/index.html
    ```