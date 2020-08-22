import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import Api from '@lib/Api/UsersByDevice';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

async function getUsersByDeviceApi() {
  const api = new Api();
  return api.run((json) => {
    return json;
  });
}

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [DesktopNum, setDesktopNum] = useState(63);
  const [TabletNum, setTabletNum] = useState(15);
  const [MobileNum, setMobileNum] = useState(22);

  //Dom表示後にハンドリング
  useEffect(() => {
    const id = setInterval(async () => {
      console.log(await getUsersByDeviceApi());
      let { DesktopNum, TabletNum, MobileNum } = await getUsersByDeviceApi();
      setDesktopNum(DesktopNum);
      setTabletNum(TabletNum);
      setMobileNum(MobileNum);
    }, 60000);
    return () => clearInterval(id);
  });

  const data = {
    datasets: [
      {
        data: [DesktopNum, TabletNum, MobileNum],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Desktop',
      value: DesktopNum,
      icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Tablet',
      value: TabletNum,
      icon: <TabletMacIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Mobile',
      value: MobileNum,
      icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Users By Device"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
