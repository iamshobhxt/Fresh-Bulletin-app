document.addEventListener('DOMContentLoaded', function() {
            const bulletinForm = document.getElementById('bulletinForm');
            const bulletinFeed = document.getElementById('bulletinFeed');
            
            // Sample data (would normally come from a database)
            let bulletins = [
                {
                    id: 1,
                    author: 'Community',
                    message: 'Welcome to Fresh Bulletin! Share your thoughts and updates with everyone.',
                    timestamp: new Date().toISOString(),
                    likes: 0
                }
            ];
            
            // Render bulletins
            function renderBulletins() {
                if (bulletinFeed) {
                    if (bulletins.length === 0) {
                        bulletinFeed.innerHTML = '<div class="text-center py-10 text-gray-500">No bulletins yet. Be the first to share!</div>';
                        return;
                    }
                    
                    bulletinFeed.innerHTML = bulletins.map(bulletin => `
                        <div class="bulletin-card bg-white rounded-xl shadow-md overflow-hidden new-bulletin">
                            <div class="p-6">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-800">${bulletin.author}</h3>
                                        <p class="text-sm text-gray-500">${formatDate(bulletin.timestamp)}</p>
                                    </div>
                                    <button 
                                        onclick="deleteBulletin(${bulletin.id})"
                                        class="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <p class="text-gray-700 mb-4">${bulletin.message}</p>
                                
                                <div class="flex items-center">
                                    <button 
                                        onclick="likeBulletin(${bulletin.id})"
                                        class="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                        </svg>
                                        <span>${bulletin.likes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            }
            
            // Format date
            function formatDate(dateString) {
                const options = { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                return new Date(dateString).toLocaleDateString(undefined, options);
            }
            
            // Form submission
            bulletinForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const author = document.getElementById('author').value;
                const message = document.getElementById('message').value;
                
                if (author && message) {
                    const newBulletin = {
                        id: Date.now(), // Simple unique ID
                        author: author,
                        message: message,
                        timestamp: new Date().toISOString(),
                        likes: 0
                    };
                    
                    bulletins.unshift(newBulletin); // Add to beginning of array
                    renderBulletins();
                    
                    // Reset form
                    bulletinForm.reset();
                }
            });
            
            // Initially render bulletins
            renderBulletins();
        });
        
        // These need to be global for the inline event handlers
        function likeBulletin(id) {
            const bulletinIndex = bulletins.findIndex(b => b.id === id);
            if (bulletinIndex !== -1) {
                bulletins[bulletinIndex].likes += 1;
                renderBulletins();
            }
        }
        
        function deleteBulletin(id) {
            bulletins = bulletins.filter(b => b.id !== id);
            renderBulletins();
        }
        
        // Make bulletins array available globally for the functions above
        let bulletins = [];