import { Router } from 'express';
import { UploadController } from '../controllers/UploadController';
import { auth } from '../middleware/auth';

const router = Router();
const uploadController = new UploadController();

// Avatar upload (single image)
router.post('/avatar', auth, uploadController.uploadSingle('avatar'));

// Proof document upload (single PDF)
router.post('/proof', auth, uploadController.uploadSingle('proof'));

// Plant image upload (single or multiple)
router.post('/plant/single', auth, uploadController.uploadSingle('plant'));
router.post('/plant/multiple', auth, uploadController.uploadMultiple('plant', 10));

// Disease image upload (single or multiple)
router.post('/disease/single', auth, uploadController.uploadSingle('disease'));
router.post('/disease/multiple', auth, uploadController.uploadMultiple('disease', 10));

export default router;