import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const createVehicle: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getVehicles: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getVehicleById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateVehicle: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteVehicle: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=vehicleController.d.ts.map