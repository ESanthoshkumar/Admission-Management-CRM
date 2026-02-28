"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ApplicantsPage() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        category: "GM",
        entryType: "Regular",
        quotaType: "KCET",
        marks: "",
        allotmentNumber: "",
    });

    const loadApplicants = async () => {
        try {
            const res = await fetch("/api/applicants");
            const data = await res.json();
            setApplicants(data);
        } catch (e) { console.error(e) }
    };

    useEffect(() => { loadApplicants(); }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload: any = { ...formData };
        if (payload.marks === "") {
            delete payload.marks;
        } else {
            payload.marks = Number(payload.marks);
        }

        const res = await fetch("/api/applicants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            toast.success("Applicant saved successfully!");
            setFormData({
                firstName: "", lastName: "", category: "GM",
                entryType: "Regular", quotaType: "KCET", marks: "", allotmentNumber: "",
            });
            loadApplicants();
        } else {
            const errData = await res.json();
            toast.error("Error: " + (errData.error || "Failed to create applicant"));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Applicant Management</h1>
                <p className="text-gray-500 mt-2">Register new applicants and view existing ones.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 style={{ color: "black" }} className="text-lg font-semibold border-b pb-3 mb-4">New Applicant</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="GM">GM</option><option value="SC">SC</option><option value="ST">ST</option><option value="OBC">OBC</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Entry Type</label>
                                <select name="entryType" value={formData.entryType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="Regular">Regular</option><option value="Lateral">Lateral</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quota</label>
                            <select name="quotaType" value={formData.quotaType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                <option value="KCET">KCET</option><option value="COMEDK">COMEDK</option><option value="Management">Management</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marks (%)</label>
                                <input type="number" name="marks" value={formData.marks} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Allotment No</label>
                                <input type="text" name="allotmentNumber" placeholder="If Govt route" value={formData.allotmentNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition mt-4">
                            Register Applicant
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Applicants</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{applicants.length} Total</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Quota</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((a: any) => (
                                    <tr key={a._id} className="bg-white border-b hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{a.firstName} {a.lastName}</td>
                                        <td className="px-6 py-4">{a.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${a.quotaType === 'KCET' ? 'bg-blue-100 text-blue-800' :
                                                    a.quotaType === 'COMEDK' ? 'bg-indigo-100 text-indigo-800' :
                                                        'bg-emerald-100 text-emerald-800'}`}>
                                                {a.quotaType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-xs text-gray-500">Doc: {a.documentStatus}</span>
                                                <span className="text-xs text-gray-500">Fee: {a.feeStatus}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {applicants.length === 0 && (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No applicants found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
