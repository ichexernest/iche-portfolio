import React, { useState } from 'react';
import { Send, Linkedin, Github } from 'lucide-react';
import GlobalTitle from '../Global.title';
import emailjs from 'emailjs-com';

interface SocialButtonProps {
  icon: React.ReactNode;
  name: string;
  url: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, name, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-center min-w-[56px] px-4 h-14 rounded-full bg-white/5 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out`}
    >
      {icon}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {name}
      </span>
    </a>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const templateParams = {
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  try {
    // check email and subject are not empty
    if (!templateParams.email || !templateParams.subject || !templateParams.message) {
      throw new Error('Email and subject are required');
    }

    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS environment variables are not set');
    }
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    setSubmitStatus('success');
    setFormData({ email: '', subject: '', message: '' });
  } catch (err) {
    console.error('Email send error:', err);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 3000);
  }
};

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ernest-chen-b85036128',
    },
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/ichexernest',
    },
       {
      icon: <p className="text-sm">ch82831223@gmail.com</p>,
      name: 'Email',
      url: '',
    }
  ];

  return (
    <section
      id="contact"
      className="relative text-white bg-[#0D141E] min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* 上方漸層 - 改用相對高度 */}
      <div
        className="absolute top-0 left-0 right-0 h-[10vh] z-20"
        style={{
          background: 'linear-gradient(to bottom, #000006, transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* 歡迎標題區塊 */}
        <div className="text-center my-16">
        <GlobalTitle title="Get in touch" />

          <p className=" text-white max-w-3xl mt-10 mx-auto leading-relaxed">
            Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-6 pb-4">
          {socialLinks.map((social, index) => (
            <SocialButton
              key={index}
              icon={social.icon}
              name={social.name}
              url={social.url}
            />
          ))}
        </div>

          <p className="text-white text-center max-w-3xl mx-auto mt-10 leading-relaxed">or</p>

        <div className=" rounded-2xl p-8">
          <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-500 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70c9eb] focus:border-[#70c9eb] transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>


            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-500 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70c9eb] focus:border-[#70c9eb] transition-colors duration-200"
                placeholder="please briefly describe the purpose of contact"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-500 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70c9eb] focus:border-[#70c9eb] transition-colors duration-200 resize-none"
                placeholder="please describe in detail what you would like to discuss..."
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full hover:bg-gradient-to-r from-transparent via-[#000006] to-transparent bg-opacity-20 scale-105 hover:shadow-lg text-white  py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send</span>
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-white/5 border border-green-200 rounded-lg">
                <p className="text-white text-center font-medium">
                  ✅ Message sent successfully! I will get back to you as soon as possible.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-white/5 border border-red-200 rounded-lg">
                <p className="text-white text-center font-medium">
                  ❌ Failed to send message, please try again later or email me directly.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </section>
  );
};

export default Contact;