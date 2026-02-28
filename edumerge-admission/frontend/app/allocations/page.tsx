"use client";

import { useState, useEffect } from "react";

export default function AllocationsPage() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        applicantId: "",
        programId: "",
        quotaType: "KCET",
    });
    const [message, setMessage] = useState<{ type: "success" | "error" | "", text: string }>({ type: "", text: "" });

    useEffect(() => {
        fetch("/api/programs").then(res => res.json()).then(data => setPrograms(Array.isArray(data) ? data : []));
        fetch("/api/applicants").then(res => res.json()).then(data => setApplicants(Array.isArray(data) ? data : []));
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage({ type: "", text: "Allocating..." });

        try {
            const res = await fetch("/api/allocations/allocate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ type: "success", text: "✅ Seat allocated successfully!" });
            } else {
                setMessage({ type: "error", text: "❌ " + (data.error || "Unknown error") });
            }
        } catch (e: any) {
            setMessage({ type: "error", text: "❌ " + e.message });
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Seat Allocation</h1>
                <p className="text-gray-500 mt-2">Allocate available seats to applicants based on their quota.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Applicant</label>
                        <select name="applicantId" value={formData.applicantId} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                            <option value="">-- Choose Applicant --</option>
                            {applicants.map((a: any) => (
                                <option key={a._id} value={a._id}>{a.firstName} {a.lastName} ({a.quotaType})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Program</label>
                        <select name="programId" value={formData.programId} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                            <option value="">-- Choose Program --</option>
                            {programs.map((p: any) => (
                                <option key={p._id} value={p._id}>{p.name} ({p.academicYear})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Quota Category</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['KCET', 'COMEDK', 'Management'].map((q) => (
                                <label key={q} className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${formData.quotaType === q ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}>
                                    <input type="radio" name="quotaType" value={q} checked={formData.quotaType === q} onChange={handleChange} className="hidden" />
                                    <span className="font-medium">{q}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-md mt-4">
                        Allocate Seat
                    </button>

                    {message.text && (
                        <div className={`p-4 rounded-xl flex items-center justify-center font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
