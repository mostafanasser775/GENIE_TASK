
from django.contrib import admin
from django.urls import path,include
urlpatterns = [
    path('admin/', admin.site.urls),
     path("api/",include("api.urls")),
    # path('api/',include("./api/urls.py")), # Include the URLs from the app
]
