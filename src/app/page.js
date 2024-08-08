
 

import { getServerSession } from 'next-auth';
import Layout from './_common/layout/layout';
import Homepage from './_homepage/homepage';
import authOptions from './api/(nextauth)/auth/[...nextauth]/options';

export default async function Home() {
  let session=await getServerSession(authOptions)

  return (
    <>
      <Layout>
        <h1>{JSON.stringify(session)}</h1>
        <Homepage/>
      </Layout>
    </>



  );
}
