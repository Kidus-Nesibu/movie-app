from django.conf import settings
from django.db import models


class WatchlistItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="watchlist_items",
    )
    movie_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie_id"],
                name="unique_user_movie",
            ),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - Movie {self.movie_id}"