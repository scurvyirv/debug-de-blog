//handles front end post logic

//CREATE post
// document.addEventListener("DOMContentLoaded", () => {
//   if (document.querySelector("#create-post-form")) {
//     document
//       .querySelector("#create-post-form")
//       .addEventListener("submit", async (event) => {
//         event.preventDefault();

//         const title = document.querySelector("#post-title").value.trim();
//         const content = document.querySelector("#post-content").value.trim();

//         if (title && content) {
//           const response = await fetch("/api/posts", {
//             method: "POST",
//             body: JSON.stringify({ title, content }),
//             headers: { "Content-Type": "application/json" },
//           });

//           if (response.ok) {
//             document.location.replace("/dashboard");
//           } else {
//             alert("Failed to create post");
//           }
//         }
//       });
//   }

//   //DELETE post by ID
//   document.querySelectorAll(".delete-post-btn").forEach((button) => {
//     button.addEventListener("click", async (event) => {
//       const postId = event.target.getAttribute("data-id");

//       const response = await fetch(`/api/posts/${postId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         document.location.replace("/dashboard");
//       } else {
//         alert("Failed to delete post");
//       }
//     });
//   });

//   //EDIT post by ID
//   document.querySelectorAll(".edit-post-btn").forEach((button) => {
//     button.addEventListener("click", async (event) => {
//       const postId = event.target.getAttribute("data-id");
//       //   const title = prompt("Enter new title:");
//       //   const title = event.target.getElementById("edit-post-id").value =
//       //   const content = prompt("Enter new content:");

//       if (title && content) {
//         const response = await fetch(`/api/posts/${postId}`, {
//           method: "PUT",
//           body: JSON.stringify({ title, content }),
//           headers: { "Content-Type": "application/json" },
//         });

//         if (response.ok) {
//           document.location.replace("/dashboard");
//         } else {
//           alert("Failed to update post");
//         }
//       }
//     });
//   });
// });
