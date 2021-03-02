import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Microphone } from "../../model/Microphones";
import { openDB } from "../../utils/openDB";

export type MicrophoneDetailProps = Microphone;

const MicrophoneDetail = ({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading....</div>;
  }

  return (
    // welcome div-soup 🤦‍♂️
    <div>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{imageUrl}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (
  ctx
) => {
  const id = ctx.params.id as string;
  const db = await openDB();
  const microphone = await db.get(
    "SELECT * FROM microphone WHERE id = ?",
    id.toString()
  );

  return { props: microphone };
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

export default MicrophoneDetail;
