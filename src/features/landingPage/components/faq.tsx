

const faqData = [
  {
    "question": "How quickly can I start using your solutions?",
    "answer": "Our survey solutions are easy to implement and can be up and running in just a few days, depending on your team size, number of surveys, and system integration needs."
  },
  {
    "question": "Which types of surveys and channels are supported?",
    "answer": "Our platform supports a wide range of survey types including customer satisfaction (CSAT), Net Promoter Score (NPS), employee feedback, market research, product feedback, and more — delivered via web forms, email, mobile, QR codes, and embedded widgets."
  },
  {
    "question": "Can I integrate your survey system with existing tools and software?",
    "answer": "Yes, our solutions are designed to integrate seamlessly with most CRMs, helpdesks, marketing automation platforms, analytics tools, and custom databases (Zapier, API, webhooks, and native integrations available)."
  },
  {
    "question": "How can I access and analyze my survey data?",
    "answer": "You can access your survey results in real-time through our intuitive dashboard, customizable reports, live analytics, and mobile app — available 24/7 from any device."
  },
  {
    "question": "Do you provide technical support?",
    "answer": "Yes, we offer comprehensive technical support via email, live chat, and phone during business hours, plus a rich help center and onboarding assistance for all customers."
  },
  {
    "question": "How do your solutions help improve insights and decision-making?",
    "answer": "Our platform helps you collect high-quality feedback faster, uncover trends with powerful analytics, segment responses, visualize data with charts & dashboards, and turn insights into actionable improvements — ultimately driving better customer experience, retention, and growth."
  },
  {
    "question": "Is my survey data secure?",
    "answer": "Yes, we take data security seriously. We use industry-standard encryption (TLS), GDPR & CCPA compliance, secure data storage, role-based access control, and regular security audits to protect your data and your respondents’ privacy."
  },
  {
    "question": "Do you offer a free trial?",
    "answer": "Yes, we offer a 14-day free trial with full access to all features — no credit card required to get started."
  }
]

function FrequentlyAskedQuestion() {
  return (
    <div id="faq" className="flex flex-col lg:flex-row gap-10 px-4 md:px-10 lg:px-20 py-20 container mx-auto">
      <div className="space-y-6 w-full lg:w-1/2">
        <h2 className="font-semibold text-4xl lg:text-3xl font-zalando-expanded leading-tight">
          Frequently <br /> Asked <br /> Questions.
        </h2>
        <p className="font-poppins text-gray-600 mt-4">Didn't find an answer to your question? <br /> Contact us at <a href="mailto:taslimyusuf777@gmail.com" className="font-medium text-black underline">taslimyusuf777@gmail.com</a>, <br /> and we'll be happy to help!</p>
      </div>
      <div className="font-poppins w-full lg:w-1/2">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="flex items-start group gap-5 mt-6 border-b border-gray-200 pb-6 last:border-0"
          >
            <span className="shrink-0 font-medium text-xl group-hover:text-black transition-colors ">
              +
            </span>
            <div className="w-full">
              <h3
                className="text-lg font-medium cursor-pointer group-hover:text-gray-900 transition-colors">{item.question}</h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                <p className="text-sm text-gray-600 overflow-hidden leading-relaxed mt-0 group-hover:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrequentlyAskedQuestion;