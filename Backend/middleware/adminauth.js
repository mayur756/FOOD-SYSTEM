import jwt from "jsonwebtoken";

const adminauth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, please login"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check admin role/email
        if (decoded.email !== process.env.ADMIN_MAIL || decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access denied"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default adminauth;
