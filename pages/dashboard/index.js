import Head from 'next/head';
import { Main as MainLayout } from '../layout/index';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
import Dashboard from './Dashboard';

export default function main() {
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