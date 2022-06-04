import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
          <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        adress={props.meetupData.adress}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://amel123:123@cluster0.cnozerd.mongodb.net/?retryWrites=true&w=majority"
  );
  const database = client.db();

  const meetupsCollection = database.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  /*  console.log(meetups) */
  const justIds = meetups.map((meetup) => meetup._id.toString());
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://amel123:123@cluster0.cnozerd.mongodb.net/?retryWrites=true&w=majority"
  );
  const database = client.db();
  const meetupsCollection = database.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
