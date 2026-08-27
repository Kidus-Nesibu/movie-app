from django.urls import path

from .views import WatchlistDeleteView, WatchlistListCreateView


urlpatterns = [
    path("", WatchlistListCreateView.as_view(), name="watchlist"),
    path(
        "<int:pk>/",
        WatchlistDeleteView.as_view(),
        name="watchlist-delete",
    ),
]