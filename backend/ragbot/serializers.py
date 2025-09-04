from rest_framework import serializers
from .models import WebsiteProject, CrawledPage

class CrawledPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrawledPage
        fields = ['id', 'url', 'title', 'word_count', 'crawled_at']

class WebsiteProjectSerializer(serializers.ModelSerializer):
    pages = CrawledPageSerializer(many=True, read_only=True)
    
    class Meta:
        model = WebsiteProject
        fields = [
            'id', 'name', 'url', 'pinecone_index_name', 'status', 
            'pages_crawled', 'vectors_created', 'created_at', 
            'updated_at', 'error_message', 'pages'
        ]
        read_only_fields = [
            'id', 'pinecone_index_name', 'status', 'pages_crawled', 
            'vectors_created', 'created_at', 'updated_at', 'error_message', 'pages'
        ]

class CreateWebsiteProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteProject
        fields = ['name', 'url']
    
    def validate_url(self, value):
        """Validate that the URL is accessible"""
        import requests
        from urllib.parse import urlparse
        
        # First, validate URL format
        try:
            parsed = urlparse(value)
            if not parsed.scheme or not parsed.netloc:
                raise serializers.ValidationError("Invalid URL format")
        except Exception:
            raise serializers.ValidationError("Invalid URL format")
        
        # Try to access the URL with different methods
        try:
            # Try GET request first (more reliable than HEAD)
            headers = {
                'User-Agent': 'Mozilla/5.0 (compatible; WebsiteCrawler/1.0)'
            }
            response = requests.get(value, timeout=10, headers=headers, allow_redirects=True)
            
            # Accept any 2xx or 3xx status code
            if response.status_code >= 400:
                raise serializers.ValidationError(f"URL returned status code {response.status_code}")
                
        except requests.exceptions.Timeout:
            raise serializers.ValidationError("URL request timed out")
        except requests.exceptions.ConnectionError:
            raise serializers.ValidationError("Could not connect to URL")
        except requests.exceptions.RequestException as e:
            raise serializers.ValidationError(f"Could not access URL: {str(e)}")
        except Exception as e:
            raise serializers.ValidationError(f"URL validation error: {str(e)}")
        
        return value

class ChatRequestSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=1000)
    project_id = serializers.UUIDField()
