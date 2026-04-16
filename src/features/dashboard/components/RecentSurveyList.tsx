import { MoreHorizontal } from 'lucide-react';

const surveys = [
    {
        id: 1,
        title: 'User Journey Exploration',
        status: 'Active',
        description: 'This survey aims to understand the user experience throughout their journey on our platform. We want to gather insights on how users navigate our website/app, identify pain points, and discover opportunities for improvement.',
        author: 'Taslim Yusuf',
        responses: '83 / 50',
        date: '14 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Indra+Lesmana&background=random'
    },
    {
        id: 2,
        title: 'Usability and User Interface Evaluation',
        status: 'Inactive',
        description: 'We strive to create a seamless user experience. By participating in this survey, you can provide valuable insights on the usability and effectiveness of our user interface. Your feedback will guide us in making improvements that enhance your overall experience',
        author: 'Indra Lesmana',
        responses: '3 / 10',
        date: '18 Feb 2024',
        userImage: 'https://ui-avatars.com/api/?name=Indra+Lesmana&background=random'
    }
];

const RecentSurveyList = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Survey</h2>

            {surveys.map((survey) => (
                <div key={survey.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-gray-900 text-lg">{survey.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${survey.status === 'Active'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                ● {survey.status}
                            </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                        {survey.description}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <img src={survey.userImage} alt={survey.author} className="w-5 h-5 rounded-full" />
                                <span>{survey.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {survey.responses}
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {survey.date}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="px-4 py-1.5 cursor-pointer rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                Manage
                            </button>
                            <button className="px-4 py-1.5 cursor-pointer rounded-full bg-black text-white text-sm font-medium hover:bg-gray-950 transition-colors border border-transparent shadow-sm">
                                Result
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentSurveyList;
