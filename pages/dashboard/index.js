import Head from 'next/head';
import { Main as MainLayout } from '@layout/index';
import { ThemeProvider } from '@material-ui/styles';
import theme from '@theme';
import Dashboard from '@components/Dashboard/Main';

export function main(props) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout home>
        <Head>
          <title>Dashboard | ダッシュボード</title>
        </Head>
        <Dashboard />
      </MainLayout>
    </ThemeProvider>
  )
}

//非推奨
// main.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   console.log("111budget", json.stargazers_count);
//   return { stars: json.stargazers_count }
// }

//SSRされる際に実行
// export async function getServerSideProps() {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   console.log("111budget", json.stargazers_count);
//   return {
//     props: {
//       stars: json.stargazers_count
//     }
//   }
// }

//ビルド時に一回のみ
// export async function getStaticProps({ req }) {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   console.log("122budget", json.stargazers_count);
//   return {
//     props: {
//       stars: json.stargazers_count
//     }
//   }
// }
export default main;