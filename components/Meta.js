import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = (pageMeta) => {
  const router = useRouter();

  const meta = {
    title: 'Bcloud',
    description: 'Bcloud.',
    type: 'website',
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property='og:url' content={`https://localhost:3000${router.asPath}`} />
        {/* <meta property='og:url' content={`https://test.africanvo.com${router.asPath}`} /> */}
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Booking Cloud - Your online booking platform for hotels and travel" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places&callback=initMap"async></script> */}
      </Head>
    </>
  )
}

export default Meta;
