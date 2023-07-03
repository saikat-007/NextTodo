import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only post method is allowed");
  await connectDB();
  const { title, description } = req.body;

  if (!title || !description)
    return errorHandler(res, 400, "Please enter all fields");

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login first");

  Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message: "Task Created",
  });
});

export default handler;
