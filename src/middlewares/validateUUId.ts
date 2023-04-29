import statusCode from "../utils/statusCode";

const validateUUId = (req, res, next) => {
  const params = req.params;
  const fields = Object.keys(params);
  const regex = new RegExp(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
  );
  fields.every((param: string) => {
    if(param.includes("id"))
      if (regex.test(params[param])) {
        return true;
      } else {
        res.status(statusCode.BAD_REQUEST).json({ message: "Invalid id" });
        return false;
      }
  });
  next();
};

export default validateUUId;
