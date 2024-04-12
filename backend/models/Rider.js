const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles");

const riderSchema = new mongoose.Schema(
    {
        employeeid: { type: String, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.RIDER,
        },
        image: { type: String },
        address: { type: String },
        contact: { type: Number },
        rides: { type: Number, default: 0 },
        status: { type: String, default: "Available" },
    },
    {
        timestamps: true,
    }
);

/*async function generateUniqueEmployeeId() {
    const Rider = mongoose.model("Rider", riderSchema);
    let employeeId;
    do {
        const randomId = Math.floor(Math.random() * 1000).toString().padStart(2, "0");
        employeeId = `Rider${randomId}`;
    } while (await Rider.exists({ employeeid: employeeId }));
    return employeeId;
}

riderSchema.pre("save", async function (next) {
    if (!this.employeeid) {
        this.employeeid = await generateUniqueEmployeeId();
    }
    next();
});*/

riderSchema.pre("save", async function (next) {
    const Rider = this.constructor;
    const lastRider = await Rider.findOne({}, {}, { sort: { employeeid: -1 } });
    let newEmployeeId;
    if (lastRider) {
        const lastEmployeeId = parseInt(lastRider.employeeid.slice(-2)); // Extract the numerical part from the last employeeid
        newEmployeeId = `Rider${(lastEmployeeId + 1).toString().padStart(2, "0")}`; // Increment and format the new employeeid
    } else {
        newEmployeeId = "Rider01"; // If there are no riders yet, start from 01
    }
    this.employeeid = newEmployeeId;
    next();
});

module.exports = mongoose.model("Rider", riderSchema);
