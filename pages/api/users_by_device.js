export default (req, res) => {
  const desktopNumMax = 70
  const desktopNumMin = desktopNumMax -20
  const TabletNumMax = 25
  const TabletNumMin = TabletNumMax -10
  const min = 0
  let DesktopNum = Math.floor(Math.random() * (desktopNumMax + 1 - desktopNumMin)) + desktopNumMin;
  let TabletNum = Math.floor(Math.random() * (TabletNumMax + 1 - TabletNumMin)) + TabletNumMin;
  let MobileNum = 100 - (DesktopNum + TabletNum);
  res.status(200).json({
    DesktopNum: DesktopNum,
    TabletNum : TabletNum,
    MobileNum : MobileNum
  });
};