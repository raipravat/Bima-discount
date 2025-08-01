export function fetchBlogPosts() {
  // Configuration
  const BLOG_URL = 'https://blog.prabhat.info.np';
  const POSTS_TO_SHOW = 3;
  const EXCERPT_LENGTH = 120;
  
  try {
    const callbackName = 'handleBloggerResponse' + Date.now();
    window[callbackName] = function(data) {
      displayPosts(data.feed.entry);
      delete window[callbackName];
    };
    
    const script = document.createElement('script');
    script.src = `${BLOG_URL}/feeds/posts/default?alt=json-in-script&callback=${callbackName}`;
    script.onerror = () => {
      document.getElementById('blog-posts').innerHTML = `
        <div class="error" style="text-align:center; padding:40px; color:#e74c3c;">
          Could not load blog posts. 
          <a href="${BLOG_URL}" style="color:#3498db;">Visit blog directly</a>
        </div>`;
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  
  function displayPosts(posts) {
    const container = document.getElementById('blog-posts');
    
    if (!posts || posts.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:40px;">No posts found.</div>';
      return;
    }
    
    let html = '';
    posts.slice(0, POSTS_TO_SHOW).forEach(post => {
      const title = post.title.$t;
      const fullContent = post.content.$t;
      const excerpt = stripHtml(fullContent).substring(0, EXCERPT_LENGTH) + '...';
      const url = post.link.find(link => link.rel === 'alternate').href;
      const date = new Date(post.published.$t).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
      
      const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : 'images/blog-placeholder.jpg';
      
      html += `
        <div class="blog-card">
          <div class="blog-image">
            <img src="${imageUrl}" alt="${title}" loading="lazy">
          </div>
          <div class="blog-content">
            <h3>${title}</h3>
            <p class="post-excerpt">${excerpt}</p>
            <div class="blog-footer">
              <div class="blog-meta">
                <span><i class="far fa-calendar-alt"></i> ${date}</span>
              </div>
              <a href="${url}" class="blog-link" target="_blank" rel="noopener">
                Read More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }
  
  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}