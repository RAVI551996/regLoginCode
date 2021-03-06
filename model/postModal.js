const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
    DEALER_GROUP_NAME : { type: String },
    DEALER_NAME : { type: String },
    ENQUIRY_CUSTOMER_NAME : { type: String },
    ADDRESS : { type: String },
    PINCODE : { type: String },
    CONTACT_NUMBER : { type: String },
    COMPETITOR_MODEL : { type: String },
    No_OF_FOLLOW_UPS : { type: String },
    SALES_OFFICER : { type: String },
    CTDMS_ENQ_NO : { type: String },
    DEALER_CODE : { type: String },
    DEALER_GROUP_CODE : { type: String },
    DEMAND_STRUCTURE :{ type: String },
    DURATION_SINCE_NOT_FOLLOWED_UP : { type: String },
    ENQ_QTY : { type: String },
    ENQUIRY_AGE : { type: String },
    ENQUIRY_DATE : { type: String },
    EXT_COLOR : { type: String },
    FUEL_TYPE : { type: String },
    I_CROP_ENQUIRY : { type: String },
    INT_COLOR : { type: String },
    LAST_FOLLOW_UP : { type: String },
    MODE : { type: String },
    MODEL_NAME : { type: String },
    PURPOSE :{ type: String },
    SOURCE : { type: String },
    STATUS : { type: String },
    SUFFIX_NAME : { type: String },
    TEAM : { type: String },
    TEST_DRIVE_DATE : { type: String },
    TEST_DRIVE_GIVEN :{ type: String },
    ZONE : { type: String }
});

module.exports = mongoose.model('Post', postSchema);