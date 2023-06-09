import { Landing } from '@/components/home'
import { websiteContent } from '@/utils/data'
import { titleCase } from '@/utils/helper'
import { googleBusinessSocialLinksAttach } from '@/utils/scripts'
import Head from 'next/head'
import Script from 'next/script'

const {
  author,
  description,
  keywords,
  ogImage,
  ogSiteName,
  ogTitle,
  ogUrl,
  title,
} = websiteContent.homepage

export default function Home() {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='canonical' href={`${websiteContent.seo.websiteName}/`} />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='var(--primary-5)' />
        <meta name='robots' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='google' content='nositelinkssearchbox' key='sitelinks' />
        <meta name='google' content='notranslate' key='notranslate' />
        <title>{titleCase(title)}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={titleCase(description)} />

        <meta name='Author' content={titleCase(author)} />
        <meta name='og:site_name' content={ogSiteName} />
        <meta name='og:title' content={titleCase(ogTitle)} />
        <meta name='og:url' content={ogUrl} />
        <meta name='og:image' content={ogImage} />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_CA' />
        <meta
          name='google-site-verification'
          content='Bkhg2CqT-HR3o-RNv-PgzjKiWc0AUJKl1QL7C2ITCZ0'
        />
        <meta name='og:description' content={titleCase(description)} />
      </Head>

      <div>
        <Landing />

        {/* Google script to add social media */}
        {/* <Script
          type='application/ld+json'
          dangerouslySetInnerHTML={googleBusinessSocialLinksAttach()}
          key='google-jsonld'
        /> */}
      </div>
    </>
  )
}
