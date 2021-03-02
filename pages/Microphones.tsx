import { GetStaticPaths, GetStaticProps } from "next";
import { Microphone } from "../model/Microphones";
import { openDB } from "../utils/openDB";
import Link from "next/link";

export interface IndexProps {
  microphones: Microphone[];
}

const Index = ({ microphones }: IndexProps) => {
  return (
    <ul>
      {microphones.map((microphone, index) => {
        return (
          <li key={index}>
            <Link href="/[id]" as={`/${microphone.id}`}>
              <a>{microphone.brand + microphone.model}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all("select * from microphone");

  return { props: { microphones } };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all("SELECT * FROM microphone");
  const paths = microphones.map((microphone) => {
    return { params: { id: microphone.id.toString() } };
  });

  return {
    fallback: true,
    paths,
  };
};

export default Index;
