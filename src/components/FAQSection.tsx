"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of cleaning products does Kleanja offer?",
    answer:
      "Kleanja offers a complete range of cleaning and hygiene solutions including floor cleaners, toilet cleaners, glass cleaners, dishwashing liquids, hand hygiene products, and phenyl & disinfectants for residential, commercial, and industrial use.",
  },
  {
    question: "Do you provide bulk orders for businesses and institutions?",
    answer:
      "Yes. We supply hotels, hospitals, schools, offices, industries, and distributors with customized bulk packaging and competitive pricing through our dedicated B2B program.",
  },
  {
    question: "Can Kleanja products be customized under a private label?",
    answer:
      "Absolutely. We offer OEM and private labeling services for businesses looking to launch or expand their own cleaning product brand.",
  },
  {
    question: "Are Kleanja products safe for everyday use?",
    answer:
      "Yes. Our products are formulated to deliver effective cleaning while being safe for regular use when used according to the instructions provided on the packaging.",
  },
  {
    question: "How can I request a quotation or become a distributor?",
    answer:
      "Simply visit our Contact or B2B page and submit your inquiry. Our team will get back to you with pricing, product catalogs, and partnership opportunities.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-intro">
            <h2 className="faq-heading">Frequently asked questions</h2>
            <p className="faq-lead">
              Have questions about our cleaning solutions, bulk supply, or
              partnerships? Find clear answers to the most common inquiries
              from our customers and business partners.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <div key={faq.question} className="faq-item">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActive(isOpen ? null : index)}
                    className="faq-trigger"
                  >
                    <span className="faq-question">{faq.question}</span>
                    <motion.span
                      className="faq-chevron"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown size={20} strokeWidth={1.75} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          background: var(--warm-white);
          padding: 96px 0;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: 64px 80px;
          align-items: start;
        }

        .faq-heading {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--black);
          margin-bottom: 20px;
        }

        .faq-lead {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.75;
          color: var(--gray-600);
          max-width: 340px;
          margin: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .faq-item:hover {
          border-color: var(--ds-color-surface-accent);
          box-shadow: 0 4px 16px rgba(3, 103, 166, 0.06);
        }

        .faq-trigger {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
          padding: 24px 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .faq-question {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
          color: var(--black);
        }

        .faq-chevron {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          color: var(--gray-400);
        }

        .faq-answer {
          padding: 0 28px 24px;
        }

        .faq-answer p {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.75;
          color: var(--gray-400);
          margin: 0;
          max-width: 92%;
        }

        @media (max-width: 1024px) {
          .faq-section {
            padding: 72px 0;
          }

          .faq-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .faq-lead {
            max-width: 520px;
          }
        }

        @media (max-width: 640px) {
          .faq-section {
            padding: 60px 0;
          }

          .faq-trigger {
            padding: 20px;
            gap: 16px;
          }

          .faq-answer {
            padding: 0 20px 20px;
          }

          .faq-answer p {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
