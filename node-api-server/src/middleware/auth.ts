// // import { NextFunction, Request, Response } from "express";

// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import UnAuthenticatedError from "../error/unauthenticatedError";
// import ForbiddenError from "../error/forbidden.errors";
// import { ErrorCode } from "../error/custom.errors";
// import { validateEnv } from "../config/config";
// // import { getUserById } from "../service/user.service";
// import { extractTokenfromHeader } from "../utils/util";
// import NotFoundError from "../error/notFound.errors";



// export interface UserDataType {
//   userId: string;
// }
// export interface IUserMessage<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
//   userData: UserDataType;
// }



// export const AuthJWT = (
//   req: IUserMessage,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const jwtconfig = validateEnv()?.jwt
//     const token = extractTokenfromHeader(req)
//     if (!token) throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
//     jwt.verify(token, jwtconfig?.accessSecret, async (err, decoded) => {
//       if (err) return next(new ForbiddenError("Token expires", ErrorCode?.TOKEN_EXPIRE));
//       const decodeData = decoded as UserDataType;
//       // const user: ExtendedUser = await getUserById(decodeData?.userId, true)
//       const user = null
//       if (!user) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)
//       req.userData = {
//         userId: decodeData?.userId,
//       }
//       next();
//     });

//   } catch (err) {
//     throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
//   }
// };


