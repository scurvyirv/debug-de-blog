//this file handles CRUD operations logic for the dashboard that enables user interaction absent in homepage / view only mode

//create a post
const createPost = async (title, content) => {
    try{
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Post created successfully', responseData)

            //redirect to dashboard with new post posted
            window.location.href = './dashboard';
        } else {
            console.error('Unable to create post', response.statusText)
            document.getElementById('error-message').innerText = 'Unable to create post. Please try again.'
        }
    } catch (error) {
        console.error('Error creating post', error);
        document.getElementById('error-message').innerText = 'Network error. Please try again later.'
    }
};

//event listener for creating a post
document.getElementById('create-post-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    createPost(title, content);
});

//edit a post by class and with event listener
document.addEventListener('click', async (event) => {
    if (event.target.matches('.edit-post')) {
        const button = event.target;
        const postId = button.dataset.postId;

        try {
            //fetch current post details from server
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post details');
            }

            const postData = await response.json();
            const postTitle = postData.title;
            const postContent = postData.content;

            //populate edit form fields with fetched data
            document.getElementById('edit-post-id').value = postId;
            document.getElementById('edit-post-title').value = postTitle;
            document.getElementById('edit-post-content').value = postContent;

            //render edit form
            document.getElementById('edit-post-form').style.display = 'block';
            //remove past error messages to avoid user interface confusion
            document.getElementById('error-message').innerText = '';
            
        } catch (error) {
            console.error('Error fetching post details:', error);
            document.getElementById('error-message').innerText = 'Network error. Please try again later.';
        }
    }
});

//handle edit post form submission
document.getElementById('edit-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const postId = document.getElementById('edit-post-id').value;
    const updatedTitle = document.getElementById('edit-post-title').value;
    const updatedContent = document.getElementById('edit-post-content').value;

    try {
        //make fetch request to update post
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }

        //redirect or update UI after successful update
        window.location.href = './dashboard';
    } catch (error) {
        console.error('Error updating post:', error);
        document.getElementById('error-message').innerText = 'Network error. Please try again later.';
    }
});

//cancel edit post
document.getElementById('cancel-edit-post').addEventListener('click', () => {
    //hide the edit form
    document.getElementById('edit-post-form').style.display = 'none';

    //reset form fields
    document.getElementById('edit-post-id').value = '';
    document.getElementById('edit-post-title').value = '';
    document.getElementById('edit-post-content').value = '';
    document.getElementById('error-message').innerText = ''; // Clear any error message
});


//delete a post by ID
const deletePost = async (postId) => {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            //redirect to dashboard with post removed
            window.location.href = './dashboard';
        } else {
            console.error('Failed to delete post', response.statusText);
            document.getElementById('error-message').innerText = 'Unable to delete post. Please try again.'
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        document.getElementById('error-message').innerText = 'Network error. Please try again later.'
    }
};

//event listener for delete buttons
document.querySelectorAll('.delete-post').forEach(button => {
    button.addEventListener('click', async (event) => {
        const postId = event.target.dataset.postId;
        await deletePost(postId);
    });
});