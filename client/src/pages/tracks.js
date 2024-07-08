import React from "react";
import { Layout } from "../components";
import { gql, useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";
import AddTrack from "./AddTrack";
const TRACKS = gql`
  query ExampleQuery {
    tracksForHome {
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

const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <>
      <Layout grid>
        <QueryResult error={error} loading={loading} data={data}>
          {data?.tracksForHome?.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </QueryResult>
        <AddTrack />
      </Layout>
    </>
  );
};

export default Tracks;
