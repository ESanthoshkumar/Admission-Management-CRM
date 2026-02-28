"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function MasterSetupPage() {
    const [data, setData] = useState<any>({ institutions: [], campuses: [], departments: [] });
    const [loading, setLoading] = useState(true);

    // Form states
    const [instName, setInstName] = useState("");
    const [instCode, setInstCode] = useState("");

    const [campusName, setCampusName] = useState("");
    const [campusInstId, setCampusInstId] = useState("");

    const [deptName, setDeptName] = useState("");
    const [deptCampusId, setDeptCampusId] = useState("");

    const [progForm, setProgForm] = useState({
        name: "", academicYear: "2026", courseType: "UG", entryType: "Regular", admissionMode: "Government",
        departmentId: "", totalIntake: 100, kcet: 40, comedk: 30, management: 30, supernumerary: 5
    });

    const loadData = async () => {
        try {
            const res = await fetch("/api/setup");
            const json = await res.json();
            setData(json);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleCreateInst = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/setup/institution", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: instName, code: instCode }) });
        if (res.ok) toast.success("Institution saved!");
        setInstName(""); setInstCode(""); loadData();
    };

    const handleCreateCampus = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/setup/campus", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: campusName, institutionId: campusInstId }) });
        if (res.ok) toast.success("Campus saved!");
        setCampusName(""); setCampusInstId(""); loadData();
    };

    const handleCreateDept = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/setup/department", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: deptName, campusId: deptCampusId }) });
        if (res.ok) toast.success("Department saved!");
        setDeptName(""); setDeptCampusId(""); loadData();
    };

    const handleCreateProg = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/programs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(progForm) });
        if (res.ok) {
            toast.success("Program and Seat Matrix Created!");
            setProgForm({
                name: "", academicYear: "2026", courseType: "UG", entryType: "Regular", admissionMode: "Government",
                departmentId: "", totalIntake: 100, kcet: 40, comedk: 30, management: 30, supernumerary: 5
            });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Master Setup</h1>
                <p className="text-gray-500 mt-2">Configure institutions, campuses, departments, programs, and seat quotas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Institution Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 style={{ color: "black" }} className="text-lg font-semibold border-b pb-3 mb-4">1. Create Institution</h3>
                    <form onSubmit={handleCreateInst} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" value={instName} onChange={e => setInstName(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                            <input type="text" value={instCode} onChange={e => setInstCode(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-medium py-2 rounded-lg hover:bg-slate-800 transition">Save Institution</button>
                    </form>
                    <div className="mt-4 text-sm text-gray-500">Existing: {data.institutions.length}</div>
                </div>

                {/* Campus Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 style={{ color: "black" }} className="text-lg font-semibold border-b pb-3 mb-4">2. Create Campus</h3>
                    <form onSubmit={handleCreateCampus} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Institution</label>
                            <select value={campusInstId} onChange={e => setCampusInstId(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Select --</option>
                                {data.institutions.map((i: any) => <option key={i._id} value={i._id}>{i.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Campus Name</label>
                            <input type="text" value={campusName} onChange={e => setCampusName(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-medium py-2 rounded-lg hover:bg-slate-800 transition">Save Campus</button>
                    </form>
                </div>

                {/* Department Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 style={{ color: "black" }} className="text-lg font-semibold border-b pb-3 mb-4">3. Create Department</h3>
                    <form onSubmit={handleCreateDept} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Campus</label>
                            <select value={deptCampusId} onChange={e => setDeptCampusId(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Select --</option>
                                {data.campuses.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                            <input type="text" value={deptName} onChange={e => setDeptName(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-medium py-2 rounded-lg hover:bg-slate-800 transition">Save Department</button>
                    </form>
                </div>

            </div>

            {/* Program & Quota Setup */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h3 style={{ color: "black" }} className="text-xl font-semibold border-b pb-4 mb-6">4. Program & Quota Matrix Setup</h3>
                <form onSubmit={handleCreateProg} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select value={progForm.departmentId} onChange={e => setProgForm({ ...progForm, departmentId: e.target.value })} required className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option value="">-- Select --</option>
                            {data.departments.map((d: any) => <option key={d._id} value={d._id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                        <input type="text" value={progForm.name} onChange={e => setProgForm({ ...progForm, name: e.target.value })} required placeholder="e.g. B.Tech Computer Science" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                        <input type="text" value={progForm.academicYear} onChange={e => setProgForm({ ...progForm, academicYear: e.target.value })} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Intake</label>
                        <input type="number" value={progForm.totalIntake} onChange={e => setProgForm({ ...progForm, totalIntake: Number(e.target.value) })} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">KCET Quota</label>
                        <input type="number" value={progForm.kcet} onChange={e => setProgForm({ ...progForm, kcet: Number(e.target.value) })} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">COMEDK Quota</label>
                        <input type="number" value={progForm.comedk} onChange={e => setProgForm({ ...progForm, comedk: Number(e.target.value) })} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Management Quota</label>
                        <input type="number" value={progForm.management} onChange={e => setProgForm({ ...progForm, management: Number(e.target.value) })} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>
                    <div className="md:col-span-2 flex items-end">
                        <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">Save Program & Quotas</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
