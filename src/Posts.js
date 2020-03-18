import React from "react";
import { connect } from "react-redux";

// Action Creators
import { fetchPosts } from "./redux/actionCreators";

const Posts = props => {
  const posts = props.posts;

  if (!posts || !posts.length)
    return (
      <button
        className="btn btn-lg btn-outline-light mx-auto my-4"
        onClick={props.fetchPosts}
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
            <th scope="row">{post.id}</th>
            <td>{post.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
