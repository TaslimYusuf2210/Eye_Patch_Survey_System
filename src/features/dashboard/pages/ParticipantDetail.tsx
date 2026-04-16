import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, Edit2, Trash2 } from 'lucide-react';

const ParticipantDetail = () => {

    const handleFeatureComingSoon = () => {
        alert("Feature coming soon");
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/dashboard/participant" className="hover:text-black flex items-center gap-1">
                        <ChevronLeft size={16} />
                        Back to List
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleFeatureComingSoon}
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Participant"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={handleFeatureComingSoon}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Participant"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">[Participant Name]</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-4">Contact Info</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-900 text-sm">email@example.com</p>
                            </div>
                        </div>
                        <button
                            onClick={handleFeatureComingSoon}
                            className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Send Email
                        </button>
                    </div>
                </div>

                {/* Participation History */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                    <h2 className="font-bold text-gray-900 mb-4">Participation History</h2>
                    <div className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        No history available yet.
                    </div>
                </div>

                {/* Attributes */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-3">
                    <h2 className="font-bold text-gray-900 mb-4">Attributes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <p className="font-medium text-gray-900">Active</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Joined Date</p>
                            <p className="font-medium text-gray-900">Feb 16, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParticipantDetail;
