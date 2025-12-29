// Simple markdown parser for basic formatting
export function parseMarkdown(markdown) {
    return markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Lists
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        // Wrap consecutive list items in ul
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        // Clean up nested ul tags
        .replace(/<\/ul>\s*<ul>/g, '')
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        // Wrap in paragraphs
        .replace(/^(?!<[h|u|b|p|d|c|s])(.*$)/gim, '<p>$1</p>')
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, '')
        // Clean up paragraphs inside other elements
        .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1')
        .replace(/<p>(<ul>.*<\/ul>)<\/p>/g, '$1')
        .replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/g, '$1')
        .replace(/<p>(<pre>.*<\/pre>)<\/p>/g, '$1');
};

// Function to convert star rating to HTML
export function convertRatingToStars(rating) {
    // Handle undefined, null, or empty rating
    if (!rating || typeof rating !== 'string') {
        // Return 5 empty stars if no rating
        return '<span class="star empty">★</span>'.repeat(5);
    }
    
    const starCount = (rating.match(/★/g) || []).length;
    const halfStar = rating.includes('½');
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < starCount; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    // Add half star if present
    if (halfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Add empty stars to make it 5 total
    const totalStars = starCount + (halfStar ? 1 : 0);
    const emptyStars = 5 - totalStars;
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">★</span>';
    }
    
    return starsHTML;
};