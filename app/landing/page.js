import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-800">Enterprise Builder</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#benefits" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Benefits</a>
                <a href="#pricing" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#docs" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Docs</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </Link>
              <Link href="/" className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
            Build Enterprise Apps in Minutes
          </h1>
          <p className="text-xl text-indigo-700 mb-8 max-w-3xl mx-auto">
            AI-Native Enterprise Application Development Platform - 
            Design, build, and deploy applications faster with AI assistance and visual tools
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              Start Building Free
            </Link>
            <Link href="#demo" className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              See Demo
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-4 max-w-md">
              <img 
                src="https://via.placeholder.com/600x400/f3f4f6/6b7280?text=App+Builder+Demo"
                alt="App Builder Demo"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-indigo-600">Everything you need to build enterprise applications faster</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Visual App Builder',
                description: 'Drag-and-drop interface for rapid application development without coding',
                link: '#'
              },
              {
                icon: '🤖',
                title: 'AI Code Generation',
                description: 'Generate backend and frontend code using advanced AI models',
                link: '#'
              },
              {
                icon: '🛡️',
                title: 'Enterprise Governance',
                description: 'Complete RBAC, audit trails, and compliance management',
                link: '#'
              },
              {
                icon: '🏢',
                title: 'Multi-Tenant Architecture',
                description: 'Support for multiple organizations with resource isolation',
                link: '#'
              },
              {
                icon: '🔧',
                title: 'Extensible Architecture',
                description: 'Modular design for easy integration with external services',
                link: '#'
              },
              {
                icon: '⚡',
                title: 'Rapid Deployment',
                description: 'Deploy applications with one click to any environment',
                link: '#'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-3">{feature.title}</h3>
                <p className="text-indigo-700 mb-4">{feature.description}</p>
                <a href={feature.link} className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-indigo-600">Transform your application development process</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">10x Faster Development</h3>
                    <p className="text-indigo-700">Build applications in days instead of months with our visual builder and AI assistance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Reduce Costs by 70%</h3>
                    <p className="text-indigo-700">Eliminate expensive development teams and infrastructure costs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Enterprise-Grade Security</h3>
                    <p className="text-indigo-700">Built-in governance, compliance, and audit trails for enterprise requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Team Collaboration</h3>
                    <p className="text-indigo-700">Multi-tenant architecture with role-based access for seamless teamwork</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6">Perfect for Every Team</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Startups</h4>
                  <p className="text-indigo-700">Launch MVPs in days, not months. Focus on your business, not infrastructure.</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Enterprises</h4>
                  <p className="text-indigo-700">Enterprise governance, security, and scalability for large organizations.</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Agencies</h4>
                  <p className="text-indigo-700">Build client applications faster with reusable components and templates.</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Developers</h4>
                  <p className="text-indigo-700">AI-assisted development with visual tools and code generation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Next App?</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join thousands of developers and businesses building applications faster with AI-Native Enterprise App Builder
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/" className="bg-white text-indigo-800 hover:bg-indigo-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              Start Building Free
            </Link>
            <Link href="#contact" className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Loved by Developers</h2>
            <p className="text-xl text-indigo-600">What our users are saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform transformed our development process. We built a complete enterprise app in just 2 weeks!",
                name: "Sarah Johnson",
                title: "CTO, TechStart Inc.",
                avatar: "👩💻"
              },
              {
                quote: "The AI code generation saved us hundreds of hours. It's like having an extra developer on the team.",
                name: "Michael Chen",
                title: "Lead Developer, DataCorp",
                avatar: "👨💻"
              },
              {
                quote: "Enterprise governance features made compliance a breeze. Our security team loves it!",
                name: "Emily Rodriguez",
                title: "Security Architect, SecureBank",
                avatar: "👩🔒"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                </div>
                <blockquote className="text-indigo-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-indigo-900">{testimonial.name}</div>
                  <div className="text-sm text-indigo-600">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-indigo-600">No hidden fees, no surprises</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">Free</h3>
              <p className="text-indigo-600 mb-4">Perfect for getting started</p>
              <div className="text-4xl font-bold text-indigo-900 mb-6">$0<span className="text-lg font-normal text-indigo-600">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Up to 3 applications</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Basic components</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">AI code generation (limited)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Community support</span>
                </li>
              </ul>
              <Link href="/" className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">Pro</h3>
              <p className="text-indigo-600 mb-4">For growing businesses</p>
              <div className="text-4xl font-bold text-indigo-900 mb-2">$49<span className="text-lg font-normal text-indigo-600">/month</span></div>
              <p className="text-sm text-indigo-600 mb-6">or $490/year (2 months free)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Unlimited applications</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">All premium components</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Unlimited AI generation</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Advanced governance</span>
                </li>
              </ul>
              <Link href="/" className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">Enterprise</h3>
              <p className="text-indigo-600 mb-4">For large organizations</p>
              <div className="text-4xl font-bold text-indigo-900 mb-2">Custom</div>
              <p className="text-sm text-indigo-600 mb-6">Tailored to your needs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Everything in Pro, plus:</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">24/7 premium support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">SLA guarantees</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-indigo-700">On-premise options</span>
                </li>
              </ul>
              <Link href="#contact" className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-indigo-600">Get answers to common questions</p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "What is AI-Native Enterprise App Builder?",
                answer: "It's a comprehensive platform that combines visual app building, AI-assisted development, and enterprise governance to help you build applications 10x faster with built-in security and compliance."
              },
              {
                question: "Do I need coding experience?",
                answer: "No! Our visual builder allows you to create applications without writing code. However, developers can also use our AI code generation and extend functionality with custom code."
              },
              {
                question: "How secure is the platform?",
                answer: "Security is our top priority. We provide enterprise-grade security with role-based access control, audit trails, data encryption, and compliance with major standards like GDPR and SOC 2."
              },
              {
                question: "Can I integrate with existing systems?",
                answer: "Yes! Our platform supports REST APIs, webhooks, and has a modular architecture that makes it easy to integrate with your existing systems and services."
              },
              {
                question: "What support options are available?",
                answer: "We offer community support for free users, priority support for Pro users, and 24/7 premium support with dedicated account managers for Enterprise customers."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! You can sign up for our Free plan to try the platform with no credit card required. For Pro plan, we offer a 14-day free trial."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-indigo-200 rounded-lg">
                <button className="w-full text-left p-4 font-semibold text-indigo-900 hover:bg-indigo-50 transition-colors">
                  {faq.question}
                </button>
                <div className="p-4 pt-0 text-indigo-700">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-indigo-600">We'd love to hear from you</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-indigo-700 mb-1">
                  Company (optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-indigo-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold">Enterprise Builder</span>
              </div>
              <p className="text-indigo-300 mb-4">
                Build enterprise applications faster with AI-powered development tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <span>🐦</span>
                </a>
                <a href="#" className="text-indigo-300 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <span>💻</span>
                </a>
                <a href="#" className="text-indigo-300 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <span>🔗</span>
                </a>
                <a href="#" className="text-indigo-300 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <span>📺</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-indigo-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-indigo-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Changelog</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Partners</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Security</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">GDPR</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-400">
            <p>© {new Date().getFullYear()} AI-Native Enterprise App Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}