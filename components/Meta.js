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
        <meta property='og:url' content={`https://localhost:7777${router.asPath}`} />
        <meta property='og:url' content={`https://test.africanvo.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Voice Over Marketplace" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places&callback=initMap"async></script> */}
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
    </>
  )
}

export default Meta;
