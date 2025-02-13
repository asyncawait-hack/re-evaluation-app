
// import { Organization } from "../schema/organization/organisationRegisterSchema";
const { Organization } = require("../schema/organization/organisationRegisterSchema.js")
async function findOrganization(parameters) {
    try {
        const response = await Organization.findOne({ ...parameters });
        // console.log("find ORGANISATION RESPONSE")
        // console.log("response")
        // console.log(response)
        return response;
    } catch (error) {
        console.log("error in organizationregsiter.repository.js")
        console.log(error)
    }
}

async function createOrganization(organizationDetails) {
    console.log("here in the organizationregister.repository.js ->> ")
    console.log(organizationDetails)
    try {
        const response = await Organization.create(organizationDetails);
        console.log(response)
        console.log("here in organizationRegister.repositroy.js")
        return response
    } catch (error) {
        console.log("error ")
        console.log(error);
        
        // console.log(error.cause.code)
        // console.log("i am here")
        // console.log(error.code)
        if (error.cause.code === 11000) {
            // Duplicate key error
            const duplicateKey = error.keyValue; // Access the duplicate key value
            // console.log('Duplicate Key:', duplicateKey);
            // console.log("duplicate key error")
            throw new Error("Organization Already Exist. (from organization.register.repository.js)");

            return { Field: Object.keys(duplicateKey)[0] }
        }
        else {
            console.log("this is not duplicate error")
            console.error('Error:', error);
        }
    }

}

module.exports = {
    findOrganization, createOrganization
}