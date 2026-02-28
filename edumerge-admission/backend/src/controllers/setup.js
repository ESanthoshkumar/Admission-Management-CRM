import Institution from "../models/Institution.js";
import Campus from "../models/Campus.js";
import Department from "../models/Department.js";

export const getSetupData = async (req, res) => {
    try {
        const institutions = await Institution.find();
        const campuses = await Campus.find().populate("institution");
        const departments = await Department.find().populate("campus");
        res.json({ institutions, campuses, departments });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch setup data" });
    }
};

export const createInstitution = async (req, res) => {
    try {
        const { name, code } = req.body;
        const inst = await Institution.create({ name, code });
        res.status(201).json(inst);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createCampus = async (req, res) => {
    try {
        const { name, institutionId } = req.body;
        const campus = await Campus.create({ name, institution: institutionId });
        res.status(201).json(campus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const { name, campusId } = req.body;
        const dept = await Department.create({ name, campus: campusId });
        res.status(201).json(dept);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
