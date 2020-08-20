
export default (req, res) => {
  let array = [0, -1, 1, -5, 5, 10, -10];
  let result = array[Math.floor(Math.random() * array.length)] * 10000;
  result = 350000 + result;
  res.status(200).json({
    budget: result,
  });
};