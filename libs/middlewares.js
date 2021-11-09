import { checkAuth } from "./authHelpers";

const withProtect = handler => {
  return async (req, res) => {
    // For any API calls that are not GET or POST return json response
    if (req.method !== "GET" && req.method !== "POST")
      return res.status(400).json({
        success: false,
        message: "Only GET and POST requests are allowed."
      });

    const isAuthenticated = checkAuth(req, res);

    if (!isAuthenticated)
      return res.status(401).json({ success: false, message: "Unauthorized." });

    // Execute initial backend request handler
    return handler(req, res);
  };
};

export default withProtect;
