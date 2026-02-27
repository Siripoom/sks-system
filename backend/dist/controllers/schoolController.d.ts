import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const createSchool: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSchools: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSchoolById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateSchool: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteSchool: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=schoolController.d.ts.map