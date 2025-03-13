"use client"
import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    interface FAQItem {
        question: string;
        answer: string;
    }

    const toggleFAQ = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { question: "How can I pay for my appointment?", answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?" },
        { question: "Is the cost of the appointment covered by private health insurance?", answer: "Yes, depending on your provider, some costs may be covered." },
        { question: "Do I need a referral?", answer: "In most cases, a referral is not required, but it may be beneficial." },
        { question: "What are your opening hours?", answer: "We are open from 9 AM to 6 PM, Monday to Friday." },
        { question: "What can I expect at my first consultation?", answer: "Your first consultation will involve a thorough assessment and discussion of your needs." },
    ];

    return (
        <section className="bg-white">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">
                    Frequently Asked Questions
                </h1>

                <div className="mt-8 space-y-8">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 border-gray-100 rounded-lg">
                            <button
                                className="flex items-center justify-between w-full p-6"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h1 className="font-semibold text-gray-700">{faq.question}</h1>

                                <span className="text-gray-700 bg-gray-200 rounded-full p-2">
                                    {openIndex === index ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    )}
                                </span>
                            </button>

                            {openIndex === index && (
                                <p className="p-6 text-sm text-gray-500">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
