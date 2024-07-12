const mongoose = require("mongoose");
const Schema = mongoose.Schema;
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const orderingMaterialsSchema = {
  orderNumber: { type: String, default: "" },
  newsletterDate: { type: String },
  extras: { type: String, default: "" },
  newsletterSubscription: { type: String },
};

const customerInfoStatuSchema = {
  clientStatus: { type: Array, default: [] },
  dataProtection: { type: Boolean, default: false },
  employee: { type: String, default: "" },
  customerInfo_lname: { type: String, default: "" },
  remarks: { type: String, default: "" },
  war: { type: Boolean, default: false },
  research: { type: Boolean, default: false },
  dataCollection: { type: String, default: getCurrentDate },
};

const customerContactSchema = {
  title: { type: String, default: "" },
  // salution: { type: String, default: "" },
  gender: { type: String, default: "" },
  fname: { type: String, default: "" },
  lname: { type: String, default: "" },
  startDate: { type: String, default: "" },
  name: { type: String, default: "" },
};

const customerBillSchema = {
  billAddress: { type: String, default: "" },
  billPlz: { type: String, default: "" },
  billLand: { type: String, default: "" },
  billOrt: { type: String, default: "" },
};

const customerDeliverySchema = {
  fname: { type: String, default: "" },
  lname: { type: String, default: "" },
  plz: { type: String, default: "" },
  address: { type: String, default: "" },
  land: { type: String, default: "" },
  ort: { type: String, default: "" },
  phone: { type: String, default: "" },
  mobile: { type: String, default: "" },
  alreadyPaid: { type: Boolean, default: false },
};

const customerDepositSchema = {
  deposit: { type: Boolean, default: false },
  emergencyPass: { type: Boolean, default: false },
  reminderStamp: { type: String },
  updateStamp: { type: String },
  nextBrand: { type: String },
  lastStamp: { type: String },
  startDeposit: { type: String },
};

const customerBurialSchema = {
  termination: { type: Boolean, default: false },
  terminationDeath: { type: Boolean, default: false },
  notTermination: { type: Boolean, default: false },
  financialReasons: { type: Boolean, default: false },
};

const customerInfo = {
  fname: { type: String },
  title: { type: String },
  lname: { type: String },
  phone: { type: String },
  email: { type: String },
  plz: { type: String, default: " " },
  ort: { type: String, default: " " },
  street: { type: String, default: " " },
  land: { type: String, default: " " },
  startDate: { type: String },
  salution: { type: Array, default: [] },
  status: { type: Array, default: [] },
  id: { type: String },
  // created_by: { type: Schema.Types.ObjectId, ref: "user" },
};
const customerSchema = new Schema(
  {
    customer: customerInfo,
    orderingMaterials: orderingMaterialsSchema,
    customerInfoStatu: customerInfoStatuSchema,
    those: [],
    customerContact: customerContactSchema,
    customerBills: customerBillSchema,
    customerDelivery: customerDeliverySchema,
    customerDeposit: customerDepositSchema,
    customerBurial: customerBurialSchema,
    services: { type: Schema.Types.ObjectId, ref: "spv" },
    created_by: { type: Schema.Types.ObjectId, ref: "user" },

    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    countId: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = { Customer };
