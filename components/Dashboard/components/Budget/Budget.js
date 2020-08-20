import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MoneyIcon from '@material-ui/icons/Money';
import Api from '@lib/Api/Budget';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceDownIcon: {
    color: theme.palette.error.dark
  },
  differenceDownValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  differenceUpIcon: {
    color: theme.palette.success.dark
  },
  differenceUpValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  differenceForwardIcon: {
    color: theme.palette.text
  },
  differenceForwardValue: {
    color: theme.palette.text,
    marginRight: theme.spacing(1)
  },
}));

async function getBudgetApi() {
  const api = new Api();
  let budget = api.run((json)=>{
    return json.budget;
  });
  return budget;
}

function getBudgetPercent(NewBudgetNum, budgetNum) {
  var result = (NewBudgetNum - budgetNum) / budgetNum * 100;
  var n = 2; // 小数点第n位まで残す
  return Math.floor(result * Math.pow(10, n)) / Math.pow(10, n);
}
function ArrowRender({ status, classes}) {
  if (status === 0 ) {
    return <ArrowForwardIcon className={classes.differenceForwardIcon} />;
  } else if (status === 1) {
    return <ArrowUpwardIcon className={classes.differenceUpIcon} />;
  } else {
    return <ArrowDownwardIcon className={classes.differenceDownIcon} />;
  }
}

const Budget = (props) => {
  const {budget, className, ...rest} = props;

  const classes = useStyles();
  const [budgetNum, setBudget] = useState(budget ? budget : 350000);
  const [budgetPercent, setBudgetPercent] = useState(0);
  const [status, setStatus] = useState(0);

  //Dom表示後にハンドリング
  useEffect(() => {
    const id = setInterval(async () => {
      let NewBudgetNum = await getBudgetApi();
      console.log(NewBudgetNum);
      setBudget(NewBudgetNum);
      let percent = getBudgetPercent(NewBudgetNum, budgetNum);
      setBudgetPercent(percent);
      if (percent === 0) {
        setStatus(0);
      } else if (percent > 0) {
        setStatus(1);
      } else {
        setStatus(2);
      }
    }, 15000);
    // }, 60000);
    return () => clearInterval(id);
  });
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              予算
            </Typography>
            <Typography variant="h3">{budgetNum}円</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowRender 
            status={status}
            classes={classes}
          />
          <Typography
            className={status === 0 ? classes.differenceForwardValue : status === 1 ? classes.differenceUpValue : classes.differenceDownValue}
            variant="body2"
          >
            {budgetPercent}%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

// // 必ずサーバーサイドで実行(Not:ビルド時に実行される)
// Budget.getServerSideProps = async ({ req }) => {
//   const budget = getBudgetApi();
//       console.log(budget);
//       return {
//         props: {
//           budget: budget
//         }
//     }
// }

export async function getServerSideProps() {
  const budget = await getBudgetApi();
  console.log(budget);
  return {
    props: {
      budget: budget
    }
  }
}
Budget.getStaticProps = async ({ req }) => {
  const budget = await getBudgetApi();
  console.log(budget);
  return {
    props: {
      budget: budget
    }
  }
}


Budget.propTypes = {
  className: PropTypes.string,
  budget: PropTypes.number
};

export default Budget;
