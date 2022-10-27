require('dotenv').config();

export const config = {
	databaseUrl: process.env.DATABASE_URL,
	port: process.env.PORT,
	secretKey: process.env.JWT_SECRET,
	expireTime: process.env.JWT_EXPIRES_IN
}