import axios from "axios";
export const analyse = async (req, res) => {
  const ip = req.ip;
  console.log(ip);
  const location = await axios.get(`http://ip-api.com/json/${ip}`);

  res.status(200).json({ data: location.data });
};
