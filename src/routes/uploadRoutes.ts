import { Router } from 'express';
import { Container } from 'typedi';
import { UploadController } from '../controllers/UploadController';
import { auth } from '../middleware/auth';

const router = Router();
const uploadController = Container.get(UploadController);

// Avatar upload (single image)
router.post('/avatar', auth, uploadController.uploadAvatar);

// Proof document upload (single PDF)
router.post('/proof', auth, uploadController.uploadProof);

// Plant image upload (single)
router.post('/plant/single', auth, uploadController.uploadPlantImage);

// Disease image upload (single)
router.post('/disease/single', auth, uploadController.uploadDiseaseImage);

// Multiple images upload
router.post('/multiple', auth, uploadController.uploadMultipleImages);

export default router;