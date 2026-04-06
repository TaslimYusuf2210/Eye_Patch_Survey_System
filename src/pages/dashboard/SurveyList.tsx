import { Link } from 'react-router-dom';
import { Search, Bell, ChevronRight, Plus } from 'lucide-react';

const surveys = [
    {
        id: 1,
        title: 'User Journey Exploration',
        status: 'Active',
        description: 'This survey aims to understand the user experience throughout their journey on our platform.',
        author: 'Indra Lesmana',
        responses: 83,
        total: 50,
        date: '14 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Indra+Lesmana&background=random'
    },
    {
        id: 2,
        title: 'Usability and User Interface Evaluation',
        status: 'Inactive',
        description: 'We strive to create a seamless user experience. By participating in this survey, you can provide valuable insights.',
        author: 'Indra Lesmana',
        responses: 3,
        total: 10,
        date: '18 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Indra+Lesmana&background=random'
    },
    {
        id: 3,
        title: 'Product Feedback Survey',
        status: 'Active',
        description: 'Gathering feedback on the latest product features to prioritize future development.',
        author: 'Sarah Johnson',
        responses: 45,
        total: 100,
        date: '20 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random'
    },
    {
        id: 4,
        title: 'Customer Satisfaction Score',
        status: 'Draft',
        description: 'Quarterly CSAT survey to measure customer happiness and identify areas for improvement.',
        author: 'Mike Chen',
        responses: 0,
        total: 0,
        date: '22 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Mike+Chen&background=random'
    }
];

const SurveyList = () => {
    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Dashboard</span>
                    <ChevronRight size={16} />
                    <span className="font-medium text-black">Survey</span>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search surveys..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all text-sm"
                        />
                    </div>

                    <button className="bg-white p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                        <Bell size={20} />
                    </button>

                    <button className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 transition-all whitespace-nowrap flex items-center gap-2">
                        <Plus size={16} />
                        Create Survey
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-6">All Surveys</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveys.map((survey) => (
                    <Link to={`/dashboard/survey/${survey.id}`} key={survey.id} className="block group">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${survey.status === 'Active'
                                        ? 'bg-green-100 text-green-600'
                                        : survey.status === 'Draft'
                                            ? 'bg-gray-100 text-gray-500'
                                            : 'bg-red-100 text-red-500'
                                    }`}>
                                    {survey.status}
                                </span>
                                <div className="text-xs text-gray-400 font-medium">
                                    {survey.date}
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-black transition-colors">
                                {survey.title}
                            </h3>

                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                                {survey.description}
                            </p>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={survey.userImage} alt={survey.author} className="w-6 h-6 rounded-full" />
                                    <span className="text-xs font-medium text-gray-600">{survey.author}</span>
                                </div>
                                <div className="text-xs font-medium text-gray-500">
                                    <span className="text-black font-semibold">{survey.responses}</span>
                                    {survey.total > 0 && <span className="text-gray-400">/{survey.total}</span>} Responses
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SurveyList;
