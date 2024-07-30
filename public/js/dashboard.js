//this file handles CRUD operations logic for the dashboard that enables user interaction absent in homepage / view only mode

document.addEventListener("DOMContentLoaded", () => {
  // Handle post creation
  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("post-title").value;
      const content = document.getElementById("post-content").value;

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          window.location.href = "./dashboard";
        } else {
          throw new Error("Unable to create post");
        }
      } catch (error) {
        console.error("Error creating post", error);
        document.getElementById("error-message").innerText =
          "Network error. Please try again later.";
      }
    });
  }

  // Handle clicks for editing and deleting posts
  document.addEventListener("click", async (event) => {
    if (event.target.matches(".edit-post-btn")) {
      const button = event.target;
      const postId = button.dataset.id;

      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post details");

        const postData = await response.json();
        document.getElementById("edit-post-id").value = postId;
        document.getElementById("edit-post-title").value = postData.title;
        document.getElementById("edit-post-content").value = postData.content;

        $("#editPostModal").modal("show");
      } catch (error) {
        console.error("Error fetching post details:", error);
        document.getElementById("error-message").innerText =
          "Network error. Please try again later.";
      }
    } else if (event.target.matches(".delete-post-btn")) {
      const postId = event.target.dataset.id;
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          window.location.href = "./dashboard";
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        document.getElementById("error-message").innerText =
          "Unable to delete post. Please try again.";
      }
    }
  });

  // Handle edit post form submission
  const editPostForm = document.getElementById("edit-post-form");
  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const postId = document.getElementById("edit-post-id").value;
      const updatedTitle = document.getElementById("edit-post-title").value;
      const updatedContent = document.getElementById("edit-post-content").value;

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
          }),
        });

        if (!response.ok) throw new Error("Failed to update post");

        $("#editPostModal").modal("hide");
        window.location.href = "./dashboard";
      } catch (error) {
        console.error("Error updating post:", error);
        document.getElementById("error-message").innerText =
          "Network error. Please try again later.";
      }
    });
  }
});
