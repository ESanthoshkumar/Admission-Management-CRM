"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ConfirmationsPage() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplicants = async () => {
        try {
            const res = await fetch("/api/applicants");
            const data = await res.json();
            // Only show those who are not confirmed (or all, but we can filter)
            setApplicants(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (e) { console.error(e) }
    };

    useEffect(() => { fetchApplicants(); }, []);

    const updateStatus = async (id: string, field: string, value: string) => {
        await fetch(`/api/applicants/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: value })
        });
        fetchApplicants();
    };

    const confirmAdmission = async (id: string) => {
        const res = await fetch("/api/admissions/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ applicantId: id })
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Success! Admission Number: " + data.admissionNumber);
            fetchApplicants();
        } else {
            toast.error("Error: " + data.error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Confirmations & Document Verification</h1>
                <p className="text-gray-500 mt-2">Manage document verification, fee collection, and generate admission numbers.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4">Applicant</th>
                                <th className="px-6 py-4">Document Status</th>
                                <th className="px-6 py-4">Fee Status</th>
                                <th className="px-6 py-4">Admission #</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((a: any) => (
                                <tr key={a._id} className="bg-white border-b hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{a.firstName} {a.lastName}</div>
                                        <div className="text-xs text-gray-500">{a.quotaType}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select value={a.documentStatus} onChange={e => updateStatus(a._id, 'documentStatus', e.target.value)}
                                            className={`text-sm rounded-lg px-2 py-1 border ${a.documentStatus === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            <option value="Pending">Pending</option>
                                            <option value="Submitted">Submitted</option>
                                            <option value="Verified">Verified</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select value={a.feeStatus} onChange={e => updateStatus(a._id, 'feeStatus', e.target.value)}
                                            className={`text-sm rounded-lg px-2 py-1 border ${a.feeStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                            <option value="Pending">Pending</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-600">
                                        {a.admissionNumber || 'Not Generated'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => confirmAdmission(a._id)}
                                            disabled={!!a.admissionNumber || a.feeStatus !== 'Paid'}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${a.admissionNumber ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                                a.feeStatus !== 'Paid' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                                    'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'}`}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
