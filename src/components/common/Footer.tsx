import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { useStore } from '../../context/StoreContext';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { setIsSizeGuideOpen } = useStore();

  const handleLink = (path: string) => {
    navigate(path);
  };

  const contactTeam = [
    {
      id: 1,
      name: 'Shaikh Rehan',
      number: '8237151055',
      whatsappUrl: 'https://wa.me/918237151055'
    },
    {
      id: 2,
      name: 'Shaikh Azhar',
      number: '9623133796',
      whatsappUrl: 'https://wa.me/919623133796'
    },
    {
      id: 3,
      name: 'Sayyed Yaseer',
      number: '9172832940',
      whatsappUrl: 'https://wa.me/919172832940'
    }
  ];

  const officialEmail = 'rayprivate.ldt@gmail.com';
  // Opens Gmail directly in browser
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${officialEmail}`;

  return (
    <footer className="bg-[#111111] text-white pt-14 pb-12 border-t border-[#222222]">
      
      {/* Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#262626]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 border border-[#333333]">
              <Truck className="w-5 h-5 text-[#B08D57]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Free Domestic Shipping</h4>
              <p className="text-[11px] text-[#888888] mt-0.5">On all prepaid orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 border border-[#333333]">
              <RotateCcw className="w-5 h-5 text-[#B08D57]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">7-Day Easy Returns</h4>
              <p className="text-[11px] text-[#888888] mt-0.5">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 border border-[#333333]">
              <Award className="w-5 h-5 text-[#B08D57]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Artisanal Quality</h4>
              <p className="text-[11px] text-[#888888] mt-0.5">100% genuine natural fabrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 border border-[#333333]">
              <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Secure Payments</h4>
              <p className="text-[11px] text-[#888888] mt-0.5">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4 lg:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-[0.24em] text-white uppercase block">
              VELORA
            </span>
            <p className="text-xs leading-relaxed text-[#999999]">
              Modern clothing thoughtfully curated for the refined sensibility. Dedicated strictly to luxury fabrics, timeless silhouettes, and authentic Indian craftsmanship.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B08D57] transition-colors flex items-center justify-center text-white" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B08D57] transition-colors flex items-center justify-center text-white" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B08D57] transition-colors flex items-center justify-center text-white" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B08D57] transition-colors flex items-center justify-center text-white" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4 pb-1 border-b border-[#333333] inline-block">
              SHOP
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button onClick={() => handleLink('/men')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Men's Clothing
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/women')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Women's Clothing
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/kids')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Kids' Apparel
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/new-arrivals')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/sale')} className="hover:text-red-400 text-red-500 font-semibold transition-colors cursor-pointer">
                  Sale &bull; Up to 50% Off
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4 pb-1 border-b border-[#333333] inline-block">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-[#B08D57] transition-colors font-medium text-[#B08D57] flex items-center gap-1.5 cursor-pointer">
                  <span>Concierge Desk &rarr;</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/account')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/account')} className="hover:text-[#B08D57] transition-colors cursor-pointer">
                  Returns & Doorstep Pickup
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-white cursor-pointer transition-colors text-left">
                  FAQs & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: DIRECT CONTACT */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B08D57] mb-4 pb-1 border-b border-[#333333] inline-block">
              DIRECT CONTACT
            </h3>

            {/* Email above numbers */}
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-[#888888] uppercase block font-medium">
                Official Email
              </span>
              <a 
                href={gmailComposeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Send email via Gmail"
                className="text-xs text-[#E5D7B7] hover:text-white transition-colors block break-all font-medium"
              >
                {officialEmail}
              </a>
            </div>

            {/* Numbers: name and number in a single line, line-by-line, direct WhatsApp redirection on click */}
            <div className="pt-1 space-y-1.5">
              <span className="text-[10px] tracking-widest text-[#888888] uppercase block font-medium">
                Mobile & WhatsApp
              </span>
              <ul className="space-y-2 text-xs text-[#AAAAAA]">
                {contactTeam.map((member) => (
                  <li key={member.id}>
                    <a
                      href={member.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Open WhatsApp chat with ${member.name}`}
                      className="hover:text-[#B08D57] transition-colors block text-xs"
                    >
                      {member.id}) {member.name} :- {member.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: ABOUT VELORA */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4 pb-1 border-b border-[#333333] inline-block">
              ABOUT VELORA
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Our Heritage & Pure Fabrics
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Master Weavers & Tailors
                </span>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-white cursor-pointer transition-colors text-left">
                  Corporate Inquiries
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy & Cookie Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#777777] gap-4">
          <p>&copy; 2026 VELORA Clothing Atelier. All Rights Reserved.</p>
          
          <div className="flex items-center text-xs py-1">
            <button 
              onClick={() => handleLink('/contact')}
              title="Operated by RAY PVT.LTD - View Company & Contact Info"
              className="font-semibold text-[#B08D57] hover:text-[#d3ab6f] tracking-wider uppercase bg-[#1c1c1c] hover:bg-[#252525] px-3 py-1 rounded-sm border border-[#333333] hover:border-[#B08D57]/50 shadow-sm transition-all cursor-pointer"
            >
              RAY PVT.LTD
            </button>
          </div>

          <p className="tracking-widest uppercase text-[10px]">Exclusively Clothing &bull; India</p>
        </div>
      </div>

    </footer>
  );
};
export default Footer;

