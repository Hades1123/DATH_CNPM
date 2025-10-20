import { NextFunction, Request, Response } from "express";

import * as authService from "../services/auth.service";
import * as authDto from "../dtos/auth";
import { ApiResponse } from "../types/api-response";
import { UserResponse } from "../dtos/users";


export const loginHandler = async (req: Request, res: Response<ApiResponse<authDto.LoginResponse>>, next: NextFunction) => {
  const parsed = authDto.loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.issues[0].message,
    });
  }
  const data: authDto.LoginRequest = parsed.data;
  try {
    const response : authDto.LoginResponse = await authService.login(data);
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};


export const sendOtpForRegisterHandler = async (req: Request, res: Response<ApiResponse<string>>, next: NextFunction) => {
  const { email } = req.body;
  try {
    await authService.sendOtpForRegister(email);
    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const registerHandler = async (req: Request, res: Response<ApiResponse<{token: authDto.LoginResponse, user : UserResponse}>>, next: NextFunction) => {
   // validation
    const parsed = authDto.RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.issues[0].message
      });
    }
    const data : authDto.RegisterRequest = parsed.data;
    data.role = "CUSTOMER";
    try{
      const response : ApiResponse<{token: authDto.LoginResponse, user : UserResponse}> = { 
        success: true,
        data: {
          user : await authService.register(data),
          token : await authService.login(data)
        }
       };
      res.status(200).json(response);
    } catch (error : Error | any) {
      next(error);
    }
};
