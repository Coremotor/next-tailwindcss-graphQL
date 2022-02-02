import type { NextPage } from 'next'
import { HomePage } from '../app/_pages/home'

const Home: NextPage = () => {
  return (
    <HomePage />
  )
}

export default Home
//
// export async function getServerSideProps() {
//     const { data } = await client.query({
//         query: gql`
//             query Countries {
//                 countries {
//                     code
//                     name
//                     emoji
//                 }
//             }
//         `,
//     });
//
//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//   };
// }
//
// export async function getStaticProps() {
//     const { data } = await client.query({
//         query: gql`
//             query Countries {
//                 countries {
//                     code
//                     name
//                     emoji
//                 }
//             }
//         `,
//     });
//
//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//   };
// }
