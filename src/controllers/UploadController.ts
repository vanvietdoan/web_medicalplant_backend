import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { IFileUploadResponse } from '../interfaces/IFile';

// Ensure upload directories exist
const createUploadDirectories = () => {
  const dirs = ['uploads', 'uploads/avatars', 'uploads/proofs', 'uploads/plants', 'uploads/diseases'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Create directories on startup
createUploadDirectories();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Different destinations based on file type
    let dest = 'uploads/';
    
    if (file.fieldname === 'avatar') {
      dest = 'uploads/avatars/';
    } else if (file.fieldname === 'proof') {
      dest = 'uploads/proofs/';
    } else if (file.fieldname === 'plant') {
      dest = 'uploads/plants/';
    } else if (file.fieldname === 'disease') {
      dest = 'uploads/diseases/';
    }
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Create upload middleware
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'avatar' || file.fieldname === 'plant' || file.fieldname === 'disease') {
      // Only allow image files for avatar and plant/disease images
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed for this upload type'));
      }
    } else if (file.fieldname === 'proof') {
      // Only allow PDF files for proof
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed for proof'));
      }
    }
    cb(null, true);
  }
});

export class UploadController {
  // Upload a single file
  uploadSingle(fieldName: string) {
    return (req: Request, res: Response) => {
      const uploadMiddleware = upload.single(fieldName);
      
      uploadMiddleware(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const fileUrl = `${baseUrl}/${req.file.path.replace(/\\/g, '/')}`;
        
        const response: IFileUploadResponse = {
          url: fileUrl,
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size
        };
        
        res.status(200).json(response);
      });
    };
  }
  
  // Upload multiple files
  uploadMultiple(fieldName: string, maxCount: number = 5) {
    return (req: Request, res: Response) => {
      const uploadMiddleware = upload.array(fieldName, maxCount);
      
      uploadMiddleware(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
          return res.status(400).json({ message: 'No files uploaded' });
        }
        
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const response = (req.files as Express.Multer.File[]).map(file => {
          const fileUrl = `${baseUrl}/${file.path.replace(/\\/g, '/')}`;
          
          return {
            url: fileUrl,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size
          } as IFileUploadResponse;
        });
        
        res.status(200).json(response);
      });
    };
  }
}