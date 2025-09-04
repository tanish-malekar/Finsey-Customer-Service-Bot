from django.db import models
from django.utils import timezone
import uuid

class WebsiteProject(models.Model):
    """Model to store website crawling projects"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    pinecone_index_name = models.CharField(max_length=100, unique=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('crawling', 'Crawling'),
            ('indexing', 'Indexing'),
            ('completed', 'Completed'),
            ('failed', 'Failed')
        ],
        default='pending'
    )
    pages_crawled = models.IntegerField(default=0)
    vectors_created = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    error_message = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.url})"
    
    def get_pinecone_index_name(self):
        """Generate a unique Pinecone index name for this project"""
        if not self.pinecone_index_name:
            # Create a shorter unique index name (max 45 chars for Pinecone)
            # Use first 8 chars of UUID + timestamp suffix
            short_id = str(self.id)[:8]
            timestamp = int(timezone.now().timestamp()) % 1000000  # Last 6 digits
            self.pinecone_index_name = f"web-{short_id}-{timestamp}"
            self.save()
        return self.pinecone_index_name

class CrawledPage(models.Model):
    """Model to store individual crawled pages"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(WebsiteProject, on_delete=models.CASCADE, related_name='pages')
    url = models.URLField(max_length=500)
    title = models.CharField(max_length=500, blank=True, null=True)
    content = models.TextField()
    word_count = models.IntegerField(default=0)
    crawled_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-crawled_at']
        unique_together = ['project', 'url']
    
    def __str__(self):
        return f"{self.url} - {self.project.name}"
