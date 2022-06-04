const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=944&q=80",
    adress: "Some adress 12345 SomeCity",
    description: "This is our first meetup",
  },
  {
    id: "m2",
    title: "second meetup",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=944&q=80",
    adress: "Some adress 121111 SomeCity",
    description: "This is our second meetup",
  },
];
import Head from "next/head";
import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react/cjs/react.production.min";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"></meta>
      </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>);
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://amel123:123@cluster0.cnozerd.mongodb.net/?retryWrites=true&w=majority"
  );
  const database = client.db();
  const meetupsCollection = database.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
