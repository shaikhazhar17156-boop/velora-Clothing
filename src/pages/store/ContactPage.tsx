import React, { useState } from 'react';
import { useRouter } from '../../context/NavigationContext';
import { useStore } from '../../context/StoreContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Package, 
  Ruler, 
  RotateCcw,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToast, setIsSizeGuideOpen } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Status & Tracking',
    orderNumber: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Your message has been received! Our concierge will contact you within 4 hours.', 'success');
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Order Status & Tracking',
      orderNumber: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  const faqs = [
    {
      q: 'How do I track my garment order?',
      a: 'You can check real-time order status directly in your Account page under "Orders", or contact our customer concierge with your Order ID for express courier tracking.'
    },
    {
      q: 'What is the return and exchange window?',
      a: 'We offer an easy 7-day complimentary exchange and return service for all unworn clothing items with original tags intact. We provide doorstep courier pickup across India.'
    },
    {
      q: 'Can I get styling advice or help choosing the right size?',
      a: 'Yes! Our in-house stylists are available Monday to Saturday (10 AM to 8 PM). You can also click our Size Guide modal to see exact chest, waist, and length measurements in inches and cm.'
    },
    {
      q: 'Are all fabrics 100% natural and authentic?',
      a: 'Every VELORA garment is tailored strictly from pure organic cotton, Supima cotton, pure Banarasi katan silk, Chanderi silk, and natural European flax linen.'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#666666]">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-[#111111] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#111111] font-medium">Contact & Client Concierge</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#111111] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#222222] border border-[#333333] px-3.5 py-1.5 rounded-full text-xs text-[#B08D57] font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Client Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide uppercase mb-4">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base text-[#AAAAAA] max-w-2xl mx-auto font-light leading-relaxed">
            Have questions regarding sizing, custom tailoring, order fulfillment, or styling recommendations? We are dedicated to providing you with seamless sartorial assistance.
          </p>
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-[#0a0a0a] opacity-80 pointer-events-none" />
      </section>

      {/* Quick Action Badges */}
      <section className="border-b border-[#E5E5E5] bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/account')}
              className="flex items-center justify-between p-4 bg-white border border-[#E5E5E5] hover:border-[#B08D57] transition-all rounded-sm text-left group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#B08D57] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">Track Your Shipment</h4>
                  <p className="text-[11px] text-[#666666]">Instant real-time dispatch updates</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="flex items-center justify-between p-4 bg-white border border-[#E5E5E5] hover:border-[#B08D57] transition-all rounded-sm text-left group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#B08D57] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">Size Guide & Measurements</h4>
                  <p className="text-[11px] text-[#666666]">Inches and cm fit standards</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => navigate('/account')}
              className="flex items-center justify-between p-4 bg-white border border-[#E5E5E5] hover:border-[#B08D57] transition-all rounded-sm text-left group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#B08D57] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">Returns & Doorstep Pickup</h4>
                  <p className="text-[11px] text-[#666666]">7-day hassle-free returns</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] block mb-2">
                Direct Channels
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] uppercase tracking-wide">
                Reach Our Team
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
                Connect directly with our customer concierge, styling team, or atelier headquarters.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              
              {/* WhatsApp Support Team Card */}
              <div className="p-5 border border-[#E5E5E5] bg-[#FFFFFF] rounded-sm hover:border-[#25D366] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 border border-[#25D366]/30">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                        WhatsApp Concierge Team
                      </h3>
                      <p className="text-[11px] text-[#666666]">
                        Click on any representative to open direct WhatsApp chat:
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <a
                        href="https://wa.me/918237151055?text=Hello%20Shaikh%20Rehan,%20I%20have%20an%20inquiry%20regarding%20VELORA%20Clothing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-[#F9F9F9] hover:bg-[#25D366]/10 border border-[#EBEBEB] hover:border-[#25D366]/40 transition-all text-xs"
                      >
                        <span className="font-medium text-[#111111]">1) Shaikh Rehan</span>
                        <span className="text-[#25D366] font-semibold text-[11px] flex items-center gap-1">
                          +91 82371 51055 &rarr;
                        </span>
                      </a>

                      <a
                        href="https://wa.me/919623133796?text=Hello%20Shaikh%20Azhar,%20I%20have%20an%20inquiry%20regarding%20VELORA%20Clothing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-[#F9F9F9] hover:bg-[#25D366]/10 border border-[#EBEBEB] hover:border-[#25D366]/40 transition-all text-xs"
                      >
                        <span className="font-medium text-[#111111]">2) Shaikh Azhar</span>
                        <span className="text-[#25D366] font-semibold text-[11px] flex items-center gap-1">
                          +91 96231 33796 &rarr;
                        </span>
                      </a>

                      <a
                        href="https://wa.me/919172832940?text=Hello%20Sayyed%20Yaseer,%20I%20have%20an%20inquiry%20regarding%20VELORA%20Clothing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-[#F9F9F9] hover:bg-[#25D366]/10 border border-[#EBEBEB] hover:border-[#25D366]/40 transition-all text-xs"
                      >
                        <span className="font-medium text-[#111111]">3) Sayyed Yaseer</span>
                        <span className="text-[#25D366] font-semibold text-[11px] flex items-center gap-1">
                          +91 91728 32940 &rarr;
                        </span>
                      </a>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#888888] pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span>Mon – Sat: 10:00 AM – 8:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card (Redirects to Gmail) */}
              <div className="p-5 border border-[#E5E5E5] bg-[#FFFFFF] rounded-sm hover:border-[#EA4335] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335] shrink-0 border border-[#EA4335]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Official Email Inquiries
                    </h3>
                    <p className="text-sm font-medium text-[#111111]">
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=rayprivate.ldt@gmail.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#EA4335] transition-colors font-semibold text-[#111111] inline-flex items-center gap-1.5"
                      >
                        <span>rayprivate.ldt@gmail.com</span>
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-normal">Open Gmail &rarr;</span>
                      </a>
                    </p>
                    <p className="text-xs text-[#666666]">
                      Clicking above directly opens the Gmail compose window.
                    </p>
                    <p className="text-[11px] text-[#888888] pt-1">
                      Average response time: within 2 to 4 business hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flagship Atelier Location */}
              <div className="p-5 border border-[#E5E5E5] bg-[#FFFFFF] rounded-sm hover:border-[#B08D57] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#B08D57] shrink-0 border border-[#E5E5E5]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Flagship Atelier & Store
                    </h3>
                    <p className="text-xs font-medium text-[#111111]">
                      VELORA Fashion Atelier
                    </p>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      Plot No. 42, Fashion Boulevard, MG Road, New Delhi – 110030, India
                    </p>
                    <p className="text-[11px] text-[#888888] pt-1">
                      In-store styling appointments: Mon – Sat, 11:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate & Parent Company Card */}
              <div className="p-4 border border-[#E5E5E5] bg-[#F7F7F7] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-[#888888] uppercase block">Engineered & Operated By</span>
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">RAY PVT.LTD</span>
                  <p className="text-[11px] text-[#666666] mt-0.5">Corporate & Digital Operations Center</p>
                </div>
                <div className="text-right text-[11px] text-[#777777]">
                  <span className="inline-block px-2 py-0.5 bg-white border border-[#E5E5E5] text-[10px] font-semibold text-[#111111] uppercase tracking-wider rounded-xs">
                    Registered India
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-10 shadow-xs rounded-sm">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] uppercase">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#111111]">{formData.name}</span>. Your inquiry has been routed to our senior concierge team. We will respond back to <span className="font-semibold text-[#111111]">{formData.email}</span> shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#B08D57] transition-colors text-xs font-medium uppercase tracking-widest"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] block mb-1">
                      Online Assistance
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#111111] uppercase tracking-wide">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-[#666666] mt-1">
                      Fill in your details below and our fashion team will respond promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#B08D57] transition-colors rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aarav@example.com"
                        className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#B08D57] transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#B08D57] transition-colors rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                        Inquiry Topic *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#B08D57] transition-colors rounded-none"
                      >
                        <option value="Order Status & Tracking">Order Status & Tracking</option>
                        <option value="Garment Exchange or Return">Garment Exchange or Return</option>
                        <option value="Size & Fit Assistance">Size & Fit Assistance</option>
                        <option value="Fabric & Care Questions">Fabric & Care Questions</option>
                        <option value="Bespoke / Custom Tailoring">Bespoke / Custom Tailoring</option>
                        <option value="Corporate / RAY PVT.LTD Query">Corporate / RAY PVT.LTD Query</option>
                        <option value="Other Assistance">Other Assistance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                      Order ID (If applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={e => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. ORD-9824"
                      className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#B08D57] transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#111111] mb-1.5">
                      Your Message / Inquiry *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know how we can assist you with your garment order, sizing, or styling..."
                      className="w-full px-3.5 py-2.5 border border-[#E5E5E5] text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#B08D57] transition-colors rounded-none resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#111111] text-white hover:bg-[#B08D57] transition-colors text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Concierge</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="bg-[#F7F7F7] border-t border-[#E5E5E5] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              Instant answers regarding clothing purchases, shipping, and styling.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-[#E5E5E5] rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#111111]">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#B08D57]' : ''
                      }`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-[#666666] leading-relaxed border-t border-[#F0F0F0] bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
