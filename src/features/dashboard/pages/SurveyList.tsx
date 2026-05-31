import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search surveys..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm"
                        />
                    </div>

                    <button className="bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                        <Bell size={20} />
                    </button>

                    <button 
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-accent-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-700 active:bg-accent-800 shadow-sm shadow-accent-600/10 transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                        <Plus size={16} />
                        Create Survey
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">All Surveys</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveys.map((survey) => (
                    <Link to={`/dashboard/survey/${survey.id}`} key={survey.id} className="block group">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm hover:shadow-md hover:border-accent-200 dark:hover:border-accent-800/30 transition-all h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                                    survey.status === 'Active'
                                        ? 'bg-green-50 dark:bg-emerald-950/30 text-green-600 dark:text-emerald-400 border-green-100 dark:border-emerald-900/30'
                                        : survey.status === 'Draft'
                                            ? 'bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-transparent'
                                            : 'bg-red-50 dark:bg-rose-950/30 text-red-500 dark:text-rose-400 border-red-100 dark:border-rose-900/30'
                                    }`}>
                                    {survey.status}
                                </span>
                                <div className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                                    {survey.date}
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                {survey.title}
                            </h3>

                            <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 flex-1">
                                {survey.description}
                            </p>

                            <div className="pt-4 border-t border-gray-50 dark:border-slate-900 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={survey.userImage} alt={survey.author} className="w-6 h-6 rounded-full" />
                                    <span className="text-xs font-medium text-gray-600 dark:text-slate-400">{survey.author}</span>
                                </div>
                                <div className="text-xs font-medium text-gray-500 dark:text-slate-400">
                                    <span className="text-gray-900 dark:text-slate-200 font-semibold">{survey.responses}</span>
                                    {survey.total > 0 && <span className="text-gray-400 dark:text-slate-600">/{survey.total}</span>} Responses
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="dark:bg-slate-950 dark:border-slate-900">
                    <DialogHeader>
                        <DialogTitle className="dark:text-slate-100">Create New Survey</DialogTitle>
                        <DialogDescription className="dark:text-slate-400">
                            Create a new survey to gather feedback from your participants.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-900 dark:text-slate-200">Survey Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter survey title"
                                    className="w-full mt-2 px-4 py-2 border border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-900 dark:text-slate-200">Description</label>
                                <textarea
                                    placeholder="Enter survey description"
                                    className="w-full mt-2 px-4 py-2 border border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        {/* Secondary Button / Cancel */}
                        <Button 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                            className="border-accent-300 dark:border-accent-800/60 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/20 active:bg-accent-100 dark:active:bg-accent-900/30 transition-all font-semibold rounded-lg"
                        >
                            Cancel
                        </Button>
                        {/* Primary Button / Create */}
                        <Button 
                            className="bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white font-semibold shadow-sm transition-all duration-200 rounded-lg"
                        >
                            Create Survey
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SurveyList;

