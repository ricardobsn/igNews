import styles from "./home.module.scss"
import Head from 'next/head'
import { SubscribeButton } from "../components/SubscribeButton"
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from "../services/stripe"

interface NameProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: NameProps) {


  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> Hey, welcome</span>
          <h1> qoquq uevq ueiverqij cqe wo</h1>
          <p>
            dvwe vwerv erver vqqcc <br />
            <span>{product.amount}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
export const getServerSideProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1JyiMaGzKajbbZPeHWIOJIhi', { expand: ['product'] })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100)
  }
  return {
    props: {
      product,
      revalidate: 60 * 60 * 24 //24 horas
    }
  }
}
