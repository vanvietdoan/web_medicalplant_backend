import { Router } from 'express';
import { Container } from 'typedi';
import { UploadController } from '../controllers/UploadController';
import { auth } from '../middleware/auth';

const router = Router();
const uploadController = Container.get(UploadController);

// Avatar upload (single image)
router.post('/avatar', auth, uploadController.uploadAvatar.bind(uploadController));

// Proof document upload (single PDF)
router.post('/proof', auth, uploadController.uploadProof.bind(uploadController));

// Plant image upload (single)
router.post('/plant/single', auth, uploadController.uploadPlantImage.bind(uploadController));

// Disease image upload (single)
router.post('/disease/single', auth, uploadController.uploadDiseaseImage.bind(uploadController));

// Multiple images upload
router.post('/multiple', auth, uploadController.uploadMultipleImages.bind(uploadController));

export default router;