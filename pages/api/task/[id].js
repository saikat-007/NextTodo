import { checkAuth, connectDB } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { Task } from "../../../models/task";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");
  const taskId = req.query.id;
  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 400, "Task Not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } 
  
  else if (req.method === "DELETE") {
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task DELETED successfully",
    });
  } 
  
  else return errorHandler(res, 400, "This Method is not allowed");
});

export default handler;
