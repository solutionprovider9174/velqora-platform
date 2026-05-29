import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-surface-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Get in touch</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-3">Let's talk logistics</h2>
          <p className="text-sm sm:text-lg text-text-secondary max-w-xl mx-auto">Our logistics experts are ready to help you transform your operations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2">Ready to transform your logistics?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Get a free personalised demo and see how Velqora can cut costs, reduce delays, and give you full visibility across your supply chain.</p>
            </div>

            {[
              { icon: <Mail size={16} />, label: 'Email us', value: 'hello@velqora.com' },
              { icon: <Phone size={16} />, label: 'Call us', value: '+31 10 555 0100' },
              { icon: <MapPin size={16} />, label: 'Office', value: 'Rotterdam, Netherlands' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">{c.icon}</div>
                <div>
                  <p className="text-2xs text-text-disabled">{c.label}</p>
                  <p className="text-sm font-semibold text-navy-900">{c.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-start gap-3">
              <Clock size={16} className="text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-brand-700 mb-0.5">Response time</p>
                <p className="text-xs text-brand-700">We reply within 2 business hours</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 card p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div><label className="input-label">First name</label><input className="input" placeholder="John" /></div>
              <div><label className="input-label">Last name</label><input className="input" placeholder="Doe" /></div>
            </div>
            <div className="mb-3"><label className="input-label">Business email</label><input className="input" type="email" placeholder="john@company.com" /></div>
            <div className="mb-3"><label className="input-label">Company</label><input className="input" placeholder="Company name" /></div>
            <div className="mb-3">
              <label className="input-label">How can we help?</label>
              <select className="input">
                <option>Request a demo</option><option>Sales inquiry</option><option>Technical support</option><option>Partnership</option>
              </select>
            </div>
            <div className="mb-4"><label className="input-label">Message</label><textarea className="input resize-none" rows={4} placeholder="Tell us about your logistics challenges..." /></div>
            <button className="btn-primary w-full justify-center text-sm font-bold py-3">
              <Send size={15} /> Send message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
