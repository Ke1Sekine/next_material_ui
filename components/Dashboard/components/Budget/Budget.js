import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MoneyIcon from '@material-ui/icons/Money';

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

function getBudget() {
  //予算変動
  let array = [0, -1, 1, -5, 5, 10, -10];
  let result = array[Math.floor(Math.random() * array.length)] * 10000;
  return result;
}
function getBudgetPercent(new_budget, budget) {
  var result = (new_budget - budget) / budget * 100;
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

const Budget = props => {
  const {className, ...rest} = props;
  const classes = useStyles();
  const [budget, setBudget] = useState(5300000);
  const [budgetPercent, setBudgetPercent] = useState(0);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      let new_budget = budget + getBudget()
      setBudget(new_budget);
      let percent = getBudgetPercent(new_budget, budget);
      setBudgetPercent(percent);
      if (percent === 0) {
        setStatus(0);
      } else if (percent > 0) {
        setStatus(1);
      } else {
        setStatus(2);
      }
    }, 60000);
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
            <Typography variant="h3">{budget.toLocaleString()}円</Typography>
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


Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
