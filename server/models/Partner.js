const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    partnerId: { type: String, unique: true, index: true }, // Unique Partner ID
    entityName: { type: String, required: true },
    panNumber: { type: String, required: true },
    partnerType: { type: String, required: true },
    firmType: { type: String, required: true },
    pocName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gstNumber: { type: String },
    paymentDetails: { type: String },
    hasGst: { type: Boolean, required: true }
});

// Pre-save hook to generate the unique Partner ID
PartnerSchema.pre('save', async function(next) {
    if (!this.partnerId) {
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Get current date in YYYYMMDD format
        
        // Count the documents with similar partnerId prefix
        let sequence = await this.constructor.countDocuments({ partnerId: new RegExp(`^PART${currentDate}`) });
        sequence++; // Increment sequence for new document
        
        this.partnerId = `PART${currentDate}${sequence}`;
    }
    next();
});

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;
