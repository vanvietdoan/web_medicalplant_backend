import { Router } from 'express';
import { Container } from 'typedi';
import { UploadController } from '../controllers/UploadController';
import { auth } from '../middleware/auth';

const router = Router();
const uploadController = Container.get(UploadController);

// Avatar upload (single image)
router.post('/avatar', uploadController.uploadAvatar.bind(uploadController));

// Proof document upload (single PDF)
router.post('/proof', uploadController.uploadProof.bind(uploadController));

// Plant image upload (single or multiple)
router.post('/plant/single', uploadController.uploadPlantImage.bind(uploadController));
router.post('/plant/multiple', uploadController.uploadMultipleImages.bind(uploadController));

// Disease image upload (single or multiple)
router.post('/disease/single', uploadController.uploadDiseaseImage.bind(uploadController));
router.post('/disease/multiple', uploadController.uploadMultipleImages.bind(uploadController));

export default router;