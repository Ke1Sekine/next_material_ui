import Head from 'next/head';
import { Main as MainLayout } from '../layout/index';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout home>
        <Head>
          <title>Material UI Admin</title>
        </Head>
      </MainLayout>
    </ThemeProvider>
  )
}