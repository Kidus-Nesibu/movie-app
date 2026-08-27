from rest_framework import serializers

from .models import WatchlistItem


class WatchlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = ["id", "movie_id", "created_at"]
        read_only_fields = ["id", "created_at"]