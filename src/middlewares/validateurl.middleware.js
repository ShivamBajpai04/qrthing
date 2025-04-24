import axios from "axios";

export default async function validateURL(req, res, next) {
  try {
    const url = req.body.url;
    const host = btoa(new URL(url).hostname);
    const options = {
      method: "GET",
      url: `https://www.virustotal.com/api/v3/urls/${host}`,
      headers: {
        accept: "application/json",
        "x-apikey": process.env.RISK_CHECK_API_KEY,
      },
    };

    const result = await axios.request(options);
    const test = result.data.data;
    console.log(test);
    if (result) {
      next();
    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Potentially malicious URL" });
  }
}
