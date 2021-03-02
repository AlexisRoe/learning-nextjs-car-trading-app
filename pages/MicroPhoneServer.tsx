import { GetServerSideProps } from "next";
import { Microphone } from "../model/Microphones";
import { openDB } from "../utils/openDB";

export interface IndexProps {
  microphones: Microphone[];
}

const Index = ({ microphones }: IndexProps) => {
  return <pre>{JSON.stringify(microphones, null, 4)}</pre>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  const db = await openDB();
  const microphones = await db.all<Microphone[]>("SELECT * FROM microphone");

  return { props: { microphones } };
};

export default Index;
