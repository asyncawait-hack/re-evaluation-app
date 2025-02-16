// const { createReevaluationRequest } = require('../services/reevaluation.service');

const applyForReevaluationController = async (req, res) => {
    try {
        const { paymentData, requestData } = req.body;
        const studentId = req.user._id; // Note: changed from id to _id

        console.log('Received request:', {
            studentId,
            paymentData,
            requestData
        });

        const reevaluation = await createReevaluationRequest(
            studentId,
            paymentData,
            requestData
        );

        res.status(200).json({
            success: true,
            message: 'Reevaluation request submitted successfully',
            data: reevaluation
        });
    } catch (error) {
        console.error('Reevaluation request error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit reevaluation request',
            error: error.message
        });
    }
};

module.exports = {
    applyForReevaluationController
};

