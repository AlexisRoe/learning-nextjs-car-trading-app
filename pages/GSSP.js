import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const MySecret = serverRuntimeConfig.MY_SECRET;
const apiEndpoint = publicRuntimeConfig.API_ENDPOINT;

console.log(MySecret);
console.log(apiEndpoint);

export default function Gssp(props) {
  return (
    <>
      <div>MY_SECRET: {MySecret}</div>
      <div>API_ENDPOINT: {apiEndpoint}</div>
      <div>{JSON.stringify(props, null, 4)}</div>
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      MY_SECRET: MySecret,
      API_ENDPOINT: apiEndpoint,
    },
  };
};
