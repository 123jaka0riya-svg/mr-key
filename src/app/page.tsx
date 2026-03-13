"use client";

import { useState } from "react";

export default function Home() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      title: "Licensing & Users",
      description: "Create and manage user licenses with flexible expiration, trial, and subscription options.",
      icon: "🔑",
    },
    {
      title: "Lightning Fast Connections",
      description: "Our lightning-fast infrastructure ensures your authentication requests are processed in under 50ms globally.",
      icon: "⚡",
    },
    {
      title: "Access Anywhere",
      description: "Manage your applications remotely with our powerful Seller API. Update licenses, ban users, modify subscriptions.",
      icon: "🌍",
    },
    {
      title: "Global Infrastructure",
      description: "Built on a serverless architecture that automatically scales to handle millions of requests.",
      icon: "🌐",
    },
    {
      title: "Analytics",
      description: "Track usage, monitor performance, and understand your users with comprehensive analytics.",
      icon: "📊",
    },
  ];

  const stats = [
    { value: "200k+", label: "Accounts" },
    { value: "200k+", label: "Applications" },
    { value: "6M+", label: "Licenses" },
  ];

  const pricing = [
    {
      name: "Tester",
      price: "Free",
      period: "",
      features: [
        "10 Users",
        "All Auth Methods",
        "Token System",
        "Hash Checks",
        "Client Two Factor Authentication",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Developer",
      price: isYearly ? "$1.79" : "$2.99",
      period: "/month",
      features: [
        "Everything in Tester +",
        "10,000 Users",
        "Team Management",
        "Customer Panel",
        "Function Management",
      ],
      cta: "Choose Developer",
      popular: true,
    },
    {
      name: "Seller",
      price: isYearly ? "$2.99" : "$4.99",
      period: "/month",
      features: [
        "Everything in Developer +",
        "Chatrooms",
        "Discord Bot",
        "Telegram Bot",
        "Seller API",
      ],
      cta: "Choose Seller",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How fast can I get started?",
      answer: "Sign up and integrate authentication into your app in minutes. We provide SDKs, comprehensive documentation, and live support to help you get started quickly.",
    },
    {
      question: "Is there a free plan?",
      answer: "Yes! Our tester plan allows you to add up to 10 users completely free. You can even try our demo accounts before you purchase to see if KeyAuth is right for you.",
    },
    {
      question: "Why so cheap?",
      answer: "We at KeyAuth believe everyone should have access to a secure and reliable authentication system for their applications without breaking the bank. Our mission is to make enterprise-grade security affordable for developers of all sizes.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#121218] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121218]/90 backdrop-blur-md border-b border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MR Key</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#mobile" className="text-gray-300 hover:text-white transition">Mobile</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-gray-300 hover:text-white transition">Log in</a>
              <a href="/register" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Authentication
            </span>
            <br />made for everyone!
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Secure, scalable, and game-changing authentication for your applications. 
            Get started in minutes with our powerful APIs and SDKs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-lg font-semibold transition hover:shadow-lg hover:shadow-indigo-500/25">
              Start for free
            </a>
            <a href="/docs" className="px-8 py-4 bg-[#2a2a3a] hover:bg-[#3a3a4a] rounded-lg text-lg font-semibold transition border border-[#3a3a4a]">
              View Documentation
            </a>
          </div>
          <div className="mt-16">
            <div className="relative rounded-xl overflow-hidden border border-[#2a2a3a] bg-[#1a1a22]">
              <div className="aspect-video flex items-center justify-center text-gray-400">
                <span className="text-2xl">[Dashboard Preview]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#18181f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Everything you need to succeed.</h2>
          <p className="text-gray-400 text-center mb-16">A comprehensive suite of integrated tools for authentication, monetization, and user engagement.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-[#1a1a22] rounded-xl border border-[#2a2a3a] hover:border-indigo-500/50 transition group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-indigo-400 transition">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Numbers don&apos;t lie.</h2>
          <p className="text-gray-400 text-center mb-12">
            There&apos;s no question as to why we are the best choice for your business.
          </p>
          <div className="flex justify-center gap-16 flex-wrap">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#18181f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Get Started in 3 Steps.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Register an Account</h3>
              <p className="text-gray-400">Head over to our register page to create your account.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Create an Application</h3>
              <p className="text-gray-400">Applications will be the heart of your service.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Integrate our API</h3>
              <p className="text-gray-400">Follow our docs and have auth up in less than 5 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Mobile App Available Now!</h2>
          <p className="text-gray-400 text-center mb-12">
            Control your application from anywhere using our mobile app.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
            <div className="w-48 h-80 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center">
              <span className="text-white/70">[Mobile Mockup]</span>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="px-6 py-3 bg-[#2a2a3a] rounded-xl flex items-center gap-3 hover:bg-[#3a3a4a] transition w-fit">
                <span className="text-2xl">🍎</span>
                <span>App Store</span>
              </a>
              <a href="#" className="px-6 py-3 bg-[#2a2a3a] rounded-xl flex items-center gap-3 hover:bg-[#3a3a4a] transition w-fit">
                <span className="text-2xl">▶</span>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-[#18181f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Perfect plans for your needs.</h2>
          <p className="text-gray-400 text-center mb-8">Flexible options for teams of all sizes.</p>
          
          <div className="flex justify-center items-center gap-4 mb-12">
            <span className={!isYearly ? "text-white" : "text-gray-500"}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className={`w-14 h-8 rounded-full transition ${isYearly ? "bg-indigo-500" : "bg-[#2a2a3a]"}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition ${isYearly ? "translate-x-7" : "translate-x-1"}`} />
            </button>
            <span className={isYearly ? "text-white" : "text-gray-500"}>
              Yearly <span className="text-cyan-400 text-sm">save 60%</span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border transition relative ${
                  plan.popular 
                    ? "bg-[#1a1a22] border-indigo-500 shadow-lg shadow-indigo-500/10" 
                    : "bg-[#1a1a22] border-[#2a2a3a] hover:border-indigo-500/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <span className="text-cyan-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href="/register"
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    plan.popular 
                      ? "bg-indigo-500 hover:bg-indigo-600" 
                      : "bg-[#2a2a3a] hover:bg-[#3a3a4a]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8">
            All yearly plans include a 14-day money-back guarantee. No credit card required for free plan.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#2a2a3a] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between bg-[#1a1a22] hover:bg-[#222230] transition"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className={`transform transition ${openFaq === index ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-[#18181f] text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MR Key</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Support</a>
            </div>
            <div className="text-gray-500">
              © 2026 MR Key. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}