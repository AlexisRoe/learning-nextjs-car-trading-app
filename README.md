# Learning Server-Side-Rendering (Next.js)

in this repo I follow the tutorial by [Bruno Antunes](https://www.youtube.com/channel/UCyU0mNYdX9EHY7rc5yucIZA) The video course you can find [here](https://www.youtube.com/playlist?list=PLYSZyzpwBEWSQsrukurP09ksi49H9Yj40). In the end there will be a car trading app, showing all the features of the tutorial. Afterwards you find my learnings.

you can find the distributed app [here]()

## Routing in Next.js

- static routes are automatically included by creating folders and files in the page folder

        pages/vehicle/opel.js --> http://localhost:3000/vehicle/opel

- dynamic routes can be created by simply close the name in [] brackets

        pages/[vehicle]/[type] --> this creates two variables "vehicle" & "type"

- reading it in the function works like that

  ```js
  import { useRouter } from "next/router";

  export default function Person() {
    const router = useRouter();
    return (
      <h2>
        {router.query.person}´s {router.query.vehicle}
      </h2>
    );
  }
  ```

- links are build like that, even dynamically

  ```js
  import Link from "next/link";

  export default function Details() {
    return (
      <div>
        <Link as="/car/bruno" href="/[vehicle]/[person]">
          <a>Details: Bruno`car</a>
        </Link>
      </div>
    );
  }
  ```

  ```js
  ...
  const peoples = [
      {vehicle: "car1", person: "person1"},
      {vehicle: "car2", person: "person2"},
      {vehicle: "car3", person: "person3"},
  ]
  ...
  {peoples.map(people => {
      <Link as={`/${people.vehicle}/${people.person}`} href="/[vehicle]/[person]">
      ...
  })}
  ```
