#!/usr/bin/env python3
"""
Script to fetch book and movie thumbnails from free APIs.
Downloads images and converts them to WebP format.
Updates JSON files with thumbnail paths.
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional, Tuple

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow library is required. Install it with: pip install Pillow")
    sys.exit(1)

# Configuration
BASE_DIR = Path(__file__).parent
print(BASE_DIR)
BOOKS_JSON = BASE_DIR / ".." / "data" / "books.json"
MOVIES_JSON = BASE_DIR / ".." / "data" / "movies.json"
BOOKS_IMG_DIR = BASE_DIR / ".." / "static" / "img" / "books"
MOVIES_IMG_DIR = BASE_DIR / ".." /  "static" / "img" / "movies"

# API Configuration
# For OMDb API, get a free API key from http://www.omdbapi.com/apikey.aspx
# Set it as an environment variable: export OMDB_API_KEY="your_key_here"
OMDB_API_KEY = os.environ.get("OMDB_API_KEY", "2fa27c2b")

# Rate limiting (seconds between requests)
REQUEST_DELAY = 0.5


def sanitize_filename(title: str) -> str:
    """Convert title to a safe filename."""
    # Remove year in parentheses if present
    title = re.sub(r'\s*\(\d{4}\)\s*$', '', title)
    # Replace invalid characters
    title = re.sub(r'[<>:"/\\|?*]', '_', title)
    # Replace spaces and multiple underscores
    title = re.sub(r'[\s_]+', '_', title)
    # Remove leading/trailing underscores
    title = title.strip('_')
    return title[:100]  # Limit length


def download_image(url: str, output_path: Path) -> bool:
    """Download an image from URL and convert to WebP."""
    try:
        # Download the image
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0 (compatible; ThumbnailFetcher/1.0)')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            image_data = response.read()
        
        # Save as temporary file
        temp_path = output_path.with_suffix('.temp')
        with open(temp_path, 'wb') as f:
            f.write(image_data)
        
        # Convert to WebP
        try:
            img = Image.open(temp_path)
            # Convert RGBA to RGB if necessary (for JPEG compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = rgb_img
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Save as WebP
            img.save(output_path, 'WEBP', quality=85, method=6)
            temp_path.unlink()  # Delete temp file
            return True
        except Exception as e:
            print(f"  Error converting to WebP: {e}")
            temp_path.unlink()
            return False
            
    except Exception as e:
        print(f"  Error downloading image: {e}")
        return False


def fetch_book_thumbnail(title: str, author: str) -> Optional[str]:
    """Fetch book thumbnail from Open Library API."""
    try:
        # Search for the book
        query = f"{title} {author}".strip()
        search_url = f"https://openlibrary.org/search.json?q={urllib.parse.quote(query)}&limit=1"
        
        req = urllib.request.Request(search_url)
        req.add_header('User-Agent', 'Mozilla/5.0 (compatible; ThumbnailFetcher/1.0)')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
        
        if data.get('numFound', 0) > 0 and data.get('docs'):
            book = data['docs'][0]
            # Try to get cover image
            cover_id = book.get('cover_i')
            if cover_id:
                cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
                filename = f"{sanitize_filename(title)}.webp"
                output_path = BOOKS_IMG_DIR / filename
                
                if download_image(cover_url, output_path):
                    return f"./img/books/{filename}"
        
        return None
    except Exception as e:
        print(f"  Error fetching book thumbnail: {e}")
        return None


def fetch_movie_thumbnail(title: str) -> Optional[str]:
    """Fetch movie thumbnail from OMDb API."""
    if not OMDB_API_KEY:
        print("  Warning: OMDB_API_KEY not set. Skipping movie thumbnail.")
        print("  Get a free API key from http://www.omdbapi.com/apikey.aspx")
        print("  Then set it: export OMDB_API_KEY='your_key_here'")
        return None
    
    try:
        # Extract year from title if present (e.g., "Movie Title (2024)")
        year_match = re.search(r'\((\d{4})\)', title)
        year = year_match.group(1) if year_match else None
        
        # Remove year from title for search
        clean_title = re.sub(r'\s*\(\d{4}\)\s*$', '', title).strip()
        
        # Build API URL
        params = {'t': clean_title, 'apikey': OMDB_API_KEY}
        if year:
            params['y'] = year
        
        api_url = f"http://www.omdbapi.com/?{urllib.parse.urlencode(params)}"
        
        req = urllib.request.Request(api_url)
        req.add_header('User-Agent', 'Mozilla/5.0 (compatible; ThumbnailFetcher/1.0)')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
        
        if data.get('Response') == 'True' and data.get('Poster') and data.get('Poster') != 'N/A':
            poster_url = data['Poster']
            filename = f"{sanitize_filename(title)}.webp"
            output_path = MOVIES_IMG_DIR / filename
            
            if download_image(poster_url, output_path):
                return f"./img/movies/{filename}"
        
        return None
    except Exception as e:
        print(f"  Error fetching movie thumbnail: {e}")
        return None


def process_books():
    """Process all books and fetch thumbnails."""
    print("Processing books...")
    
    with open(BOOKS_JSON, 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    updated = 0
    for i, book in enumerate(books):
        title = book.get('title', '')
        author = book.get('author', '')
        current_thumbnail = book.get('thumbnail', '')
        
        # Skip if thumbnail already exists
        if current_thumbnail and os.path.exists(BASE_DIR / current_thumbnail.lstrip('./')):
            print(f"[{i+1}/{len(books)}] Skipping '{title}' (thumbnail exists)")
            continue
        
        print(f"[{i+1}/{len(books)}] Fetching thumbnail for '{title}' by {author}...")
        
        thumbnail_path = fetch_book_thumbnail(title, author)
        if thumbnail_path:
            book['thumbnail'] = thumbnail_path
            updated += 1
            print(f"  ✓ Success: {thumbnail_path}")
        else:
            print(f"  ✗ Failed to fetch thumbnail")
        
        time.sleep(REQUEST_DELAY)
    
    # Save updated JSON
    with open(BOOKS_JSON, 'w', encoding='utf-8') as f:
        json.dump(books, f, indent=4, ensure_ascii=False)
    
    print(f"\nBooks: {updated} thumbnails fetched and saved.")


def process_movies():
    """Process all movies and fetch thumbnails."""
    print("\nProcessing movies...")
    
    with open(MOVIES_JSON, 'r', encoding='utf-8') as f:
        movies = json.load(f)
    
    updated = 0
    for i, movie in enumerate(movies):
        title = movie.get('title', '')
        current_thumbnail = movie.get('thumbnail', '')
        
        # Skip if thumbnail already exists
        if current_thumbnail and os.path.exists(BASE_DIR / current_thumbnail.lstrip('./')):
            print(f"[{i+1}/{len(movies)}] Skipping '{title}' (thumbnail exists)")
            continue
        
        print(f"[{i+1}/{len(movies)}] Fetching thumbnail for '{title}'...")
        
        thumbnail_path = fetch_movie_thumbnail(title)
        if thumbnail_path:
            movie['thumbnail'] = thumbnail_path
            updated += 1
            print(f"  ✓ Success: {thumbnail_path}")
        else:
            print(f"  ✗ Failed to fetch thumbnail")
        
        time.sleep(REQUEST_DELAY)
    
    # Save updated JSON
    with open(MOVIES_JSON, 'w', encoding='utf-8') as f:
        json.dump(movies, f, indent=4, ensure_ascii=False)
    
    print(f"\nMovies: {updated} thumbnails fetched and saved.")


def main():
    """Main function."""
    # Create directories if they don't exist
    BOOKS_IMG_DIR.mkdir(parents=True, exist_ok=True)
    MOVIES_IMG_DIR.mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("Thumbnail Fetcher")
    print("=" * 60)
    
    if not OMDB_API_KEY:
        print("\nNote: OMDB_API_KEY not set. Movie thumbnails will be skipped.")
        print("Get a free API key from: http://www.omdbapi.com/apikey.aspx")
        print("Then set it: export OMDB_API_KEY='your_key_here'\n")
    
    # Process books and movies
    process_books()
    process_movies()
    
    print("\n" + "=" * 60)
    print("Done!")
    print("=" * 60)


if __name__ == "__main__":
    main()

