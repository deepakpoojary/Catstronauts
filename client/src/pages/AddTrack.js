import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_TRACK = gql`
  mutation AddTrack(
    $title: String!
    $authorId: ID!
    $thumbnail: String
    $length: Int
    $modulesCount: Int
  ) {
    addTrack(
      title: $title
      authorId: $authorId
      thumbnail: $thumbnail
      length: $length
      modulesCount: $modulesCount
    ) {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;

const AddTrack = () => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [length, setLength] = useState(0);
  const [modulesCount, setModulesCount] = useState(0);

  const [addTrack, { data, loading, error }] = useMutation(ADD_TRACK);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrack({
      variables: { title, authorId, thumbnail, length, modulesCount },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author ID:</label>
          <input
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        <div>
          <label>Length:</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Module Count:</label>
          <input
            type="number"
            value={modulesCount}
            onChange={(e) => setModulesCount(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Add Track</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Track added successfully:</p>
          <p>Title: {data.addTrack.title}</p>
          <p>Author: {data.addTrack.author.name}</p>
        </div>
      )}
    </div>
  );
};

export default AddTrack;
