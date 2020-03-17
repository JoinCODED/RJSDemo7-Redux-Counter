import React from "react";

const Posts = props => {
  const posts = props.posts;

  if (!posts || !posts.length)
    return (
      <button
        className="btn btn-lg btn-outline-light mx-auto my-4"
        onClick={() => alert("FINISH ME")}
      >
        Fetch Posts
      </button>
    );

  return (
    <table class="table table-dark mx-auto my-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr>
            <th scope="row">1</th>
            <td>{post.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Posts;
