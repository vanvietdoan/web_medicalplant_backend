import { Router } from 'express';
import { Container } from 'typedi';
import { User_ReportController } from '../controllers/User_ReportController';
import { auth } from '../middleware/auth';

const router = Router();
const userReportController = Container.get(User_ReportController);

router.get('/', userReportController.getAllUserReports.bind(userReportController));
router.get('/user/:userId', userReportController.getUserReportsByUserId.bind(userReportController));

router.get('/report/:reportId', userReportController.getUserReportsByReportId.bind(userReportController));


router.post('/', auth, userReportController.createUserReport.bind(userReportController));
router.put('/:id', auth, userReportController.updateUserReport.bind(userReportController));
router.delete('/:id', auth, userReportController.deleteUserReport.bind(userReportController));

export default router; 