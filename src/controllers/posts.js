export const getPosts = (req, res) => {
  try {
    res.send("this is the post route");
  } catch (err) {
    console.log(err);
  }
};
